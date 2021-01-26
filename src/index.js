const express = require('express')
const bodyParser = require('body-parser')
const neatCsv = require('neat-csv');
const multer = require("multer");
const csv2json = require("csvtojson");
const pool = require('./database');

const app = express()
const port = 9999

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/upload-csv',multer({ dest: 'temp/' }).single('csv'), async (req,res) => {
  const csvData = await csv2json().fromFile(req.file.path);
  
  pool.query(
    `COPY csv_table FROM ${req.file.path}`,
    (error, results)=> {
      if (error) {
        console.log('error');
        res.send({msg:"Failed"});
      }
      res.send({msg:"Success"});
    }
  )
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})