const userResolver = require('./user');
const matchResolver = require('./match');
const authResolver = require('./auth');

const rootResolver = {
  ...userResolver,
  ...matchResolver,
  ...authResolver
}

module.exports = rootResolver;
