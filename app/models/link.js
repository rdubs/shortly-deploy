var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

//SCHEMA
urlsSchema = mongoose.Schema({
  index: Number,
  //index: { unique: true },
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}
  //timestamps??
});

urlsSchema.pre('save', function(next) { //pre save same as on create??
  var link = this;
  var shasum = crypto.createHash('sha1');
  shasum.update(link.url);
  link.code = shasum.digest('hex').slice(0, 5);
  next();
});

//MODEL
var Link = mongoose.model('Link', urlsSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
