const commentModel = require('./../models/model.comment.js');

const { verificarToken } = require('./../utils/token.js');

const commentController = {}

commentController.verComments = async (req, res) => {
    try {
        const { idPosteo } = req.params;

        const comentariosEncontrados = await commentModel.find({
            posteo: idPosteo
        }).populate('autor');
        
        return res.json(comentariosEncontrados);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'No pudo obtener los comentarios de la publicación. ' + error,
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

module.exports = commentController;