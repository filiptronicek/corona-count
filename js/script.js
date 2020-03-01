const url = "https://coronavirus-tracker-api.herokuapp.com/confirmed";
const tptDiv = document.getElementById("num");
const percent = document.getElementById("percentage");

const population = 7794798739;

let commaDigits = 4;
let percentage;

percent.onclick = function() {
  if(commaDigits > 8) {
    commaDigits = 2;
  } else {
    commaDigits ++;
  }
  percent.innerText = `${percentage.toFixed(
    commaDigits
  )}%`;
};

function getData(commaLvl = 4) {
  fetch(url)
    .then(response => response.json())
    .then(resp => (tptDiv.innerText = resp.latest))
    .then(resp => {
      percent.innerText = `${(100 * (Number(resp) / population)).toFixed(
        commaLvl
      )}%`;
      percentage = 100 * (Number(resp) / population);
    });
}

getData();
