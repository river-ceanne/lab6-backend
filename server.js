'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static('./public'));

app.get('/', (request, response) =>{
  response.send('server works');
});

function GEOloc (query,fmtQ,lat,long){
  this.query = query;
  this.fmtQ = fmtQ;
  this.lat = lat;
  this.long = long;
}

app.get('/location', (request, response) => {
  const data = require('./data/geo.json');
  let cityQuery = request.query.data;
  console.log(`city query = ${cityQuery}`);
  let city = new GEOloc(cityQuery, data.results[0].formatted_address, data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
  response.send(city);
});


/**
 * funxtion GEOLoxation(var1, var1){}
 * 
 */

app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
