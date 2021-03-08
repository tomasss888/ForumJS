const { text } = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


const authController = require('../controllers/auth')
const postController = require('../controllers/post')
const topicController = require('../controllers/topic')
const repliesController = require('../controllers/replies');
const APIrepliesController = require('../controllers/APIreplies');
const adminpanel = require('../controllers/admin/adminpanel');
const { render } = require('ejs');

//index
router.get('/',(req,res)=>{
  res.redirect("login")
})

//register
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register', authController.register)
////


//login
router.get('/login',(req,res)=>{
  
  if(!req.cookies.jwt ){
    res.render('login');
  }
  else{
    res.redirect("posts/topics");
  }

    //res.send(req.cookies);  
})

router.post('/login', authController.login)
////

router.get('/logout',(req,res)=>{

  res.cookie('jwt', "", -1);
  res.redirect('/login');
})


router.get('/adminindex',(req,res)=>{
  res.render('adminindex');
})


router.get('/posts/topics', topicController.create_index)

router.post('/posts/topics/make_topic', topicController.post)



router.get('/posts/posts/:id', postController.create_index)

router.post('/posts/posts/make_post', postController.post)




router.get('/posts/replies/:id', repliesController.create_index)

router.post('/posts/replies/comment', repliesController.post)

router.get('/posts/replies/delete/:id', repliesController.delete)

router.post('/posts/replies/update/:id', repliesController.update)



router.get('/api/posts/replies/:id', APIrepliesController.create_index)

router.get('/api/posts/replies/comment/new', APIrepliesController.create_new)








router.get('/admin/adminpanel', adminpanel.get)

router.post('/admin/adminpanel/userRoleChange/:id/:pickedrole', adminpanel.updateRole)



module.exports = router;
