function errorHandling(err, req, res, next) {
  if (err) {
    let status = err.status || 500;
    res.json({
      status,
      msg: "An error occured",
    });
  }
  next();
}

module.exports = { errorHandling };
