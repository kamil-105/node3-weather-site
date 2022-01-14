const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./util/forecast')
const geocode = require('./util/geocode')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kamil'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Kamil"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Enter any location to get weather details",
        title: "Help",
        name: "Kamil"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "you must provide an address"
        })

    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({
                Error: error,               
                address: req.query.address
            })
        }
       
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    Error: error,               
                    address: req.query.address
                })

            }
           
            return res.send({
                forecast: forecastdata,   
                location: location,            
                address: req.query.address,
            })
             
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: "Kamil"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: "Kamil"
    })
})

app.listen(3000, () => {
    console.log('server is up on port: 3000')
})