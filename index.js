const express = require('express')


const app = express()


//-- Middleware setup
app.use(require('./middlewares/logMiddleware'));
// app.use(require('./middlewares/isAuthenticated'));


//-- Routes setup
// app.use('/auth', require('./routes/authRoutes'));
// app.use('/user', require('./routes/userRoutes'));
// app.use('/crypto', require('./routes/cryptoRoutes'));
// app.use('/news', require('./routes/newsRoutes'));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})