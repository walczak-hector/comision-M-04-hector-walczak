const commentModel = require('./../models/model.comment.js');

const { verificarToken } = require('./../utils/token.js');

const commentController = {}

commentController.verComments = async (req, res) => {
    try {
        const { idPosteo } = req.params;

        const comentariosEncontrados = await commentModel.find({
            post: idPosteo
        }).populate('autor');
        
        return res.json(comentariosEncontrados);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'No pudo obtener los comentarios de la publicación. ' + error,
        });
    }
}

commentController.verComment = async (req, res) => {
    try {
        const { idComentario } = req.params;

        const comentarioEncontrado = await commentModel.findById(idComentario);
        
        return res.json(comentarioEncontrado);
    } catch (error) {
        let mensaje = 'Ocurrió un error interno al intentar obtener el comentario';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el comentario';
        }

        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}

commentController.crearComment = async (req, res) => {
    try {
        const { descripcion, idPosteo } = req.body;
        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'El token no es válido',
            });
        }

        const autor = tokenValido.id;

        const nuevoComentario = new commentModel({
            description: descripcion,
            autor: autor,
            post: idPosteo,
        });

        await nuevoComentario.save();

        return res.json({ mensaje: 'Comentario creado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear el comentario',
            error: error
        });
    }
}

// Editar comment
commentController.editarComment = async (req, res) => {
    try {
        const { id, descripcion } = req.body;
        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'El token no es válido'
            });
        }

        const userId = tokenValido.id;
        const comment = await commentModel.findById(id);

        if (comment.autor.toString() !== userId) {
            return res.status(500).json({
                mensaje: 'El autor no es el mismo'
            });
        }

        await commentModel.findByIdAndUpdate(
            id,
            { description: descripcion }
        );

        return res.json({ mensaje: 'Comentario actualizado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el comentario',
            error: error
        });
    }
}

// Eliminar comentario
commentController.eliminarComment = async (req, res) => {
    try {
        const { id } = req.body;

        await commentModel.findByIdAndDelete(id);

        return res.json({ mensaje: 'Comentario eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el comentario',
            error: error
        });
    }
}

module.exports = commentController;