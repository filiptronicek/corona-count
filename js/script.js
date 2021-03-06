const baseUrl = "https://corona.lmao.ninja/v2/all";
const rtf1 = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const tptDiv = document.getElementById("num");
const percent = document.getElementById("percentage");
const recoveryRate = document.getElementById("recoveryRate");
const updated = document.getElementById("updatedOn");
const link = document.querySelector(".linkbtn");

const population = 7812739888;

let commaDigits = 4;
let percentage;

percent.onclick = () => {
  if (commaDigits > 8) {
    commaDigits = 2;
  } else {
    commaDigits++;
  }
  percent.innerText = `${percentage.toFixed(commaDigits)}%`;
};

let reloadingin = 60;
let idle;
let idleTime = 0;

function reloadData() {
  if (document.hidden) {
    idle = setInterval(() => {
      idleTime++;
      console.log(`Idle for ${idleTime}`);
    }, 1000);
  } else {
    if(idleTime > 120) location.reload();
    idleTime = 0;
    clearInterval(idle);

  }
}

refreshPage = setInterval(() => {
  if (reloadingin >= 1) {
    reloadingin--;
    console.log(`Reloading in ${reloadingin * 10} seconds`);
  } else {
    if (document.hidden) {
      reloadingin = 60;
    } else {
      clearInterval(refreshPage);
      location.reload();
    }
  }
}, 10000);

document.addEventListener("visibilitychange", reloadData);

const options = { hour: "numeric", minute: "numeric" };

function getData(commaLvl = 4) {
  fetch(baseUrl)
    .then(response => response.json())
    .then(resp => {
      const nowDate = new Date();
      console.table(resp);
      percentage = 100 * (Number(resp.cases) / population);

      updateDate = new Date(resp.updated);
      let updateDiff = updateDate / 1000 - nowDate / 1000;
      updated.innerText = `(Last updated at ${updateDate.toLocaleString(
        undefined,
        options
      )})`;
      percent.innerText = `${percentage.toFixed(commaLvl)}%`;
      tptDiv.innerText = resp.cases.toLocaleString();
      recoveryRate.innerText = `${(100 * (resp.recovered / resp.cases)).toFixed(
        2
      )}%`;
    });
}
if(window.location.href === "https://coronatime.now.sh/" || window.location.href === "https://coronatime.now.sh") {
  link.setAttribute("href", "/most"); 
}

if (percentage > 100) location.reload();
getData();
