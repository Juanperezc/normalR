var express = require('express');
var router = express.Router();
var R = require("r-script");
var path = require('path');
const ps = require('python-shell');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/normal/simpsonpy', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var a = req.query.a;
  var b = req.query.b;
  var n = req.query.n;  
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], 
    scriptPath: 'pyscript/lib',
    args: [a, b ,n]
  };
   
  ps.PythonShell.run('normals.py', options, function (err, results) {
    if (err) throw err;
  
    res.send(JSON.stringify({ response: results[0], error: null}));
   
  });
});

router.get('/api/normal/simpson', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var a = req.query.a;
  var b = req.query.b;
  var n = req.query.n;
 console.log(a);
 console.log(b);
 console.log(n);
try {
  var here = 'rscript/normalSimpsom.R';
  var d = R(here)
  .data(a,b,n)
  .callSync();
  console.log(d);
  res.send(JSON.stringify({ response: d, error: null}));
} catch (err) {
  res.send(JSON.stringify({ error: err }));
  console.log(err)
}

});
router.get('/api/normal/trapecio', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
   res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var a = req.query.a;
  var b = req.query.b;
  var n = req.query.n;  //true
 console.log(a);
 console.log(b);
 console.log(n);
try {
  var here = 'rscript/normalTrapecio.R';
  var d = R(here)
  .data(a,b,n)
  .callSync();
  console.log(d);
  res.send(JSON.stringify({ response: d, error: null}));
} catch (err) {
  res.send(JSON.stringify({ error: err }));
  console.log(err)
}

});
router.get('/api/normal/table', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
try {
  var here = 'rscript/normalTable.R';
  var d = R(here)
  .data()
  .callSync();
  console.log(d);
  res.send(JSON.stringify({ response: d, error: null}));
} catch (err) {
  res.send(JSON.stringify({ error: err }));
  console.log(err)
}
});

router.get('/api/normal/tablen', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
try {
  var here = 'rscript/normalTablenegative.R';
  var d = R(here)
  .data()
  .callSync();
  console.log(d);
  res.send(JSON.stringify({ response: d, error: null}));
} catch (err) {
  res.send(JSON.stringify({ error: err }));
  console.log(err)
}
});
module.exports = router;
