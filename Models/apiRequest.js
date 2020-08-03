const axios = require("axios");
class CovidApi {
  constructor() {
    this.results = [];
  }
  async getTotalResults() {
    try {
      const res = await axios("https://api.covidindiatracker.com/total.json");
      this.totalResults = res.data;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllResults() {
    try {
      const res = await axios(
        "https://api.covidindiatracker.com/state_data.json"
      );
      this.results = res.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getDataByDistrictName(st, dst) {
    for (let i = 0; i < this.getStateData.districtData.length; i++) {
      if (
        this.getStateData.state === st &&
        this.getStateData.districtData[i].id === dst
      ) {
        this.getDistrictData = this.getStateData.districtData[i];
        break;
      } else continue;
    }
  }

  async getDataByName(st, dst) {
    await this.getAllResults();
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].state === st) {
        this.getStateData = this.results[i];
        break;
      }
    }
    if (dst) {
      await this.getDataByDistrictName(st, dst);
    }
  }
}

module.exports = CovidApi;
