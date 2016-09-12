module.exports = {
  port: process.env.PORT || 3000,
  db:   'mongodb://localhost/app-authentication',
  secret: process.env.SECRET || 'this information is secret'
};
