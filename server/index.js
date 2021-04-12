const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'customersystem'
})

app.post('/create_user', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('INSERT INTO Users (username, password) VALUES (?, ?)', 
    [username, password], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted")
        }
    });
})


app.post('/add_to_watch_later_movie', (req, res) => {
    const userID = req.body.userID;
    const movieID = req.body.movieID;

    db.query('INSERT INTO watchlatermovies (userID, movieID) VALUES (?, ?)', 
    [userID, movieID], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values inserted")
        }
    });
})

app.get('/movie_watch_later_list/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT movieID FROM watchlatermovies WHERE userID = ?", id, (err, result) => {
        if (err){
            console.log(err)
        } else{
            res.send(result);
        }
    })
});

app.delete("/delete_watch_list/:userid/:movieid", (req, res) => {
    const userid = req.params.userid
    const movieid = req.params.movieid
    db.query("DELETE FROM watchlatermovies WHERE userID = ? AND movieID = ?", [userid, movieid], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
    });
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE username = ? and password = ?', 
    [username, password], 
    (err, result) => {
        if (err) {
            res.send({ err: err});
        } 

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Wrong username/password combination!"});
        }
    });
})

app.listen(3001, ()=> {
    console.log('Server is running')
})