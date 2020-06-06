const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =  require('../utils/geocode')
const forecast =  require('../utils/forecast')
const app = express()

const port = process.env.PORT || 3000 //this sets PORT equal to  environment variable variable this is only applicable to heroku


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')//used to create dynamic template
app.set('views', viewsPath)//here we are pointing express to our custom directory
hbs.registerPartials(partialsPath)


//Setup static directory
app.use(express.static(publicDirectoryPath))

// Response.render gets a particular view and converts it to html 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){ //here we are setting the weather endpoint to accept address and display error if not possible
        return res.send({
           error: 'Location is required'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if(error){
            return res.send((error))
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send(('Error', error))
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
      })
    })
   
})

app.get('*', (req, res) => {
    res.send('404 page error')
})


app.listen(port, () => {
    console.log('Server is up on port' + port)
})