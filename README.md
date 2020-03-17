# COVID-19 Data

Some critical organizations are not doing a great job of publishing their COVID-19 data in machine-readable formats. Not that I blame them! They certainly have more pressing things to do at the moment, but they've left would-be analysts of that data scrambling to find alternatives. So I decided to take a break from forecasting and do the legwork to liberate the data.

## JHU CSSE

The JHU CSSE's [COVID-19 Dashboard](http://plague.com) has become one of the most widely-distributed sources of daily COVID-19 statistics. [Since 2020-02-04](https://github.com/CSSEGISandData/COVID-19/commit/05ae46515c8521ef82c5d622bcd6ffde20cffe33), they've been [storing their data on Github](https://github.com/CSSEGISandData/COVID-19). Accordingly, we include it in this repo as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). After cloning this repository, you can access the CSSE data by initializing and updating the submodule, like so:

```bash
git submodule init
git submodule update
```

And, to bring it up to date:

```bash
npm run scrape-jhu
```

## Citizen Times

Data.Citizen-Times has recently been floated as a viable alternative to JHU CSSE for [its dashboard](https://data.citizen-times.com/coronavirus/). They don't provide tools for viewing changes over time except in the context of the map, for which their data is encoded in [a huge GeoJSON file](https://data.citizen-times.com/media/jsons/smpj/covid19_r2.json). It can be scraped by running this node script, like so:

```bash
npm run scrape-citizen-times
```

Or, if Node isn't your style, [surf over to the Dashboard](https://data.citizen-times.com/coronavirus/) and run this in [your developer console](https://javascript.info/devtools):

```javascript
(() => {
  function loadScript(url){
    let script   = document.createElement("script");
    script.type  = "text/javascript";
    script.src   = url;
    document.body.appendChild(script);
  }

  loadScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.1.0/papaparse.min.js");
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js");

  fetch('https://data.citizen-times.com/media/jsons/smpj/covid19_r2.json').then(response => {
    response.json().then(data => {
      saveAs(new Blob([JSON.stringify(data)], {type: "application/json;charset=utf-8"}), "raw.json");
      saveAs(new Blob([Papa.unparse(
        data.features.map(f => ({
          "Country": f.properties.n,
          "Confirmed": f.properties.c,
          "Deaths": f.properties.d,
          "Recovered": f.properties.r,
          "Active": f.properties.e,
          "Timestep": f.properties.t, 
          "Date": f.properties.a
        }))
      )], {type: "text/csv;charset=utf-8"}), "data.csv");
    })
  });
})();

//The files are downloaded as `raw.json` and `data.csv`.
```

## Others

Know of other organizations/institutions collecting data the we could use? [Let me know](mailto:aaboyles@gmail.com) and I'll look into it.