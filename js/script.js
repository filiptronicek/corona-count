const baseUrl = "https://coronavirus-tracker-api.herokuapp.com/all";

const tptDiv = document.getElementById("num");
const percent = document.getElementById("percentage");
const recoveryRate = document.getElementById("recoveryRate");

const population = 7794798739;

let commaDigits = 4;
let percentage;

percent.onclick = function() {
  if (commaDigits > 8) {
    commaDigits = 2;
  } else {
    commaDigits++;
  }
  percent.innerText = `${percentage.toFixed(commaDigits)}%`;
};

function getData(commaLvl = 4) {
  fetch(baseUrl)
    .then(response => response.json())
    .then(resp => (tptDiv.innerText = resp.latest))
    .then(resp => {
      console.table(resp);
      percentage = 100 * (Number(resp.confirmed) / population);

      percent.innerText = `${percentage.toFixed(commaLvl)}%`;
      tptDiv.innerText = resp.confirmed.toLocaleString();
      recoveryRate.innerText = `${(
        100 *
        (resp.recovered / resp.confirmed)
      ).toFixed(2)}%`;
    });
}

if (percentage > 100) location.reload();
getData();
