const router = require("express").Router();

router.use(require('../controllers/auth/index.js'));
router.use(require('../controllers/users/index.js'));
router.use(require('../controllers/chat/index.js'));
router.use(require('../controllers/post/index.js'));


module.exports = router;
