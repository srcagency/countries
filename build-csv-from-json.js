#!/usr/bin/env node
'use strict';

const fs = require('fs');
const csv = require('csv-write-stream');
const JSONStream = require('JSONStream');

fs.createReadStream(__dirname+'/countries.json')
	.pipe(JSONStream.parse('*'))
	.pipe(csv())
	.pipe(fs.createWriteStream(__dirname+'/countries.csv'));
