const router = require("express").Router();
const viewController = require("../Controllers/viewController");

router.route("/").get(viewController.getFirstPage);

module.exports = router;
