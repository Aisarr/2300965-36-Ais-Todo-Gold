const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./server/routes/todo.routes');

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running: http://localhost:${port}`)
})