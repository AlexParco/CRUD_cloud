const express = require('express')
const bodyParse = require('body-parser')
const Pool = require('pg').Pool
const app = express()
const PORT = process.env.PORT || 5000

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
        res.status(200).json(result.rows)
      })
    }

    getAgenda = (req, res) => {
      const id = req.params['id']
      conn.query('SELECT * FROM agenda WHERE id=$1',[id], (err, result) => {
        if(err){
          return err
        }
        res.status(200).json(result.rows)
      })
    }

    postAgenda = (req, res) => {
      const {name, number, description, fecha} = req.body
      conn.query('INSERT INTO agenda (name, number, description, fecha) values ($1, $2, $3, $4)',
       [name, number, description, fecha],
       (err, result) => {
        if(err){
          return err
        }
        res.status(200).json({"message": "success"})
      })
    }

    putAgenda = (req, res) => {
      const id = req.params['id']
      const {name, number, description, fecha} = req.body
      conn.query('UPDATE agenda set name=$1, number=$2, description=$3, fecha=$4 WHERE id = $5',
       [name, number, description, fecha, id],
       (err, result) => {
        if(err){
          return err
        }
        res.status(200).json({"message": "success"})
      })
    }

    deleteAgenda = (req, res) => {
      const id = req.params['id']
      conn.query('DELETE FROM agenda WHERE id = $1', [id], (err, result) => {
        if(err){
          return err
        }
        res.status(200).json({"message": "success"})
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
app.get('/agenda/:id', controller.getAgenda)
app.post('/agenda', controller.postAgenda)
app.put('/agenda', controller.putAgenda)
app.delete('/agenda', controller.deleteAgenda)


app.get('/test', (req, res) => {
  res.send("hola mundo")
})

app.listen(PORT, () => {
  console.log(`SERVER RUNNING IN http://localhost:${PORT}`)
})
