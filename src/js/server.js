var jsdom = require("jsdom");
const html = require('html')
var JSDOM = jsdom.JSDOM;
const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => {
    console.log("Application started and Listening on port : "+port);
});
//app.use(express.static("/js"))
app.set('view engine', 'ejs')
app.use('js', express.static('js'));
app.use(express.json())
var countryy;
var countryy2;
var yeartoarrayposition = 1956  // a year's value is in year-yeartoarrayposition position of array arrayxxx2
var countries=[]
var datarray = []
var arrayxxx=[]
var arrayxxx2=[]
var arrayxxx3=[]
var arrayxxx4=[]
var comparisons=[]
var stringg;
var stringg2;
var stringg3;
var fyear;
var lyear;
var showyears;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
global.document = new JSDOM(html).window.document;
var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'YOURMYSQLWORKBENCHPASSWORD',
  database : 'mydata'
});
 
connection.connect();
 
connection.query('SELECT DISTINCT cn FROM data', function (error, results, fields) {
  if (error) throw error;
  var x = results.length;
  for(i=0; i<x; i++){
    countries.push(results[i].cn);
  }
  //console.log('Countries :', countries);

});
connection.query('SELECT DISTINCT indn FROM data', function (error, results, fields) {
  if (error) throw error;
  var y = results.length;
  for(i=0; i<y; i++){
    comparisons.push(results[i].indn);
  }
  //console.log('Number of comparisons : ', y);
  //console.log('Comparisons : ', comparisons);
});

app.get("/", (req, res) => {
    res.render("index", {country: countries, comparison: comparisons})
});
app.post('/', (req, res) => {
    if (req.body.grapht=='bar'){
      res.redirect('/barchartindex');
    }
    else{
      if (req.body.grapht=="scatter"){
        res.redirect('/scatterplotindex');
      }
      else if (req.body.grapht=="timeline"){
        res.redirect('/timelineindex');
      }
      else{
        res.redirect('/');
      }
    }

});
app.get("/timelineindex", (req, res) => {
  res.render("timelineindex", {country: countries, comparison: comparisons})
});
app.post('/timelineindex', (req, res) => {
  //console.log(req.body)
  countryy = JSON.stringify(req.body.fcountry);
  countryy2 = JSON.stringify(req.body.scountry);
  stringg = JSON.stringify(req.body.comp);
  stringg = stringg.substr(2,stringg.length-3);
  stringg2 = JSON.stringify(req.body.scomp);
  stringg2 = stringg2.substr(2,stringg2.length-3);
  showyears = JSON.stringify(req.body.showyears);
  fyear = parseFloat(req.body.fyear);
  lyear = parseFloat(req.body.lyear);
  res.redirect('/timeline');
});
app.get("/scatterplotindex", (req, res) => {
  res.render("scatterplotindex", {country: countries, comparison: comparisons})
});
app.post('/scatterplotindex', (req, res) => {
  //console.log(req.body)
  countryy = JSON.stringify(req.body.fcountry);
  stringg = JSON.stringify(req.body.comp);
  stringg = stringg.substr(2,stringg.length-3);
  stringg2 = JSON.stringify(req.body.scomp);
  stringg2 = stringg2.substr(2,stringg2.length-3);
  showyears = JSON.stringify(req.body.showyears);
  res.redirect('/scatterplot');
});
app.get("/barchartindex", (req, res) => {
  res.render("barchartindex", {country: countries, comparison: comparisons})
});
app.post('/barchartindex', (req, res) => {
  //console.log(req.body)
  countryy = JSON.stringify(req.body.fcountry);
  stringg = JSON.stringify(req.body.comp);
  stringg = stringg.substr(2,stringg.length-3);
  stringg2 = JSON.stringify(req.body.scomp);
  stringg2 = stringg2.substr(2,stringg2.length-3);
  stringg3 = JSON.stringify(req.body.tcomp);
  stringg3 = stringg3.substr(2,stringg3.length-3);
  showyears = JSON.stringify(req.body.showyears);
  fyear = parseFloat(req.body.fyear);
  lyear = parseFloat(req.body.lyear);
  res.redirect('/barchart');
});
app.get("/barchart", (req, res) => {
  stringg = ' '+stringg;
  stringg2 = ' '+stringg2;
  stringg3 = ' '+stringg3;
  stringg = JSON.stringify(stringg);
  stringg2 = JSON.stringify(stringg2);
  stringg3 = JSON.stringify(stringg3);
  querystring = `SELECT * FROM data WHERE cn = ${countryy} AND indn = ${stringg}`;
  querystring2 = `SELECT * FROM data WHERE cn = ${countryy} AND indn = ${stringg2}`;
  querystring3 = `SELECT * FROM data WHERE cn = ${countryy} AND indn = ${stringg3}`;
  connection.connect();
  connection.query(querystring, function (error, results, fields) {
    if (error) throw error;
    var xxx = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx.push(results[i]);
    }
    if(stringg !== '" --"'){
      arrayxxx = Object.values(xxx[0]);
    }
  });
  connection.query(querystring3, function (error, results, fields) {
    if (error) throw error;
    var xxx3 = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx3.push(results[i]);
    }
    if(stringg3 !== '" --"'){
      arrayxxx3 = Object.values(xxx3[0]);
    }
  });
  connection.query(querystring2, function (error, results, fields) {
    if (error) throw error;
    var xxx2 = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx2.push(results[i]);
    }
    if(stringg2 !== '" --"'){
      arrayxxx2 = Object.values(xxx2[0]);
    }
    datarray = [];
    datarray.push(lyear - fyear + 1);
    for(var i = fyear - yeartoarrayposition; i <= lyear - yeartoarrayposition; i++){
      datarray.push(arrayxxx[i]);
      datarray.push(arrayxxx2[i]);
      datarray.push(arrayxxx3[i]);
    }
    stringarray = [stringg, stringg2, stringg3, countryy];
    res.render("barchart", {x: datarray, strings: stringarray, showyeaar: showyears, fyeaar: fyear, syeaar: lyear});
});});
app.post('/barchart', (req, res) => {
  res.redirect('/');
});
app.get("/scatterplot", (req, res) => {
  stringg = ' '+stringg;
  stringg2 = ' '+stringg2;
  stringg = JSON.stringify(stringg);
  stringg2 = JSON.stringify(stringg2);
  querystring = `SELECT * FROM data WHERE cn = ${countryy} AND indn = ${stringg}`;
  querystring2 = `SELECT * FROM data WHERE cn = ${countryy} AND indn = ${stringg2}`;
  connection.connect();
  connection.query(querystring, function (error, results, fields) {
    if (error) throw error;
    var xxx = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx.push(results[i]);
    }
    arrayxxx = Object.values(xxx[0]);
  });
  connection.query(querystring2, function (error, results, fields) {
    if (error) throw error;
    var xxx2 = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx2.push(results[i]);
    }
    arrayxxx2 = Object.values(xxx2[0]);
    datarray = [];
    datarray.push(arrayxxx.length-4);
    for(var i = 4; i < arrayxxx.length; i++){
      datarray.push(arrayxxx[i]);
      datarray.push(arrayxxx2[i]);
    }
    stringarray = [stringg, stringg2, countryy];
    res.render("scatterplot", {x: datarray, strings: stringarray});
  });
});
app.post('/scatterplot', (req, res) => {
  res.redirect('/');
});
app.get("/timeline", (req, res) => {
  datarray = [];
  var counterr = 0;
  stringg = ' '+stringg;
  stringg2 = ' '+stringg2;
  stringg = JSON.stringify(stringg);
  stringg2 = JSON.stringify(stringg2);
  querystring = `SELECT * FROM data WHERE cn = ${countryy} AND indn = ${stringg}`;
  querystring2 = `SELECT * FROM data WHERE cn = ${countryy} AND indn = ${stringg2}`;
  querystring3 = `SELECT * FROM data WHERE cn = ${countryy2} AND indn = ${stringg}`;
  querystring4 = `SELECT * FROM data WHERE cn = ${countryy2} AND indn = ${stringg2}`;
  connection.connect();
  connection.query(querystring, function (error, results, fields) {
    if (error) throw error;
    var xxx = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx.push(results[i]);
    }
    if(stringg !== '" --"' && countryy !== '"---"'){
      arrayxxx = Object.values(xxx[0]);
    }
  });
  connection.query(querystring3, function (error, results, fields) {
    if (error) throw error;
    var xxx3 = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx3.push(results[i]);
    }
    if(stringg !== '" --"' && countryy2 !== '"---"'){
      arrayxxx3 = Object.values(xxx3[0]);
    }
  });
  connection.query(querystring4, function (error, results, fields) {
    if (error) throw error;
    var xxx4 = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx4.push(results[i]);
    }
    if(stringg2 !== '" --"' && countryy2 !== '"---"'){
      arrayxxx4 = Object.values(xxx4[0]);
    }
  });
  connection.query(querystring2, function (error, results, fields) {
    if (error) throw error;
    var xxx2 = [];
    var x = results.length;
    for(i=0; i<x; i++){
      xxx2.push(results[i]);
    }
    if(stringg2 !== '" --"' && countryy !== '"---"'){
      arrayxxx2 = Object.values(xxx2[0]);
    }
    for(var i = fyear - yeartoarrayposition; i <= lyear - yeartoarrayposition; i++){
      if(stringg2 !== '" --"' && countryy !== '"---"'){
        datarray.push(arrayxxx2[i]);
      }
      if(stringg !== '" --"' && countryy !== '"---"'){
        datarray.push(arrayxxx[i]);
      }
      if(stringg !== '" --"' && countryy2 !== '"---"'){
        datarray.push(arrayxxx3[i]);
      }
      if(stringg2 !== '" --"' && countryy2 !== '"---"'){
        datarray.push(arrayxxx4[i]);
      }
    }
    stringarray = [countryy, countryy2, stringg, stringg2];
    res.render("timeline", {x: datarray, strings: stringarray, showyeaar: showyears, fyeaar: fyear, syeaar: lyear});
});});
app.post('/timeline', (req, res) => {
  res.redirect('/');
});