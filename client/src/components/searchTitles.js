import React from 'react';
import unirest from 'unirest';

class SearchTitles extends React.Component {

 sendRequest = (title) => {
   const req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");

   req.query({
     "page": "1",
     "r": "json",
     "s": title
   });

   req.headers({
     "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
     "x-rapidapi-key": "faf1df0ca0msh076ac77b5167b92p1214afjsn25e99da003c3"
   });


   req.end((res) => {
     if (res.error) throw new Error(res.error);

     console.log(res.body);
   });
 }

 render() {
   return (
     <div className="App">
       <header className="App-header">
       </header>
     </div>
   );
 }
}

export default SearchTitles;