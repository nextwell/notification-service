let express    = require("express"),
	webpush    = require("web-push"),
	bodyParser = require("body-parser"),
	path 	   = require("path"),
    requireFu  = require('require-fu'),
    pug 	   = require('pug');




//----------------------------------------------------------------------------------------
// Web Push Settings

const publicVapidKey = "BJ7dGWBlWRm4t3rQ3dcac0nNkDZqy1AHp00HTckcPNYyypDz4cuVmDe81KwdrQ6B7BPVuFMuigMR7wy6jc2haBE";
const privateVapidKey = "e9gTDXqj8Meu6IA1pqnpC3eb2vWw0QbEohct_oGxNoU";

webpush.setVapidDetails(
  "mailto:niko-west@mail.ru",
  publicVapidKey,
  privateVapidKey
);


//----------------------------------------------------------------------------------------
// Mongo DB Settings

let db = require('./database/utils/DataBaseUtils.js');
db.setUpConnection();


//----------------------------------------------------------------------------------------
// Express Settings

const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 5000;

requireFu(__dirname + '/routes')(app, db);

app.listen(port, () => console.log(`Server started on port ${port}`));


