const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')

dotenv.config();
connectDB();

const app = express()

// app.use(cors())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json())
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/posts", require("./routes/post"));




const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))