const formatResponse = (data, message = 'Success', status = 'success') => ({
  status,
  message,
  data,
});

const formatError = (message, status = 'error') => ({
  status,
  message,
});

module.exports = {
  formatResponse,
  formatError,
};
