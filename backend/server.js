const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

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




app.post('/post', (req, res) => {
  const usernameToCheck = req.body.name;
  const sqlSelect = "SELECT * FROM user WHERE name = ?";
  const sqlInsert = "INSERT INTO user (name, password) VALUES (?, ?)";
  const reqdata = req.body;
  const values = [reqdata.name, reqdata.password];


  connection.query(sqlSelect, [usernameToCheck], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении SELECT:', err);
    }

    if (results) {
      res.status(200).json({ exists: true, message: 'Пользователь существует'});
    } else {
      connection.query(sqlInsert, values, (err, results) => {
        console.log(results);
      })
      res.status(200).json({ exists: false, message: 'Пользователь не существует'});
    }
  });
});