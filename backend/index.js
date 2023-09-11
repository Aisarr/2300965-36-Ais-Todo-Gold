const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/todo.routes');

const corsOptions = {
    origin: 'http://localhost:3000',
  };

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running: http://localhost:${port}`)
})