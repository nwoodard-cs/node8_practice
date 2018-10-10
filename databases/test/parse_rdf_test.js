'use strict'

const fs = require('fs')
const { expect } = require('chai')

const parseRDF = require('../lib/parse_rdf.js')

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`)

describe('parseRDF', () => {
    it('should be a function', () => {
        expect(parseRDF).to.be.a('function')
    })

    it('should parse RDF content', () => {
        const book = parseRDF(rdf)
        expect(book).to.be.an('object')
    })
})