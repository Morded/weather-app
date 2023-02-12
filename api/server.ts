import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fs from 'fs';
import cors from 'cors';
import { weatherRouter } from './routes/weather';

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: "http://localhost:5173" }));

// app.use('/weather', weatherRouter);

app.use(
  "/trpc",
  createExpressMiddleware({
    router: weatherRouter,
    createContext: () => {
      return {}
    },
  })
)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = '5000';
}

app.listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`);
});

export default app;
