require('dotenv').config();
const cors = require("cors");

const express = require('express');
//const bodyParser = require('body-parser');
//const fileUpload = require('express-fileupload');

const conectarMongo = require('./config/config.mongoose.js');

const userRouter = require('./routes/router.user.js');
const postRouter = require('./routes/router.post.js');
const commentRouter = require('./routes/router.comment.js');
const autenticacionRouter = require('./routes/router.authenticate.js');
//const archivoRouter = require('./routes/archivoRouter.js');
//const georefRouter = require('./routes/georefRouter.js');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Middleware
//app.use(bodyParser.json());
//app.use(fileUpload());

// Rutas
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(autenticacionRouter);
//app.use(archivoRouter);
//app.use(georefRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    //database();
    conectarMongo();
});