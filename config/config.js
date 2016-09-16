module.exports = {
  port:   process.env.PORT || 3000,
  db:     process.env.MONGOLAB_URI || 'mongodb://localhost/glutenfree',
  secret: process.env.SECRET || 'this information is secret'
};
