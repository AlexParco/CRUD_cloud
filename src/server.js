const express = require('express')
const bodyParse = require('body-parser')
const Pool = require('pg').Pool
const app = express()
const PORT = 4040

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({
  extended: true
}))

const conn = new Pool({
  user: 'postgres',
  host: 'db.vzrdioxrqfegfnvhdpgo.supabase.co',
  database: '01',
  password: 'alexparco151624',
  port: 5432,
})


class AgendaController{

    getAllAgendas = (req, res) => {
      conn.query('SELECT * FROM agenda', (err, result) => {
        if(err){
          return err
        }
        console.log(result)
        res.status(200).json(result.rows)
      })
    }
}

const controller = new AgendaController()

app.get('/', (req, res) => {
  res.sendFile('./index.html', {
    root: __dirname,
  })
})
app.get('/agenda', controller.getAllAgendas)
app.get('/test', (req, res) => {
  res.send("hola mundo")
})

app.listen(4040, () => {
  console.log(`SERVER RUNNING IN http://localhost:${PORT}`)
})

module.exports = app;