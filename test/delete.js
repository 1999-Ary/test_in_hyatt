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
app.set('port', process.env.PORT || 4000);



app.get('/', function (req, res, next) {
    fs.readFile(__dirname+'/'+'delete.html',(err,data)=> {
        res.end(data);
    });
});
app.post('/delete', function (req, res) {
    var empid=eval(req.body.empid);
    var salary=eval(req.body.salary);

    client.query(`delete from employee where empid=${empid}`, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
    
});



app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});