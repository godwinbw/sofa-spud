const fetch = require("node-fetch");

const rapidApiKey = "694794590dmsh100d4efdf3e52fcp1b0c3fjsn06751c67aeeb";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": rapidApiKey,
  },
};

module.exports = {
  searchRapidApiForTitles: async function (searchString) {
    let encodedSearchString = encodeURIComponent(searchString.trim());

    const rapidApiUrlFind = `https://imdb8.p.rapidapi.com/title/find?q=${encodedSearchString}`;

    try {
      let titleList = [];

      const response = await fetch(rapidApiUrlFind, options);
      const json = await response.json();
      //console.log(json);

      if ("results" in json) {
        // go through each title

        json.results.forEach(async (title) => {
          //console.log("title.id -> ", title.id);

          if (title.id.search("/title") == 0) {
            // this is a valid title
            let thisTitle = {};

            const imdbId = title.id.substring(7, title.id.length - 1);
            //console.log("imdbId => ", imdbId);
            thisTitle.imdbId = imdbId;

            // fetching the plot was taking too long
            // so skip for now
            //
            // now get the title detail for this title
            //const rapidApiUrlGetPlots = `https://imdb8.p.rapidapi.com/title/get-plots?tconst=${imdbId}`;
            //const plotResponse = await fetch(rapidApiUrlGetPlots, options);
            //const plotJson = await plotResponse.json();

            // wait 100 ms between each call (so we don't exceed basic plan limitations)
            //setTimeout(function () {
            //  console.log(plotJson);
            //}, 500);

            //console.log(title);
            thisTitle.title = title.title;
            thisTitle.titleType = title.titleType;
            thisTitle.year = title.year;
            thisTitle.imageUrl = title.image.url;

            // add thisTitle to the return list
            titleList.push(thisTitle);
          }
        });
      }
      //const bodyText = await response.text();
      //console.log(bodyText);
      //return bodyText;
      return titleList;
    } catch (err) {
      console.log("we got an error searching for shows -> ", err);
    }
    // if we get here (due to an error) - we just return nothing
    return;
  },
};
