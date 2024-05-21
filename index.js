require('dotenv').config();
const express = require('express');
const session = require('express-session');
const router = require('./routes/router.js');
const userRouter = require('./routes/user/user.js');
const authRouter = require('./routes/auth.js')
const sequelize = require('./models/sequelize.js');
const app = express();
const port = process.env.PORT || 3000;

sequelize.sync({ alter: true });

app.use(session({
  secret: process.env.SECRET_KEY, // A string used to sign the session ID cookie (change this to a secure random string)
  resave: false, // Whether to save the session back to the session store if the session was never modified during the request
  saveUninitialized: true, // Whether to save newly created but not modified sessions
  cookie: {
    secure: false, // Ensures cookies are only sent over HTTPS (set to true in production)
    httpOnly: true, // Ensures cookies are only accessed by the server and not the client-side JavaScript
    maxAge: null // Session duration in milliseconds (e.g., 1 day (24 * 60 * 60 * 1000), null = unlimited)
  },
  // Optional: Configure session store (e.g., using MongoDB or Redis)
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // store: new RedisStore({ client: redisClient }),
}));

// Add middleware to parse JSON bodies
app.use(express.json());

// Mount the route handlers
app.use('/', router);
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
