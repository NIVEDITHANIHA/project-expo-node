

const appmiddleware = (req, res, next) => {
    console.log("inside the application miidleware");
    next()
}

module.exports = appmiddleware;