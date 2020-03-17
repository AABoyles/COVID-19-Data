const axios = require("axios");
const Papa = require("papaparse");
const fs = require('fs');
const url = "https://data.citizen-times.com/media/jsons/smpj/covid19_r2.json";

axios.get(url).then(response => {
  fs.writeFileSync('citizen-times/raw.json', JSON.stringify(response.data));
  let csv = Papa.unparse(response.data.features.map(f => ({
    "Country": f.properties.n,
    "Confirmed": f.properties.c,
    "Deaths": f.properties.d,
    "Recovered": f.properties.r,
    "Active": f.properties.e,
    "Timestep": f.properties.t, 
    "Date": f.properties.a
  })));
  fs.writeFileSync('citizen-times/data.csv', csv);
});

//The file is saved at `citizen-times.csv`