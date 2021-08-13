const db = require("./connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    firstName: "Peter",
    lastName: "Parker",
    email: "spiderman@testmail.com",
    password: "12345",
  });

  await User.create({
    firstName: "Adrian",
    lastName: "Toomes",
    email: "vulture@testmail.com",
    password: "12345",
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
