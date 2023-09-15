require("express-async-errors")

const AppError = require("./utils/AppError")

const express = require("express");
const Routes = require("./routes")

const app = express();
app.use(express.json());

app.use("/", Routes)

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))