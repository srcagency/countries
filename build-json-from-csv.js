#!/usr/bin/env node
'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const map = require('through2-map').obj;
const JSONStream = require('JSONStream');

fs.createReadStream(__dirname+'/countries.csv')
	.pipe(csv())
	.pipe(map(function( country ){
		country.latitude = country.latitude.length === 0 ? undefined : +country.latitude;
		country.longitude = country.longitude.length === 0 ? undefined : +country.longitude;

		return country;
	}))
	.pipe(JSONStream.stringify('[\n\t', ',\n\t', '\n]'))
	.pipe(fs.createWriteStream(__dirname+'/countries.json'));
