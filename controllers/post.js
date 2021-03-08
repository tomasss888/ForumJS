
var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web-server'
});

var id;

exports.post =  (req, res) => {

    

    console.log("works");

    try{

        const {body, subject} = req.body;

        if(!body) {
            return res.status(400).render('login', {
                message: 'Emtpty field'
            })
        }

        db.query('INSERT INTO posts SET ?', {body: body, user_id: req.cookies.jwt.id, topic_id: id}, (error,results) => {
            if(error){
                console.log(error);
            }

           
        })
        db.query('SELECT MAX(id) as id FROM posts', (error,results, fields) => {
            if(error){
                console.log(error);
            }

            db.query('INSERT INTO replies SET ?', {body: subject, user_id: req.cookies.jwt.id, post_id: results[0].id}, (error,results) => {
                if(error){
                    console.log(error);
                }
    
               
            })
           
        })




        

        console.log(id);

        res.status(200).redirect("/posts/posts/"+id);
        

    }
    catch(error){
        console.log(error);
    }


}


exports.create_index =  (req, res) => {

    id = req.params.id;

    console.log("Getting post from database...")

    db.query("select * from posts where `topic_id` = ?", [id] ,function(err,result){
        if(err)
            throw err;
        else {
                res.render('posts/posts', { posts: result, name: req.cookies.jwt.username, role : req.cookies.jwt.role })
                //res.render('contacts.ejs', { contacts: result });  
        }
    });
    
}

exports.createAdmin_index =  (req, res) => {

    console.log("Getting post from database...")
    var query = "select * from posts";
    db.query(query,function(err,result){
        if(err)
            throw err;
        else {
            res.render('adminindex', { posts: result })  //res.render('contacts.ejs', { contacts: result });  
        }
    });
    
}




exports.delete =  (req, res) => {

    console.log(req.body);

    

    console.log("plzzzzzzz" + idd);
    

    console.log("Deleting post from database...")
    var query = "DELETE FROM replies WHERE id = ?";


    console.log("hmmmmmm: " + query);


    db.query(query,[id] ,function(err,result){
        if(err)
            throw err;
        else {
            res.status(200).redirect("/adminindex");
        }
    });
    
}
