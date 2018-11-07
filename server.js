let express    = require("express"),
  webpush    = require("web-push"),
  bodyParser = require("body-parser"),
  path     = require("path"),
    requireFu  = require('require-fu'),
    pug      = require('pug'),
    session    = require('express-session'),
    fileUpload = require('express-fileupload');




//----------------------------------------------------------------------------------------
// Web Push Settings

const publicVapidKey =  process.env.publicVapidKey || "BJ7dGWBlWRm4t3rQ3dcac0nNkDZqy1AHp00HTckcPNYyypDz4cuVmDe81KwdrQ6B7BPVuFMuigMR7wy6jc2haBE";
const privateVapidKey = process.env.privateVapidKey || "e9gTDXqj8Meu6IA1pqnpC3eb2vWw0QbEohct_oGxNoU";

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

let sessionMiddleware = session({
    secret: "skey",
    resave: true,
    saveUninitialized: true
});

app.use(fileUpload());

app.use(sessionMiddleware);

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const all_routes = require('express-list-endpoints');




const requestIp = require('request-ip');
app.use(requestIp.mw())



let Carousels = [];


const port = 5000;

requireFu(__dirname + '/routes')(app, db, Carousels);

console.log(all_routes(app));




app.listen(port, () => console.log(`Server started on port ${port}`));



//----------------------------------------------------------------------------------------
// Caurosel stuff

let CarouselControl = require('./modules/CarouselControl.js').CarouselControl;
/*let Carousel = new CarouselControl({db: db});
Carousel.add({name: "NAME", advs: ['0', '1', '2', '3'], timer: 1})*/

let loadCarousels = require('./modules/CarouselControl.js').loadCarousels;
let CarouselsDATA = null;

(async() => {
    

    CarouselsDATA = await loadCarousels(db);


    //console.log(CarouselsDATA)

    CarouselsDATA.forEach(function(item, i, array){
        Carousels.push(new CarouselControl({db: db, object: item}))
    })
    console.log(Carousels)
 })();

