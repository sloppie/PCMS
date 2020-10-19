const mysql = require('mysql');
class Database {
   connect() {
       var con = mysql.createConnection({
           host: "localhost",
           user: "root",
           password: "",
           database: "pcms"
       });
       return con;
   }
   execute(sql, callback) {
       var con = this.connect();
       var $result;
       con.connect(function(err) {
           if (err){
               throw  err;
           }else{
               con.query(sql, function (err, result) {
                   if (err){
                       throw  err;
                   }else{
                       con.end();
                       return callback(result);
                   }
               });
           }
       });
   }


   recordExists(table, column, record, callback) {
       var sql = `
        SELECT * FROM ${table} WHERE ${column} = '${record}'
       `;
       const  result = this.execute(sql, function(result){
          return result.length == 0 ? callback(false) : callback(true);
       });


   }
}

module.exports = Database;