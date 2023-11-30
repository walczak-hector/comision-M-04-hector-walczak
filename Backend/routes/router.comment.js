const commentRouter = require('express').Router();
const {
    verComments: verComments,
    crearComment: crearComment,
    editarComment: editarComment,
    eliminarComment: eliminarComment,
} = require('./../controllers/controller.comment.js');

// Ver comentarios
userRouter.get('/comentarios/:idPosteo', verComments);

// Crear comentario
userRouter.post('/comentarios', crearComment);

// Editar comentario
userRouter.put('/comentarios', editarComment);

// Eliminar comentario
userRouter.delete('/comentarios', eliminarComment);

module.exports = commentRouter;