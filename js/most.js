const url = "https://coronavirus-tracker-api.herokuapp.com/confirmed";
const table = document.getElementById("countryTables");

const numOfPlacesToShow = 5;
const maxPlacesToShow = 75;

let sorted = [];

table.innerHTML += `Getting the latest data... `;

function changeNum(numToShow = numOfPlacesToShow) {
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
    .then(resp => (resp = resp.locations))
    .then(resp => {
      table.innerHTML = "";
      table.innerHTML += `
      <tr>
          <th>Name</th>
          <th>Number of confirmed cases</th> `;
      let objSorted = resp
        .sort(function(a, b) {
          return a.latest - b.latest;
        })
        .reverse();
      let rank = 0;
      for (let instance in objSorted) {
        rank++;
        let listStr = "";

        if (objSorted[instance].province !== "") {
          listStr = `${objSorted[instance].province}, ${objSorted[instance].country}`;
        } else {
          listStr = `${objSorted[instance].country}`;
        }
        if (rank < numToShow + 1) {
          table.innerHTML += `

                  <td> ${listStr} </td>
                  <td> ${objSorted[instance].latest} </td>
              </tr>
              `;
        }
      }
      return objSorted.length;
    });
  changeNum.gen = changeNumGen;
}
changeNum();
