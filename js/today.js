const dom = {
  cases: document.getElementById("cases"),
  deaths: document.getElementById("deaths"),
  recovered: document.getElementById("recovered"),
  country: document.getElementById("country"),
};

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("c") || "Czechia";

const url = `https://corona.lmao.ninja/v2/countries/${country}`;

console.log(country);

fetch(url)
  .then((response) => response.json())
  .then((resp) => {
    dom.country.innerText = country;
    dom.cases.innerText = resp.todayCases;
    dom.deaths.innerText = resp.todayDeaths;
    dom.recovered.innerText = resp.todayRecovered;
  });
