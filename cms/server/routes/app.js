var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
// the next two lines both seem to work the same.
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
  // res.sendFile(path.join(__dirname, './dist/cms/browser'));
  // res.sendFile(path.join(__dirname, '../../dist/cms/browser/index.html'));
});

// // GET documents page
// router.get('/documents', function(req, res, next) {
//     res.sendFile(path.join(__dirname, 'src/app/documents/documents.component.html'));
//     // req.send("This is hte Documents Page!");
// });

module.exports = router;
