const url = "https://corona.lmao.ninja/countries";
const table = document.getElementById("countryTables");
const modalContent = document.getElementById("dynModCont");
const modalCountryName = document.getElementById("countrySpan");

const numOfPlacesToShow = 5;
const maxPlacesToShow = 150;

let sorted = [];

table.innerHTML += `Getting the latest data... `;

let ascendingFilter = true;

function imageExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();

  return http.status != 404;
}

function zeroFormatting(num) {
  if (num < 10) return "0" + num;
  else return num;
}

function createModal(code, country) {
  const todayDate = new Date();

  modalCountryName.innerText = country;

  let forecastImage = `https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(
    todayDate.getMonth() + 1
  )}-${zeroFormatting(todayDate.getDate() - 1)}_${code}_forecast.svg`;

  let chartImage = `https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(
    todayDate.getMonth() + 1
  )}-${zeroFormatting(todayDate.getDate() - 1)}_${code}_confirmed.svg`;

  if (code !== "IT") {
    if (imageExists(chartImage)) {
      modalContent.innerHTML = `
    <h4 style="float: left;"> Confirmed cases chart (until yesterday) </h4>
  <img width="100%" src="${chartImage}">
  `;
      if (imageExists(forecastImage)) {
        modalContent.innerHTML += `
  <h4 style="float: left;"> Forecast chart </h4>
  <img width="100%" src="${forecastImage}">`;
      }
      modalContent.innerHTML +=
        "Charts from <a target='blank' href='https://open-covid-19.github.io/explorer'>open-covid-19/explorer</a>";
    } else {
      modalContent.innerText = "We didn't find any charts 😫";
    }
  } else {
    chartImage = `https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(
      todayDate.getMonth() + 1
    )}-${zeroFormatting(todayDate.getDate())}_${code}_confirmed.svg`;

    forecastImage = `https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(
      todayDate.getMonth() + 1
    )}-${zeroFormatting(todayDate.getDate())}_${code}_forecast.svg`;

    if (imageExists(chartImage)) {
      modalContent.innerHTML = `
    <img width="100%" src="${chartImage}">`;
      if (imageExists(forecastImage)) {
        modalContent.innerHTML +=
        `
    <h4 style="float: left;"> Forecast chart </h4>
    <img width="100%" src="${forecastImage}">`;
      }
      modalContent.innerHTML +=
        "Charts from <a target='blank' href='https://open-covid-19.github.io/explorer'>open-covid-19/explorer</a>";
    }
  }
}

function updateFilter() {
  ascendingFilter = !ascendingFilter;
  changeNum(
    Number(document.getElementById("numToShow").innerText),
    ascendingFilter
  );
  document.getElementById("showFilterText").innerText = ascendingFilter ? "top" : "least";
}

function changeNum(numToShow = numOfPlacesToShow, ascending = ascendingFilter) {
  let index = 1;
  function changeNumGen(textNum, domject) {
    const realNum = Number(textNum);
    if (realNum < maxPlacesToShow) {
      changeNum(realNum + 5);
      domject.innerText = realNum + 5;
    } else {
      changeNum(numOfPlacesToShow);
      domject.innerText = numOfPlacesToShow.toString();
    }
  }
  console.log("rendering " + numToShow);

  fetch(url)
    .then(response => response.json())
    .then(resp => {
      table.innerHTML = "";
      table.innerHTML += `
      <tr>
          <th>Name</th>
          <th>Flag</th>
          <th>Number of confirmed cases</th>
           `;
      let objSorted = resp;
      if (ascending) {
        objSorted.sort(function(a, b) {
          return a.cases - b.cases;
        });
      } else {
        objSorted.sort(function(a, b) {
          return b.cases - a.cases;
        });
      }
      objSorted.reverse();
      let rank = 0;
      for (let instance in objSorted) {
        rank++;
        let listStr = "";

        if (objSorted[instance].province) {
          listStr = `${objSorted[instance].province}, ${objSorted[instance].country}`;
        } else {
          listStr = `${objSorted[instance].country}`;
        }
        if (rank < numToShow + 1) {
          table.innerHTML += `
             
             <td> ${index}.<a class="modal-trigger" href="#modalDyn" onClick="createModal('${
            objSorted[instance].countryInfo.iso2
          }', '${listStr}')"> ${listStr} </a> </td>
             <td> <img width="64" src="${
               objSorted[instance].countryInfo.flag
             }"> </td>
            
             <td> ${objSorted[instance].cases.toLocaleString()} </td>
      
          </tr>
          `;
          index++;
        }
      }
      return objSorted.length;
    });
  changeNum.gen = changeNumGen;
}
changeNum();

document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});
