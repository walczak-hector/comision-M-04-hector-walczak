const commentRouter = require('express').Router();
const {
    verComments: verComments,
    crearComment: crearComment,
    editarComment: editarComment,
    eliminarComment: eliminarComment,
} = require('./../controllers/controller.comment.js');

// Ver comentarios
commentRouter.get('/comentarios/:idPosteo', verComments);

// Crear comentario
commentRouter.post('/comentarios', crearComment);

// Editar comentario
commentRouter.put('/comentarios', editarComment);

// Eliminar comentario
commentRouter.delete('/comentarios', eliminarComment);

module.exports = commentRouter;