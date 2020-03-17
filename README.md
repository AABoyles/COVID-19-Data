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


## Others

Know of other organizations/institutions collecting data the we could use? [Let me know](mailto:aaboyles@gmail.com) and I'll look into it.