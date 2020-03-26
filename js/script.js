const baseUrl = "https://corona.lmao.ninja/all";
const rtf1 = new Intl.RelativeTimeFormat('en', { numeric: "auto"  });


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
  if (reloadingin >= 1) {
    reloadingin--;
    console.log(`Reloading in ${reloadingin*10} seconds`);
  } else {
    if(document.hidden) {
      reloadingin = 30;
    } else {
      clearInterval(refreshPage);
      location.reload();
    }

  }
}, 10000);

const options = { hour: "numeric", minute: "numeric" };

function getData(commaLvl = 4) {
  fetch(baseUrl)
    .then(response => response.json())
    .then(resp => {
      const nowDate = new Date();
      console.table(resp);
      percentage = 100 * (Number(resp.cases) / population);

      updateDate = new Date(resp.updated);
      let updateDiff = (updateDate / 1000)-(nowDate/1000);
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
