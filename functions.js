const dbConnection = require('./connection');
const sql = require('mssql');
//const { values } = require('lodash');

async function getSelect(tableName)
{
    console.log('Connecting to SQL');
    let dbContext = await sql.connect(dbConnection);
    let strQuery = 'Select * from '+ tableName;
    //execute the query in db and store the results in variable
    let results = await dbContext.request().query(strQuery);
    return results.recordset;
}

async function getDelete(tableName, id)
{
    console.log('Connecting to SQL');
    let dbContext = await sql.connect(dbConnection);
    //In case of delete, update the isDelete column, such that we can preserve data
    let strQuery = 'Update '+ tableName + ' SET IsDeleted = 1 WHERE id = '+ id;
    let results = await dbContext.request().query(strQuery);
    return results;
}

//insert data
async function insertData(tableName, columnArray, valuesArray)
{
    //frame the insert query
    let strQry = frameInsertQuery(tableName, columnArray, valuesArray);
    console.log('Connecting to SQL');
    let dbContext = await sql.connect(dbConnection);
    //exceute the insert query
    let results = await dbContext.request().query(strQry);
    return results;

}

//update data
async function updateData(tableName, columnArray, valuesArray, id)
{
    //frame the update query
    let strQry = frameUpdateQuery(tableName, columnArray, valuesArray, id);
    console.log('Connecting to SQL');
    let dbContext = await sql.connect(dbConnection);
    //execute query
    let results = await dbContext.request().query(strQry);
    return results;
}

//to frame query
function frameInsertQuery(tableName, columnArray, valuesArray)
{
    let strQry = 'INSERT INTO '+ tableName + ' (';
    //adding column names
    for(let i in columnArray)
    {
        strQry += columnArray[i] + ',';
    }
    strQry = strQry.substring(0, strQry.length - 1);
    strQry += ') VALUES(';
    //column data
    for(let i in valuesArray)
    {
        strQry += valuesArray[i] + ',';
    }
    strQry = strQry.substring(0, strQry.length - 1);
    strQry += ')';
    return strQry;
}

//to frame update query
function frameUpdateQuery(tableName, columnArray, valuesArray, id)
{
    let strQry = 'Update ' + tableName + ' SET ';
    //column names and values
    for(let i = 0; i < columnArray.length; i++)
    {
        strQry += columnArray[i] + ' = ' + valuesArray[i] + ',';
    }
    strQry = strQry.substring(0, strQry.length - 1);
    //where condition is important, otherwise , it will update all the row
    strQry += ' Where id =' + id;
    return strQry;
}

module.exports = {getSelect, getDelete, insertData, updateData};