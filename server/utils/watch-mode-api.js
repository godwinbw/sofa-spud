const fetch = require("node-fetch");

const watchModeApiKey = "rtUivIdmuN1g2kZp6lwh1q25SlduRpefMm3vtRgk";

// search the watchmode api for the search string, and return matching titles

module.exports = {
  searchWatchModeForTitles: async function (searchString) {
    let encodedSearchString = encodeURIComponent(searchString.trim());
    let watchModeApiUrl = `https://api.watchmode.com/v1/search/?apiKey=${watchModeApiKey}&search_field=name&search_value=${encodedSearchString}`;

    try {
      const response = await fetch(watchModeApiUrl, { method: "Get" });
      const json = await response.json();
      //console.log(json);

      // see if we have any title_results
      if ("title_results" in json) {
        console.log(json.title_results);

        // for each title, get the details
        json.title_results.forEach((title) => {
          console.log("title", title);
        });

        return json.title_results;
      } else {
        return {};
      }
    } catch (err) {
      console.log("we got an error -> ", err);
    }

    // if we made it this far, return an empty set
    return {};
  },
};
