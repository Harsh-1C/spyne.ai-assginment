const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db.js");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const swaggerDocument = require("./swagger-output.json");

connectDB();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/v1/user", require("./routes/user.routes.js"));
app.use("/api/v1/product", require("./routes/product.routes.js"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(`Server Running in on port ${process.env.PORT}`);
});
