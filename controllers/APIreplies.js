
let express = require('express');
let app = express();

var mysql = require('mysql');

let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web-server'
});

var id;

exports.create_new =  function(req, res) {


    try{

        const {body, user_id, post_id} = req.body;

        
        var res
        db.query('INSERT INTO replies SET ?', {body: body, user_id: user_id, post_id: post_id}, (error,results) => {
            if(error){
                res.status(400).send([error])
            }
        })


        res.status(200).send([req.body])
        

    }
    catch(error){
        console.log(error);
    }


}


exports.create_index =  (req, res) => {

    id = req.params.id;

    console.log(req.cookies);

    console.log("Getting post from database...")

    db.query("select * from replies where post_id = ?", [id] ,function(err,result){
        if(err)
            throw err;
        else {

                res.send([result])
                //res.render('posts/replies', { posts: result, name: req.cookies.jwt.username })
                //res.render('contacts.ejs', { contacts: result });  
        }
    });
    
}





exports.delete =  (req, res) => {

    id_delete = req.params.id;
    

    console.log("Deleting post from database...")
    var query = "DELETE FROM replies WHERE id = ?";


    db.query(query,[id_delete] ,function(err,result){
        if(err)
            throw err;
        else {
            res.status(200).redirect("/posts/replies/"+id);
        }
    });
    
}

exports.update =  (req, res) => {

    ip_update = req.params.id;

    const {body} = req.body;

    console.log("Deleting post from database...")
    var query = "UPDATE replies SET body = ? WHERE id = ?" ;


    db.query(query,[body, ip_update] ,function(err,result){
        if(err)
            throw err;
        else {
            res.status(200).redirect("/posts/replies/"+id);
        }
    });
    
}
