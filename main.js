const btn = document.getElementById("theme-toggler");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
}
const lightModeText = "Switch to Dark mode";
const darkModeText = "Switch to Light mode";
var setText = false;

document.getElementById("theme-toggler").innerHTML = setText
  ? darkModeText
  : lightModeText;
setText = !setText;

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  document.getElementById("theme-toggler").innerHTML = setText
    ? darkModeText
    : lightModeText;
  setText = !setText;

  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});

function getAllCountries() {
  const url = "https://restcountries.eu/rest/v2/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let country of data) {
        const innerHtml = `
        <div data-country='${JSON.stringify(
          country
        )}' class="card-element" onclick="loadCountryDetailsPage.call(this, event)">
            <img style="height: 200px; width: 350px" src='${country.flag}'>
            <div style="padding: 20px;">
              <h1>${country.name}</h1>
              <h3>Population: ${country.population}</h3>
              <h3>Region: ${country.region}</h3>
              <h3>Capital: ${country.capital}</h3>
            </div>
        </div>
        `;
        document.getElementsByClassName("container")[0].innerHTML += innerHtml;
      }
    });
}

var timerId;
var searchElement = document.getElementById("search");

function searchInput(e) {
  const url = "https://restcountries.eu/rest/v2/name/" + e.target.value;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementsByClassName("container")[0].innerHTML = "";

      for (let country of data) {
        const innerHtml = `
          <div data-country='${JSON.stringify(
            country
          )}' class="card-element" onclick="loadCountryDetailsPage.call(this, event)">
              <img style="height: 200px; width: 350px" src='${country.flag}'>
              <div style="padding: 20px;">
                <h1>${country.name}</h1>
                <h3>Population: ${country.population}</h3>
                <h3>Region: ${country.region}</h3>
                <h3>Capital: ${country.capital}</h3>
              </div>
          </div>
          `;
        document.getElementsByClassName("container")[0].innerHTML += innerHtml;
      }
    });
}

var debounceFunction = function (func, delay, e) {
  clearTimeout(timerId);
  timerId = setTimeout(() => func.apply(this, [e]), delay);
};

searchElement.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    debounceFunction(searchInput, 200, e);
  } else {
    getAllCountries();
  }
});

function filterRegion(e) {
  const url = "https://restcountries.eu/rest/v2/region/" + e.target.value;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementsByClassName("container")[0].innerHTML = "";

      for (let country of data) {
        const innerHtml = `
        <div data-country='${JSON.stringify(
          country
        )}' class="card-element" onclick="loadCountryDetailsPage.call(this, event)">
            <img style="height: 200px; width: 350px" src='${country.flag}'>
            <div style="padding: 20px;">
              <h1>${country.name}</h1>
              <h3>Population: ${country.population}</h3>
              <h3>Region: ${country.region}</h3>
              <h3>Capital: ${country.capital}</h3>
            </div>
        </div>`;
        document.getElementsByClassName("container")[0].innerHTML += innerHtml;
      }
    });
}

function loadCountryDetailsPage(e) {
  document.getElementById("main").remove();
  document.getElementById("detail").style.visibility = "visible";
  const country = JSON.parse(this.getAttribute("data-country"));

  function formatData(data) {
    var res = "";

    for (let curr of data) {
      res += curr.name + ", ";
    }

    res = res.substring(0, res.length - 2);
    return res;
  }

  const innerHtml = `
            <button onclick="window.location.reload()" class="button" type="button">Back</button>
            <div class="containerDetail">
              <div class="image-element">
                  <img style="height: 500px; width: 800px" src='${
                    country.flag
                  }'>
              </div>
              <div style="margin-top: 50px;">
                  <h1>${country.name}</h1>
                  <div class="containerDetail">
                    <div class="detailElem">
                      <h3>Native name: ${country.nativeName}</h3>
                      <h3>Population: ${country.population}</h3>
                      <h3>Region: ${country.region}</h3>
                      <h3>Sub Region: ${country.subregion}</h3>
                      <h3>Capital: ${country.capital}</h3>
                    </div>
                    <div class="detailElem" style="margin-left: 100px">
                      <h3>Top Level Domain: ${country.topLevelDomain[0]}</h3>
                      <h3>Currencies: ${formatData(country.currencies)}</h3>
                      <h3>Languages: ${formatData(country.languages)}</h3>
                    </div>
                  </div>
              </div>
            </div>
            
            `;
  document.getElementById("detail-container").innerHTML = innerHtml;
}

getAllCountries();
