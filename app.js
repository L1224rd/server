// ==================== EXTERNAL IMPORTS ==================== //

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const { exec } = require('child_process');

// ==================== INTERNAL IMPORTS ==================== //

// ==================== GLOBAL VARIABLES ==================== //

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // error first callback
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // error first callback
    cb(null, file.originalname);
  }
});

const upload = multer({ storage })

// ==================== MIDDLEWARE ==================== //

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serving static files
app.use('/views', express.static(path.join(__dirname, 'views')));


// ==================== FUNCTIONS ==================== //

// returns the full path of the passed view
const getViewPath = view => path.join(__dirname, `views/${view}/${view}.ejs`);

// ==================== ROUTES ==================== //

// ==================== RENDER VIEWS ==================== //

app.get('/', (req, res) => {
  exec('ls ./uploads', (err, out) => {
    res.render(getViewPath('home'), { files: out.split('\n') });
  });
});

app.post('/upload', upload.single('myfile'), (req, res) => {
  res.redirect('/');
});

app.get('/download/:file', (req, res) => {
  res.sendFile(path.join(__dirname, `uploads/${req.params.file}`));
});

// ==================== START SERVER ==================== //

app.listen(process.env.PORT || 3000, () => {
  console.log('READY');
});

// ====================================================== //
