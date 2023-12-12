const postRouter = require('express').Router();
const {
    verPosts: verPosts,
    verPost: verPost,
    crearPost: crearPost,
    editarPost: editarPost,
    eliminarPost: eliminarPost,
} = require('./../controllers/controller.post.js');

// Ver posts
postRouter.get('/posts', verPosts);

// Ver post
postRouter.get('/post/:id', verPost);

// Crear post
postRouter.post('/post', crearPost);

// Editar post
postRouter.put('/post', editarPost);

// Eliminar post
postRouter.delete('/post', eliminarPost);

module.exports = postRouter;