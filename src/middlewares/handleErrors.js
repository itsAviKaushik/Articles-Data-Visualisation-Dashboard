module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internel Server Error";

    if (err.name === "CastError") {
        err.message = "The given Id is Invalid!";
    }

    if (err.name === "ValidationError") {
        err.message = err.message;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}