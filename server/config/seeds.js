const db = require("./connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    firstName: "Peter",
    lastName: "Parker",
    email: "spiderman@testmail.com",
    password: "12345",
    watchList: [
      {
        imdbId: "tt0944947",
        title: "Game of Thrones",
        titleType: "tvSeries",
        year: "2011",
        plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        imageUrl:
          "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      },
      {
        imdbId: "tt11823076",
        title: "Tiger King",
        titleType: "tvMiniSeries",
        year: "2020",
        plot: "A rivalry between big cat eccentrics takes a dark turn when Joe Exotic, a controversial animal park boss, is caught in a murder-for-hire plot.",
        imageUrl:
          "https://m.media-amazon.com/images/M/MV5BYzI5MjQ2NzEtN2JmOC00MjE2LWI2NjItYTNjNTJjMjBkOWZkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      },
      {
        imdbId: "tt1294706",
        title: "Parkour",
        titleType: "movie",
        year: "2009",
        plot: "Parkour is Marc Rensing's debut drama about a young man and his group of friends in an unnamed industrial town in Germany. The film is a captivating story of friendship, love, and jealousy and deals with Parkour, the physical discipline of training in which the traceur has to overcome obstacles within his or her path.",
        imageUrl:
          "https://m.media-amazon.com/images/M/MV5BNzkwYzJkZjQtYjI1NC00NTQ3LWE3ZTEtOTI0ZDcxNGEzOWY1XkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg",
      },
    ],
  });

  await User.create({
    firstName: "Adrian",
    lastName: "Toomes",
    email: "vulture@testmail.com",
    password: "12345",
    watchList: [
      {
        imdbId: "tt0080339",
        title: "Airplane!",
        titleType: "movie",
        year: "1980",
        plot: "A man afraid to fly must ensure that a plane lands safely after the pilots become sick.",
        imageUrl:
          "https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      },
      {
        imdbId: "tt0098800",
        title: "The Fresh Prince of Bel-Air",
        titleType: "tvSeries",
        year: "1990",
        plot: "A streetwise, poor young man from Philadelphia is sent by his mother to live with his aunt, uncle and cousins in their Bel-Air mansion.",
        imageUrl:
          "https://m.media-amazon.com/images/M/MV5BOGUxOWQ4MzAtMmJjYS00M2U5LWEwZTAtYTc1YmZhNjg2NDRlXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg",
      },
    ],
  });

  await User.create({
    firstName: "Maxwell",
    lastName: "Dillon",
    email: "electro@testmail.com",
    password: "12345",
  });

  console.log("users seeded");

  process.exit();
});
