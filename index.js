// implement your API here
const express = require("express"); // importing
const server = express();

const Users = require("./data/db");

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ success: "So far so good" }); // checking to make sure everything is set to go
});

// create
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(req.body)
      .then(user => {
        res.status(201), json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
