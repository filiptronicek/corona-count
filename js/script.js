const baseUrl = "https://corona.lmao.ninja/all";

const tptDiv = document.getElementById("num");
const percent = document.getElementById("percentage");
const recoveryRate = document.getElementById("recoveryRate");
const updated = document.getElementById("updatedOn");

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

let reloadingin = 30;

refreshPage = setInterval(() => {
  if (reloadingin > 0) {
    reloadingin--;
    console.log(`Reloading in ${reloadingin*10} seconds`);
  } else {
    clearInterval(refreshPage);
    location.reload();
  }
}, 10000);

const options = { hour: "numeric", minute: "numeric" };

function getData(commaLvl = 4) {
  fetch(baseUrl)
    .then(response => response.json())
    .then(resp => {
      console.table(resp);
      percentage = 100 * (Number(resp.cases) / population);

      updateDate = new Date(resp.updated);
      updated.innerText = `(Last updated at ${updateDate.toLocaleString(undefined,options)})`;
      percent.innerText = `${percentage.toFixed(commaLvl)}%`;
      tptDiv.innerText = resp.cases.toLocaleString();
      recoveryRate.innerText = `${(100 * (resp.recovered / resp.cases)).toFixed(
        2
      )}%`;
    });
}

if (percentage > 100) location.reload();
getData();
