const express = require('express');
const {PORT,connect} = require('./config/server-config');
const approutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',approutes);

const setUpAndStartServer = ()=>{
    app.listen(PORT,async()=>{
        console.log("Server Running on Port",PORT);
        await connect();
        console.log("MongoDB connected");
    });
}

setUpAndStartServer();