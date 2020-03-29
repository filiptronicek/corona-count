const url = "https://corona.lmao.ninja/countries";
const table = document.getElementById("countryTables");
const modalContent = document.getElementById("dynModCont");
const modalCountryName = document.getElementById("countrySpan");

const numOfPlacesToShow = 5;
const maxPlacesToShow = 150;

let sorted = [];

table.innerHTML += `Getting the latest data... `;

let ascendingFilter = true;

function zeroFormatting(num) {
  if (num < 10) return "0"+num;
  else return num;
}

function createModal(code, country) {

  const todayDate = new Date(); 


  modalCountryName.innerText = country;
  if (code !== "IT")
  {
    modalContent.innerHTML = `
    <h4 style="float: left;"> Confirmed cases chart (until yesterday) </h4>
  <img width="100%" src="https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(todayDate.getMonth()+1)}-${zeroFormatting(todayDate.getDate() - 1) }_${code}_confirmed.svg">
  <br>
  <br>
  <h4 style="float: left;"> Forecast chart </h4>
  <img width="100%" src="https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(todayDate.getMonth()+1)}-${zeroFormatting(todayDate.getDate() - 1) }_${code}_forecast.svg">

  `;
  } else {
    modalContent.innerHTML = `
    <img width="100%" src="https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(todayDate.getMonth()+1)}-${zeroFormatting(todayDate.getDate()) }_${code}_confirmed.svg">
    <br>
    <br>
    <h4 style="float: left;"> Forecast chart </h4>
    <img width="100%" src="https://open-covid-19.github.io/data/charts/${todayDate.getFullYear()}-${zeroFormatting(todayDate.getMonth()+1)}-${zeroFormatting(todayDate.getDate()) }_${code}_forecast.svg">
    `;
  }
}

function updateFilter() {
  ascendingFilter = !ascendingFilter;
  changeNum(
    Number(document.getElementById("numToShow").innerText),
    ascendingFilter
  );
  document.getElementById("showFilterText").innerText = ascendingFilter
    ? "top"
    : "least";
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
          // if (objSorted[instance].cases !== 0) {
          table.innerHTML += `
             
             <td><a class="modal-trigger" href="#modalDyn" onClick="createModal('${
               objSorted[instance].countryInfo.iso2
             }', '${listStr}')"> ${index}. ${listStr} </a> </td>
             <td> <img width="64" src="${
               objSorted[instance].countryInfo.flag
             }"> </td>
            
             <td> ${objSorted[instance].cases.toLocaleString()} </td>
      
          </tr>
          `;
          //}
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
