

var mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web-server'
});

exports.get =  function(req, res) {



    id = req.params.id;

    console.log(req.cookies);

    console.log("Getting post from database...")

    db.query("select * from users", function(err,result){
        if(err)
            throw err;
        else {
            res.render('admin/adminpanel', { userdata: result, name: req.cookies.jwt.username, role: req.cookies.jwt.role })
                
        }
    });


}

exports.updateRole =  function(req, res) {



    var user_id = req.params.id
    var user_role = req.params.pickedrole


    id = req.params.id;

    console.log(req.cookies);

    var query = "UPDATE users SET role = ? WHERE id = ?" ;


    db.query(query,[user_role, user_id] ,function(err,result){
        if(err)
            throw err;
        else {
            res.status(200).redirect("/admin/adminpanel");
        }
    });


}


