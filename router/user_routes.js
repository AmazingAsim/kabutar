let express  = require('express');
let router = express.Router();

let userController = require('../controller/userController')
let auth = require('../middleware/auth');
let upload = require('../middleware/multer_middleware')
router.get('/',userController.getusers);
router.post('/signup',userController.signUp);
router.post('/login',userController.login);
router.get('/getUserById/:id',auth.checkJwtToken,userController.currentUser)
router.post('/addProfile',upload.single('profileImage'),userController.addProfile);
router.get('/getimage/:profileImage',userController.getImage)
module.exports = router;