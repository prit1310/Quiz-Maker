const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./router/auth-router');
const queRoute = require('./router/question-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

dotenv.config();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));


app.use('/api/auth', authRoute);
app.use('/api', queRoute);

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database and start the server:', error.message);
  });

// Use the custom error middleware after all routes and other middleware
app.use(errorMiddleware);
