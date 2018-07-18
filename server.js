let express    = require("express"),
	  webpush    = require("web-push"),
	  bodyParser = require("body-parser"),
	  path 	     = require("path"),
    requireFu  = require('require-fu');


const app = express();


app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());


const publicVapidKey = "BJ7dGWBlWRm4t3rQ3dcac0nNkDZqy1AHp00HTckcPNYyypDz4cuVmDe81KwdrQ6B7BPVuFMuigMR7wy6jc2haBE";
const privateVapidKey = "e9gTDXqj8Meu6IA1pqnpC3eb2vWw0QbEohct_oGxNoU";

webpush.setVapidDetails(
  "mailto:niko-west@mail.ru",
  publicVapidKey,
  privateVapidKey
);

function getRandom(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let sites = ["https://google.com/", "https://yandex.ru/", "https://vk.com/", "https://mail.ru/", "https://github.com/"]

// Subscribe Route
app.post("/subscribe", (req, res) => {

  const subscription = req.body;
  console.log(subscription);


  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push Test", link: sites[getRandom(0, 4)] });


  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));



//----------------------------------------------------------------------------------------
// Mongo DB Settings

let db = require('./database/utils/DataBaseUtils.js');
db.setUpConnection();