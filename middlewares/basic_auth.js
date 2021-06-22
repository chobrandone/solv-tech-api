const basic = require('basic-auth');

 function  auth(req, res, next) {
    const user =  basic(req)
    // console.log("this is user name : ", user);
    const username = 'activaShowroomApp2020@2020'
    const password = 'P@ssw0rd2020@showroomApp'
    if(user==undefined){
        res.statusCode = 401
        res.end("Access denied")
    }else{
        if(user.name.toLowerCase() === username.toLowerCase() &&user.pass.toLowerCase() === password.toLowerCase()){
            next();
        }else {
            res.statusCode = 401
            res.end("Access denied")
        }
    }

  
}

module.exports = auth;