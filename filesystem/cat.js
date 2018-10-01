#!/usr/bin/env node
'use strict'
// chmod +x cat.js to make executable
require('fs').createReadStream(process.argv[2]).pipe(process.stdout)