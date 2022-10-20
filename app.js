const express = require("express");
const router = require("./routes");
const app = express();
const morgan = require("morgan");
const controller = require("./controllers");
require("dotenv").config();

const { HTTP_PORT } = process.env;

app.set("view engine", "ejs");
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

// const { HTTP_PORT } = process.env;
// console.log("Connection has been established successfully.");

// app.use(express.json()); // untuk membaca body tipe json

// app.use(morgan("dev")); // untuk logging

// app.set("view engine", "ejs");

// app.get("/error", (_req, _res) => {
//     error; // mengembalikan error makanya langsung memanggil exception
// });

// app.use(router);

// app.use(controller.notFound);

// // server-error
// app.use(controller.exception);

// app.listen(HTTP_PORT, () =>
//   console.info(`Listening on HTTP_PORT ${HTTP_PORT}`)
// );

module.exports = app;
