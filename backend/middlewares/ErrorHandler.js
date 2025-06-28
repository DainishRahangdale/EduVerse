// Final middleware to handle errors centrally
const errorHandler = (err, req, res, next) => {
  console.error(`[❌ ERROR] ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
