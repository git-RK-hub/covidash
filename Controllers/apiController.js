const CovidApi = require("../Models/apiRequest");
const catchAsync = require("../utils/catchAsync");
let state = {};
state.data = new CovidApi();

exports.getCovidData = catchAsync(async (req, res) => {
  await state.data.getTotalResults();
  res.status(200).json({
    data: state.data.totalResults,
  });
});

exports.getCovidDataByParams = catchAsync(async (req, res) => {
  await state.data.getDataByName(req.params.st, req.query.dst);
  if (req.params.st && req.query.dst) {
    res.status(200).json({
      data: state.data.getDistrictData,
    });
  } else if (req.params.st && !req.query.dst) {
    res.status(200).json({
      data: state.data.getStateData,
    });
  }
});
