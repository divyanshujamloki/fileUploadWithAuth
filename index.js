const express = require("express");
const app = express();
const { createDB, connectToDB } = require("./config/db");
const userRoutes = require('./Routes/users')
const productsRoutes = require("./Routes/products");

const PORT = 5000;

app.use(express.json());
app.use(express.static("content"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productsRoutes);



app.listen(PORT, () => {
    console.log("Server Running", PORT);
    connectToDB();
})