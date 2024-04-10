const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use("/api/easy-rice",require("./routes/riceRoutes"));
app.use("/api/easy-rice",require("./routes/standardRoutes"));
app.use("/api/easy-rice",require("./routes/grainsRoutes"));

connectDb();
 
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})