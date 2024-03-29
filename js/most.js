const url = "https://corona.lmao.ninja/v2/countries";
const table = document.getElementById("countryTables");
const modalContent = document.getElementById("dynModCont");
const modalCountryName = document.getElementById("countrySpan");

const numOfPlacesToShow = 5;
const maxPlacesToShow = 150;

let sorted = [];

table.innerHTML += `Getting the latest data... `;

let ascendingFilter = true;

function imageExists(image_url) {
  const http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();

  return http.status != 404;
}

function zeroFormatting(num) {
  if (num < 10) return "0" + num;
  else return num;
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
          table.innerHTML += `
             
             <td> ${index}. ${listStr} </td>
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
