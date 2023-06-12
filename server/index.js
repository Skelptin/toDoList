import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sql",
    database: "toDoList"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});




app.post('/insertData', (req, res) => {
    let { todo } = req.body

    try {
        con.query("INSERT INTO todos (todo) values (?)", [todo],
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                if (result) {
                    console.log(result)
                    res.send(result)
                }
            }
        )
        console.log("Data inserted")

    } catch (err) {
        console.log(err)
    }


})

app.get('/getData', (req, res) => {


    con.query("SELECT * FROM todos",
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                console.log(result)
                res.send(result)
            }
        })
})

app.put("/editData/:id", (req, res) => {
    const {id} = req.params;
    const { todo } = req.body;

    con.query("UPDATE todos set todo = ? WHERE id=?", [todo, id],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                res.send("Detail Updated")
            }
        }
    )
})

app.delete("/deleteData/:id", (req, res) => {
    let id = req.params.id

    con.query("DELETE FROM todos where id=?", id,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                res.send('Detail Deleted')
            }
            console.log(result)
        }
    )
})



app.listen(3000, (req, res) => {

    console.log("Server is running")
}) 