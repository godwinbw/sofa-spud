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
            thisTitle.imageUrl = tmdb_secure_base_url + title.poster_path;
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

  searchTmdbForSimilarTitles: async function (imdbId, titleType) {
    const tmdbApiUrlGetMovieSimilar = `https://api.themoviedb.org/3/movie/${imdbId}/similar?api_key=${tmdb_api_key}&language=en-US&page=1`;
    const tmdbApiUrlGetTvSimilar = `https://api.themoviedb.org/3/tv/${imdbId}/similar?api_key=tmdb_api_key${tmdb_api_key}&language=en-US&page=1`;
    let urlToUse;

    if (titleType == "movie") {
      urlToUse = tmdbApiUrlGetMovieSimilar;
    } else if (titleType == "tv") {
      urlToUse = tmdbApiUrlGetTvSimilar;
    }

    if (titleType == "movie" || titleType == "tv") {
      try {
        let titleList = [];

        const response = await fetch(urlToUse, options);
        const json = await response.json();

        if ("results" in json) {
          json.results.forEach(async (title) => {
            // this is a valid title - it is a movie or tv show
            let thisTitle = {};

            thisTitle.imdbId = title.id;

            //console.log(title);
            thisTitle.title = title.title;
            thisTitle.titleType = titleType;
            thisTitle.year = title.release_date;
            thisTitle.imageUrl = tmdb_secure_base_url + title.poster_path;
            thisTitle.plot = title.overview;

            // add thisTitle to the return list
            titleList.push(thisTitle);
          });

          return titleList;
        }
      } catch (err) {
        console.log("we got an error searching for similar titles -> ", err);
      }
    }

    // if we get this far, return nothing
    return;
  },
};
