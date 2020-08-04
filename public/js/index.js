import "@babel/polyfill";
import axios from "axios";

const stateCoordinatesIndia = JSON.parse(
  document.getElementById("map").dataset.coordinates
);

mapboxgl.accessToken =
  "pk.eyJ1IjoicmlzaGkzcGIyIiwiYSI6ImNrZGVja2dsNjIyM2Iycms2MWZ3Nmg5M2MifQ.VDpoOSmGxEpj2nLJu0rLBw";
var map = new mapboxgl.Map({
  container: "map",
  center: [77, 20],
  style: "mapbox://styles/rishi3pb2/ck8wwmd3g3phu1jsykcgd85md",
  zoom: 3.5,
  scrollZoom: false,
});
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })
);

async function mapEffect() {
  let countryResult, stateResultIndia;
  try {
    countryResult = await axios.get("https://corona.lmao.ninja/v2/countries");
    stateResultIndia = await axios.get(
      "https://api.covidindiatracker.com/state_data.json"
    );
  } catch (e) {
    console.log(`Failed to fetch countries: ${e.message}`, e);
  }

  const countryLocations = countryResult.data.map((el) => {
    const obj = {
      coordinates: {
        lng: el.countryInfo.long,
        lat: el.countryInfo.lat,
      },
      info: {
        country: el.country,
        totalCases: el.cases,
        activeCases: el.active,
        recoveredCases: el.recovered,
        criticalCases: el.critical,
        totalDeaths: el.deaths,
      },
    };
    return obj;
  });

  const stateInfoIndia = stateResultIndia.data.map((el) => {
    const obj = {
      coordinates: stateCoordinatesIndia.filter((l) => {
        return el.state === l.state;
      }),
      info: {
        state: el.state,
        totalCases: el.confirmed,
        activeCases: el.active,
        recoveredCases: el.recovered,
        totalDeaths: el.deaths,
      },
    };
    console.log(obj);
    return obj;
  });

  stateInfoIndia.forEach((e) => {
    const el = document.createElement("div");
    el.className = "marker2";

    const markup = `<div>
      <span style="color: blue; font-family: cursive; font-size: 14px; font-weight: 600;">State:</span> ${e.info.state}</br>
      <span style="color: brown; font-family: cursive; font-size: 14px; font-weight: 600;">Total Cases:</span> ${e.info.totalCases}</br>
      <span style="color: red; font-family: cursive; font-size: 14px; font-weight: 600;">Active Cases:</span> ${e.info.activeCases}</br>
      <span style="color: green; font-family: cursive; font-size: 14px; font-weight: 600;">Recoverd Cases:</span> ${e.info.recoveredCases}</br>
      <span style="color: purple; font-family: cursive; font-size: 14px; font-weight: 600;">Deaths:</span> ${e.info.totalDeaths}</br>
    </div>`;
    const lnglat = e.coordinates[0].cordinates;
    const popup = new mapboxgl.Popup({ offset: 10 })
      .setLngLat(lnglat)
      .setHTML(markup);

    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(lnglat)
      .setPopup(popup)
      .addTo(map);
  });

  countryLocations.forEach((loc) => {
    const el = document.createElement("div");
    el.className = "marker";

    const markup = `<div>
      <span style="color: blue; font-family: cursive; font-size: 14px; font-weight: 600;">Country:</span> ${loc.info.country}</br>
      <span style="color: brown; font-family: cursive; font-size: 14px; font-weight: 600;">Total Cases:</span> ${loc.info.totalCases}</br>
      <span style="color: red; font-family: cursive; font-size: 14px; font-weight: 600;">Active Cases:</span> ${loc.info.activeCases}</br>
      <span style="color: green; font-family: cursive; font-size: 14px; font-weight: 600;">Recoverd Cases:</span> ${loc.info.recoveredCases}</br>
      <span style="color: orange; font-family: cursive; font-size: 14px; font-weight: 600;">Critical cases:</span> ${loc.info.criticalCases}</br>
      <span style="color: purple; font-family: cursive; font-size: 14px; font-weight: 600;">Deaths:</span> ${loc.info.totalDeaths}</br>
    </div>`;
    const popup = new mapboxgl.Popup({ offset: 10 })
      .setLngLat(loc.coordinates)
      .setHTML(markup);

    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .setPopup(popup)
      .addTo(map);
  });
}
mapEffect();
