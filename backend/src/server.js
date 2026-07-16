const cors = require("cors");
require("dotenv").config();

const express=require("express");
const connectDB=require("./config/db")
const app=express();
app.use(cors());
const PORT=3000;
const routes=require("./routes")
app.use(express.json());
app.use("/api",routes);
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
};
startServer();
