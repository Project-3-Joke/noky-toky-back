require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);

// const projectRouter = require("./routes/project.routes");
// app.use("/api", isAuthenticated, projectRouter);

// const taskRouter = require("./routes/task.routes");
// app.use("/api", isAuthenticated, taskRouter);

//const productRouter = require("./routes/product.routes");
//app.use("/api", productRouter);

const jokeRouter = require("./routes/joke.routes");
app.use("/api", jokeRouter);

const productRouter = require("./routes/product.routes");
app.use("/api", productRouter);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

require("./error-handling")(app);

module.exports = app;
