class DatabaseConnection {
  constructor() {
    const mysql = require('mysql');
    this.con = mysql.createConnection({
      host: "159.65.115.221",
      port: "3306",
      user: "root",
      password: "teamcodex",
      database: "lunch_planner",
    });
  }



  injectStatement(SQLString) {
    let tempcon = this.con;
    this.con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      const sql = SQLString;
      tempcon.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      tempcon.end();
    });

  }
}
module.exports = DatabaseConnection;