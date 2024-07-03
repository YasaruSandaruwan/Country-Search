fetch("https://restcountries.com/v3.1/all")
.then(res => res.json())
.then(data => {
    let tblCountries = document.getElementById("tbl");

    let tblBody = `<tr>
                    <th>Name</th>
                    <th>Flag</th>
                </tr>`;

    data.forEach(element => {
        tblBody += `<tr>
                    <td>${element.name.common}</td>
                    <td><img src="${element.flags.png}" alt="flag" width="30" height="20"></td>
                </tr>`;
    });

    tblCountries.innerHTML = tblBody;
});

function searchCountry() {
    let searchValue = document.getElementById("txtSearchValue").value.trim();

    let officialName = document.getElementById("officialName");
    let name = document.getElementById("name");
    let img = document.getElementById("img");
    let countryDetails = document.getElementById("countryDetails");

    if (!searchValue) {
        officialName.innerText = "Official Name";
        name.innerText = "Name";
        img.innerHTML = "";
        countryDetails.innerHTML = "";
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
    .then(res => res.json())
    .then(data => {
        if (data.status === 404) {
            officialName.innerText = "Not Found";
            name.innerText = "";
            img.innerHTML = "";
            countryDetails.innerHTML = "";
            return;
        }

        data.forEach(obj => {
            officialName.innerText = obj.name.official;
            name.innerText = obj.name.common;
            img.innerHTML = `<img src="${obj.flags.png}" alt="flag" width="100" height="60">`;

            let detailsTable = `<tr><th>Field</th><th>Value</th></tr>`;
            detailsTable += `<tr><td>Official Name</td><td>${obj.name.official}</td></tr>`;
            detailsTable += `<tr><td>Common Name</td><td>${obj.name.common}</td></tr>`;
            detailsTable += `<tr><td>Capital</td><td>${obj.capital ? obj.capital.join(", ") : "N/A"}</td></tr>`;
            detailsTable += `<tr><td>Region</td><td>${obj.region}</td></tr>`;
            detailsTable += `<tr><td>Subregion</td><td>${obj.subregion}</td></tr>`;
            detailsTable += `<tr><td>Population</td><td>${obj.population.toLocaleString()}</td></tr>`;
            detailsTable += `<tr><td>Area</td><td>${obj.area.toLocaleString()} km²</td></tr>`;
            detailsTable += `<tr><td>Languages</td><td>${obj.languages ? Object.values(obj.languages).join(", ") : "N/A"}</td></tr>`;
            detailsTable += `<tr><td>Currencies</td><td>${obj.currencies ? Object.values(obj.currencies).map(c => c.name).join(", ") : "N/A"}</td></tr>`;
            detailsTable += `<tr><td>Timezones</td><td>${obj.timezones ? obj.timezones.join(", ") : "N/A"}</td></tr>`;

            countryDetails.innerHTML = detailsTable;
        });
    })
    .catch(err => {
        console.error(err);
        officialName.innerText = "Error";
        name.innerText = "";
        img.innerHTML = "";
        countryDetails.innerHTML = "";
    });
}
