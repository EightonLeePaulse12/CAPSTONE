function errorHandling(err, req, res, next) {
  if (err) {
    let status = err.status || 500;
    let msg = err.message || "An error occured"
    const details = err.details || null
    res.status(status).json({
      status,
      msg,
      details
    })
  } else{
    next();
  }
}

module.exports = { errorHandling };
