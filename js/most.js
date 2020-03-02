const url = "https://coronavirus-tracker-api.herokuapp.com/confirmed";
const table = document.getElementById("countryTables");

numOfPlacesToShow = 10;

let sorted = [];

fetch(url)
  .then(response => response.json())
  .then(resp => (resp = resp.locations))
  .then(resp => {
    console.log("Original: ");
    console.table(resp);
    let objSorted = resp
      .sort(function(a, b) {
        return a.latest - b.latest;
      })
      .reverse();

    console.log(objSorted);
    let rank = 0;
    for (let instance in objSorted) {
      rank++;
      let listStr = "";

      if (objSorted[instance].province !== "") {
        listStr = `${objSorted[instance].province}, ${objSorted[instance].country}`;
      } else {
        listStr = `${objSorted[instance].country}`;
      }
      if (rank < numOfPlacesToShow) {
        table.innerHTML += `
        <tr>
            <td> ${listStr} </td>
            <td> ${objSorted[instance].latest} </td>
        </tr>
        `;
      }
      console.log(instance);
    }
  });
