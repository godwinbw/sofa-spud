const fetch = require("node-fetch");

const tmdb_api_key = "5b7f224d89cf4d43cf872ec5313641fc";
const tmdb_secure_base_url = "https://image.tmdb.org/t/p/original";

const options = {
  method: "GET",
};

module.exports = {
  searchTmdbForTitles: async function (searchString) {
    let encodedSearchString = encodeURIComponent(searchString.trim());

    const tmdbApiUrlSearchMulti = `https://api.themoviedb.org/3/search/multi?api_key=${tmdb_api_key}&language=en-US&query=${encodedSearchString}&page=1&include_adult=false`;

    try {
      let titleList = [];

      const response = await fetch(tmdbApiUrlSearchMulti, options);
      const json = await response.json();

      if ("results" in json) {
        json.results.forEach(async (title) => {
          if (title.media_type == "movie" || title.media_type == "tv") {
            // this is a valid title - it is a movie or tv show
            let thisTitle = {};

            thisTitle.imdbId = title.id;

            //console.log(title);
            thisTitle.title = title.title;
            thisTitle.titleType = title.media_type;
            thisTitle.year = title.release_date;
            thisTitle.imageUrl =
              "https://image.tmdb.org/t/p/original" + title.poster_path;
            thisTitle.plot = title.overview;

            // add thisTitle to the return list
            titleList.push(thisTitle);
          }
        });

        return titleList;
      }
    } catch (err) {
      console.log("we got an error searching for shows -> ", err);
    }

    // if we get this far, it was because of an error, so return nothing
    return;
  },
};
