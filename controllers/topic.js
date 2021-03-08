
var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web-server'
});


exports.post =  (req, res) => {

    console.log("yep");

    try{
        const {body,name} = req.body;

        if(!name) {
            return res.status(400).render('login', {
                message: 'Emtpty field'
            })
        }

        //var sql = "INSERT INTO posts (users_id, body, name) values ?";
        //var values = [ "select id from users where id = " + req.cookies.jwt.id, body, name];


        db.query('INSERT INTO topics SET ?', {users_id: req.cookies.jwt.id, body: body, name: name}, (error,results) => {
            if(error){
                console.log(error);
            }
        })

        res.status(200).redirect("/posts/topics");
        

    }
    catch(error){
        console.log(error);
    }


}


exports.create_index =  (req, res) => {

    console.log(req.cookies);

    console.log("Getting post from database...")
    var query = "select * from topics";
    db.query(query,function(err,result){
        if(err)
            throw err;
        else {
                res.render('posts/topics', { posts: result, name: req.cookies.jwt.username , role : req.cookies.jwt.role})
                //res.render('contacts.ejs', { contacts: result });  
        }
    });
    
}
