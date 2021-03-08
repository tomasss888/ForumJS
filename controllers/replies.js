
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

        const {body} = req.body;

        if(!body) {
            return res.status(400).render('login', {
                message: 'Emtpty field'
            })
        }

        db.query('INSERT INTO replies SET ?', {body: body, user_id: req.cookies.jwt.id, post_id: id}, (error,results) => {
            if(error){
                console.log(error);
            }
        })

        console.log(id);

        res.status(200).redirect("/posts/replies/"+id);
        

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
                res.render('posts/replies', { posts: result, name: req.cookies.jwt.username, id: req.cookies.jwt.id, role : req.cookies.jwt.role })
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
