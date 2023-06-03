const express = require('express');
const { Client } = require('pg');
const fs=require('fs')
const bodyparser=require('body-parser')

const connectionString = 'postgres://postgres:Finserv@2023@localhost:5432/mydb2';
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('port', process.env.PORT || 5000);



app.get('/', function (req, res, next) {
    fs.readFile(__dirname+'/'+'update.html',(err,data)=> {
        res.end(data);
    });
});
app.post('/update', function (req, res) {
    var empid=(req.body.empid);
    var salary=(req.body.salary);

    client.query(`update Employee set salary=${salary} where empid=${empid}`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send("Data is updated");
    });
    
});



app.listen(5000, function () {
    console.log('Server is running.. on Port 5000');
});