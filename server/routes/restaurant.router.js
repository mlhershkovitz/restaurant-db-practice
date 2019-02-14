//requires/constants
const express = require('express');
//const bodyParser = require('body-parser');
const restaurantRouter = express.Router();
const pg = require('pg');

//DB/SQL CONNECTION
const Pool = pg.Pool;
const pool = new Pool({
    database: 'restaurant-list',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}); //end connection

//check the connection
pool.on('connect', () => {
    console.log('successfully connected to DB');
}); //end successful connection
pool.on('error', (error) => {
    console.log('error connecting to DB', error);
}); //end error

restaurantRouter.get('/', (req, res) => {
    console.log('in GET request');
    let queryString = `SELECT * FROM "restaurants" ORDER BY id;`;
    pool.query(queryString)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });//end error check
}); // end GET


//POST request for new task info
restaurantRouter.post('/', (req, res) => {
    console.log('in server POST request');
    let restaurants = req.body;
    let queryString = `INSERT INTO "restaurants" ("name", "type", "rating")
                        VALUES($1, $2, $3)`;
    pool.query(queryString, [restaurants.name, restaurants.type, restaurants.rating]).then(()=>{
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });//end error
});// end post request


restaurantRouter.delete('/:id', (req, res) => {
    console.log('in server delete request');
    //declare variable for ids
    //let restaurantDelete = req.params.id;
    console.log('connecting to ids', req.params);
    let queryString= `DELETE FROM "restaurants" WHERE "id" = $1;`;
    pool.query(queryString,  [req.params.id]).then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log('error in delete', error);
        res.sendStatus(500);
    }); //end error
}); // end delete request

restaurantRouter.put('/:id', (req, res) => {
    console.log('in server delete request');
    //declare variable for ids
    //let restaurantDelete = req.params.id;
    console.log('connecting to ids', req.params);
    let queryString= `UPDATE "restaurants" SET "rating" = 5 WHERE "id" = $1;`;
    pool.query(queryString, [req.params.id]).then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log('error in delete', error);
        res.sendStatus(500);
    }); //end error
}); // end put request



module.exports = restaurantRouter;