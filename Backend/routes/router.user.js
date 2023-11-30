const userRouter = require('express').Router();
const {
    verUsuarios: verUsuarios,
    verUsuario: verUsuario,
    crearUsuario: crearUsuario,
    editarUsuario: editarUsuario,
    eliminarUsuario: eliminarUsuario,
} = require('./../controllers/controller.user.js');

// Ver usuarios
userRouter.get('/usuarios', verUsuarios);

// Ver usuario
userRouter.get('/usuario/:id', verUsuario);

// Crear usuario
userRouter.post('/usuario', crearUsuario);

// Editar usuario
userRouter.put('/usuario', editarUsuario);

// Eliminar usuario
userRouter.delete('/usuario', eliminarUsuario);

module.exports = userRouter;