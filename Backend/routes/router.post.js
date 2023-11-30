const postRouter = require('express').Router();
const {
    verPosts: verPosts,
    verPost: verPost,
    crearPost: crearPost,
    editarPost: editarPost,
    eliminarPost: eliminarPost,
} = require('./../controllers/controller.post.js');

// Ver posts
userRouter.get('/posts', verPosts);

// Ver post
userRouter.get('/post/:id', verPost);

// Crear post
userRouter.post('/post', crearPost);

// Editar post
userRouter.put('/post', editarPost);

// Eliminar post
userRouter.delete('/post', eliminarPost);

module.exports = postRouter;