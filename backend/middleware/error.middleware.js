const error = (error, req, res) => {
  const message = error.message || "Something went wrong";
  const status = error.status || 500;
  return res.status(status).json({ message: "message", success: false });
};

module.exports = error;
