//! Core Modules
const path = require('path');

//! NPM Modules
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
require('dotenv').config()

//! Custom Modules 
const getForecastByGeocode = require('./utils/forecast-by-geocode')

//! Custom Vars
// init express
const app = express()
// custom logging, with custom success and error message styling
const log = console.log
const success = chalk.greenBright.bold.inverse
const error = chalk.redBright.bold.inverse
//  defining paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//? =======================================

// Setup static directory to serve
app.use(express.static(publicDirPath))

// setting up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => res.render('index', { title: "Weather", name: "Naya Willis" }))

app.get('/about', (req, res) => res.render('about', { title: "About", name: "Naya Willis" }))

//! Help article not found
app.get('/help/*', (req, res) => res.render('404', { title: '404-Not-found', error: 'Help article not found' }))
app.get('/help', (req, res) => res.render('help', { title: 'Help', name: "Naya Willis" }))

app.get('/weather', ({ query }={}, res) => getForecastByGeocode(query.address, res))

//! Not found handler
app.get('*', (req, res) => res.render('404', { title: '404-Not-found', error: 'Page not found' }))

//! Listening
app.listen(3000, err => {
        if (err) return log(error(err))
        log(success("Server is up on port 3000"))
})