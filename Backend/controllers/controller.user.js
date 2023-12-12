const userModel = require('../models/model.user.js')

const userController = {}

// Ver usuarios
userController.verUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await userModel.find();

        return res.json(listaUsuarios);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

// Ver usuario
userController.verUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioEncontrado = await userModel.findById(id);

        return res.json(usuarioEncontrado);
    } catch (error) {
        let mensaje = 'Ocurrió un error interno al intentar obtener el usuario';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el usuario';
        }

        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}

// Crear usuario
userController.crearUsuario = async (req, res) => {
    try {
        const { username, password, email, avatarURL } = req.body;
        let existUser = await userModel.findOne({ username: username });
        if (!existUser) {
            /*const cryptoPass = require('crypto')
                .createHash('sha256')
                .update(password)
                .digest('hex');*/
            const nuevoUsuario = new userModel({
                username: username,
                password: password,
                email: email,
                avatarURL: avatarURL
            });

            await nuevoUsuario.save();

            return res.json({ mensaje: 'Usuario creado con éxito' });
        } else {
            return res.status(409).send("El usuario ya existe");;
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear el usuario ' + error,
        });
    }
}

// Editar usuario
userController.editarUsuario = async (req, res) => {
    try {
        const { id, username, password, email, avatarURL } = req.body;

        await userModel.findByIdAndUpdate(
            id,
            { username: username, password: password, email: email, avatarURL: avatarURL}
        );

        return res.json({ mensaje: 'Usuario actualizado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el usuario ' + error,
        });
    }
}

// Eliminar usuario
userController.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.body;

        await userModel.findByIdAndDelete(id);

        return res.json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el usuario',
            error: error
        });
    }
}

module.exports = userController;