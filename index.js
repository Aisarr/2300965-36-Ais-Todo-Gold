const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./backend/routes/todo.routes');

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
  };

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running: http://localhost:${port}`)
})