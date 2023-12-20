const commentRouter = require('express').Router();
const {
    verComments: verComments,
    verComment: verComment,
    crearComment: crearComment,
    editarComment: editarComment,
    eliminarComment: eliminarComment,
} = require('./../controllers/controller.comment.js');

// Ver comentarios
commentRouter.get('/comentarios/:idPosteo', verComments);

// Ver comentario
commentRouter.get('/comentario/:idComentario', verComment);

// Crear comentario
commentRouter.post('/comentario', crearComment);

// Editar comentario
commentRouter.put('/comentario', editarComment);

// Eliminar comentario
commentRouter.delete('/comentario', eliminarComment);

module.exports = commentRouter;