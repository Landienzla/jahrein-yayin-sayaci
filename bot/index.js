var admin = require("firebase-admin");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const { update,ref: dbref,getDatabase} = require("firebase/database");
const axios = require("axios");

const { parse } = require("node-html-parser");
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL:
    "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
var dailyImageURL = null;
var serviceAccount = require("./config.json");
const { firestore, database } = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "",
  databaseAuthVariableOverride: null,
});
var rtdatabase = getDatabase(firebaseApp)
var db = admin.database();
var refs = db.ref("/botSettings");
var tweetTime = null;
var dayCount = null;
refs.on("value", function (snapshot) {
  tweetTime = snapshot.val()["tweetTime"];
  dayCount = snapshot.val()["dayCount"];
  if (dayCount !== null) {
    const imageRef = ref(storage, `images/${dayCount}.jpg`);
    getDownloadURL(imageRef)
      .then((url) => (dailyImageURL = url))
      .catch((err) => console.log(err));
  }
});

var tweetStatus = false;
function checkTime() {
  var now = new Date();
  var time = "";
  now = time.concat(
    ("0" + now.getHours()).slice(-2),
    ":",
    ("0" + now.getMinutes()).slice(-2)
  );
  if (now === tweetTime && tweetStatus === false) {
    tweetStatus = true;

    console.log("tivit attır");
    axios
      .get(`<flask app url>`, {
        params: {
          imageURL: dailyImageURL,
        },
      })
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
  }
  if (now === "00:00") {
    tweetStatus = false;
  }
}
var parsedHTML = null;
function checkDayCount() {
  axios
    .get("https://m.twitch.tv/jahrein/home")
    .then((resp) => (parsedHTML = parse(resp.data)))
    .catch((err) => console.log(err));
}
setInterval(() => {
  checkTime();
  checkDayCount();
  if (parsedHTML) {
    update(dbref(rtdatabase, "botSettings"), {
      dayCount: parseInt(
        parsedHTML
          .querySelector(".CoreText-sc-smutr2-0.bPzDWH")
          ._attrs.title.replace(/[^\d.]/g, "")
      ),
    });
  }
}, 1000);
