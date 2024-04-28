
const express = require('express');
const router = express.Router();
const path = require('path');
const { authLogin, restringed, changepass, changemail, logout} = require('./controllers');
const { log } = require('console');



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/index.html'));

})
router.post('/login', authLogin);
router.get('/dashboard',restringed)
router.post('/changemail', changemail);
router.post('/changepass', changepass);
router.get('/logout', logout);








module.exports = router;

