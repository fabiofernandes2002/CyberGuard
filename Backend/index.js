require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8000;
const users = require('./routes/users.routes.js');
const courses = require('./routes/courses.routes.js');
const chats = require('./routes/chats.routes.js');
//const {swaggerUi, specs} = require("./swagger.js")

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/courses', courses);
app.use('/chats', chats);

// Conexão com o Banco de Dados MongoDB
mongoose.connect('mongodb+srv://CyberGuardDB:cyberguard2324@cluster0.7xyeeqp.mongodb.net/CyberGuardDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to the Database MongoDB")
});


app.listen(port, function() {
    console.log(`http://localhost:${port}`)
})  