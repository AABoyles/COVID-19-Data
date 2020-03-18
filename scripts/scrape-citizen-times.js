const axios = require("axios");
const Papa = require("papaparse");
const fs = require('fs');
const url = "https://data.citizen-times.com/media/jsons/smpj/covid19_r2.json";

axios.get(url).then(response => {
  fs.writeFileSync('citizen-times/raw.json', JSON.stringify(response.data));
  let csv = Papa.unparse(response.data.features.map(f => {
    let [Country, Province, Location, ...err] = f.properties.n.split(',').reverse().map(s => s.trim());
    Country = Country == "Mainland China" ? "China" : Country;
    return {
      Country,
      Province,
      Location,
      "Confirmed": f.properties.c,
      "Deaths": f.properties.d,
      "Recovered": f.properties.r,
      "Active": f.properties.e,
      "Timestep": f.properties.t, 
      "Date": (new Date(f.properties.a + ' 2020')).toISOString().substr(0,10)
    }
  }));
  fs.writeFileSync('citizen-times/data.csv', csv);
}).catch(e => console.error(e));