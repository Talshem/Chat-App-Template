const express = require('express');

const app = express();

app.use(express.json());

/* Enter code Below */
let messages = []

app.get('/messages', (req, res) => {
try {
res.send(messages)
  } catch (err) { res.json(err)}
})


app.post('/messages', (req, res) => {
const { body, user } = req.body
try {
messages.push({body: body, user: user})
res.send('sent')
  } catch (err) { res.json(err)}
})



/* Enter code Above */

module.exports = app;