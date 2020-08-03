const router = require("express").Router();
const apiController = require("../Controllers/apiController");

router.route("/").get(apiController.getCovidData);
router.route("/:st").get(apiController.getCovidDataByParams);

module.exports = router;
