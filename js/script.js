const url = "https://coronavirus-tracker-api.herokuapp.com/confirmed";
const tptDiv = document.getElementById("num");
const percent = document.getElementById("percentage");

const population = 7778973427;

fetch(url)
  .then(response => response.json())
  .then(resp => tptDiv.innerText = resp.latest)
  .then(resp => percent.innerText = `${(100*(Number(resp) / population)).toFixed(7)}%`);