const db = require('./functions');
const express = require('express');
const PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

//retrive data from the given table name
router.route('/select/:tableName').get((request, response) => {
    let val = JSON.stringify(request.params);
    console.log('Request Parameters = ${val}');
    db.getSelect(request.params.tableName).then(results => {
        console.dir(results);
        response.json(results)
    });
});

//delete the row from the given table name and Id
router.route('/delete').delete((request, response) => {
    let tableName = request.body.tableName;
    let id = request.body.id;
    db.getDelete(tableName, id).then(results => {
        console.dir(results);
        response.json(results);
    }); 
});

//insert new row into the specified table name
router.route('/insert').post((req, res) => {
    var tableName = req.body.tableName;
    var Columns = req.body.columnNames;
    //spliting into array, to frame query
    var columnArray = Columns.split(','); 
    var Values = req.body.Values;
    var valuesArray = Values.split(',');
    console.log(req.body);
    db.insertData(tableName, columnArray, valuesArray).then(results =>{
        console.dir(results);
        res.send(results);
    });
    });

//update the given table data 
router.route('/update').put((req, res) => {
    var tableName = req.body.tableName;
    var Columns = req.body.columnNames;
    //spliting into array, to frame query
    var columnArray = Columns.split(','); 
    var Values = req.body.Values;
    var valuesArray = Values.split(',');
    var id = req.body.Id;
    console.log(req.body);
    db.updateData(tableName, columnArray, valuesArray, id).then(results =>{
        console.dir(results);
        res.send(results);
    });
    });


app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
  });