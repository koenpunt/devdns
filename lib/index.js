var dnsserver = require('dnsserver');

var devdns = function(){
  
};

var NS_T_A = 1
  , NS_T_NS = 2
  , NS_T_CNAME = 5
  , NS_T_SOA = 6
  , NS_C_IN = 1;

devdns.prototype.createServer = function(target, port, address){
  var _this = this;
  this.target = target;
  this.port = port || 8000;
  this.address = address || '127.0.0.1';
  this.server = dnsserver.createServer();
  this.server.bind(this.port, this.address);
  this.server.on('request', function(req, res) {
    _this.handleRequest(req, res);
  });
  this.server.on('error', function(req, res) {
    console.log('error', req, res)
  });
};

devdns.prototype.handleRequest = function(req, res){
  var question = req.question;

  if (question.type == 1 && question['class'] == 1 && /\.dev$/.test(question.name)) {
    // IN A query
    res.addRR(question.name, NS_T_A, NS_C_IN, 600, this.target);
  }

  res.send();
};

module.exports = devdns;
