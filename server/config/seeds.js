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
        imdbId: "1399",
        title: "Game of Thrones",
        titleType: "tv",
        year: "2011",
        plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        imageUrl:
          "https://image.tmdb.org/t/p/w300/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
      },
      {
        imdbId: "100698",
        title: "Tiger King",
        titleType: "tv",
        year: "2020",
        plot: "A rivalry between big cat eccentrics takes a dark turn when Joe Exotic, a controversial animal park boss, is caught in a murder-for-hire plot.",
        imageUrl:
          "https://image.tmdb.org/t/p/w300/pmjYMCnSwndlEpiFZhhOWSWmUsu.jpg",
      },
      {
        imdbId: "60763",
        title: "Parkour",
        titleType: "movie",
        year: "2009",
        plot: "Parkour is Marc Rensing's debut drama about a young man and his group of friends in an unnamed industrial town in Germany. The film is a captivating story of friendship, love, and jealousy and deals with Parkour, the physical discipline of training in which the traceur has to overcome obstacles within his or her path.",
        imageUrl:
          "https://image.tmdb.org/t/p/w300/4BGIPonTluukadGoBZZY9Z7CXJP.jpg",
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
        imdbId: "813",
        title: "Airplane!",
        titleType: "movie",
        year: "1980",
        plot: "A man afraid to fly must ensure that a plane lands safely after the pilots become sick.",
        imageUrl:
          "https://image.tmdb.org/t/p/w300/7Q3efxd3AF1vQjlSxnlerSA7RzN.jpg",
      },
      {
        imdbId: "1892",
        title: "The Fresh Prince of Bel-Air",
        titleType: "tv",
        year: "1990",
        plot: "A streetwise, poor young man from Philadelphia is sent by his mother to live with his aunt, uncle and cousins in their Bel-Air mansion.",
        imageUrl:
          "https://image.tmdb.org/t/p/w300/gYPE5vfStpVTf1ULE11B1Vwm12b.jpg",
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
