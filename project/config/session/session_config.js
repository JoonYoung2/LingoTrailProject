const sessionConfig = {
    secret : "암호화 키" ,
    resave : false ,
    saveUninitialized : true ,
    cookie : { maxAge : 24 * 60 * 60000 }  // 1일
}

module.exports = { sessionConfig };