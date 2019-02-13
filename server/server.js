//all variables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const restaurantRouter = require('./routes/restaurant.router');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/restaurants', restaurantRouter);

//start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);    
}); //end listener