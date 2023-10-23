const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const saltRounds = 10;
app.use(cors())

app.use(express.json())
const connection = mysql.createConnection({
  hostname: '127.0.0.1 ',
  user: 'root',
  password: '',
  database: 'myfirstdatabase',
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server is worked in port: 3000');
})



connection.connect((err) => {
  if (err) {
    console.log("Error connection");
  } else {
    console.log("worked");
  }
})




app.get('/', (req, res) => {
  res.send("hello")
})




app.post('/registr', async (req, res) => {
  const usernameToCheck = req.body.name;
  const sqlSelect = "SELECT * FROM user WHERE NAME = ?";
  const sqlInsert = "INSERT INTO user (name, password) VALUES (?, ?)";
  const { name, password } = req.body;
  let hashPassword = await bcrypt.hash(password, saltRounds).then(pass => pass)
  const values = [name, hashPassword];
  connection.query(sqlSelect, [usernameToCheck], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении SELECT:', err);
    }
    if (results.length > 0) {

      res.status(200).json({ exists: true, message: 'Пользователь существует' });
    } else {
      res.status(200).json({ exists: false, message: 'Пользователь не существует' });
      connection.query(sqlInsert, values, (err, results) => {
      })
    }
  });
});