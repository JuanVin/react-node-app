exports.allAccess = (req, res) => {
    res.status(200).send({message: "Contenido público."});
};

exports.userBoard = (req, res) => {
    console.log("asdadsasd")
    res.status(200).send({message: "Contenido de usuario."});
};

exports.adminBoard = (req, res) => {
    res.status(200).send({message: "Contenido de administrador."});
};

