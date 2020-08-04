const stateCoordinates = require("../public/data/coordinates.json");

exports.getFirstPage = (req, res) => {
  res.render("index", {
    stateCoordinates,
  });
};
