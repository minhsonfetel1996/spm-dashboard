const defaultRequiredDate = (required) => ({
  type: Date,
  default: Date.now(),
  require: required,
});

module.exports = {
  createdTs: defaultRequiredDate(false),
  updatedTs: defaultRequiredDate(true),
};
