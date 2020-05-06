const { check } = require('express-validator');

module.exports = () => [
  check('username', 'Username is required').not().isEmpty(),
  check('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
  check('username', 'Username cannot greater than 150 characters').isLength({ max: 150 }),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be more than 8 characters').isLength({ min: 8 }),
  check('firstName', 'First name cannot greater than 100 characters').isLength({ max: 100 }),
  check('lastName', 'Last name cannot greater than 100 characters').isLength({ max: 100 }),
];
