const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const path = require('path')
const app = express()
const ApiRouter = require('./routes/router')
const authRouter = require("./routes/auth");
require('dotenv').config()
const PORT = process.env.PORT || 5678
app.use(cors())
app.use(helmet())
app.use(express.static(__dirname+'/404'))
app.use(express.json())
// DB Connection
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true,  useUnifiedTopology: true }).then(()=>{
    console.log('MonggoDB Connected')
},(err)=>{
    console.log(err)
})


app.use("/auth/", authRouter);
app.use('/api/v1',ApiRouter)
app.get("*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname+'/404/index.html'))
})

function validateUser(req, res, next) {
    jwt.verify(
        req.headers["x-access-token"],
        process.env.JWT_SECRET_KEY,
        function (err, decoded) {
            if (err) {
                res.status(401).json({
                    status: "unauthorization",
                    message: err.message,
                });
            } else {
                // add user id to request
                req.body.userId = decoded.id;
                next();
            }
        }
    );
}

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})


