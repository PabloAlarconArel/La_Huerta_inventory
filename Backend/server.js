require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors= require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors(
    {origin:'http://localhost:5173',
    credentials:true ,
    }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a MongoDB");

}).catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1); 
    
});

app.use("/api",require("./routes/auth"));
app.use("/api",require("./routes/productRoute"));


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});