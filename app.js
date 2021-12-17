const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const app = express();


// Handlebars View Engine, we need to register view engine manually
// app.engine('hbs', engine({
//   defaultLayout: 'main-layout',
//   layoutsDir: 'views/layouts/',
//   extname: 'hbs'
// }));
// app.set('view engine', 'hbs');

// Pug View Engine
// app.set('view engine', 'pug');


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', { pageTitle: 'Page Not Found!!' })
});

app.listen(3000);