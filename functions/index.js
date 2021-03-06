const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

// #region Firebase 초기화
var serviceAccount = require('./key/pk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://irk-opr-helper.firebaseio.com',
});
// #endregion

// #region 라우터 Import
var apiDicRouter = require('./controllers/api/dic');
var apiItsmeRouter = require('./controllers/api/itsme');
// #endregion

// #region Express 초기화
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// #endregion

// #region router 정의
app.use('/api', apiDicRouter);
app.use('/api', apiItsmeRouter);
// #endregion

// Firebase Hoasting 에서 Request 를 받게 하기 위함
exports.app = functions.https.onRequest(app);
