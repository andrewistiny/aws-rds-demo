'use strict';
const Pool = require('pg-pool');
const config = require("../config.json");
const {table,host,database,user,password,port} = config;
const pool =  new  Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis: 1000
});

module.exports.UpdateStudent = (event, context, callback) => {
console.log('event', event);
const student_id = event.body.student_id;
const student_name = event.body.student_name;
const grade_level = event.body.grade_level;
  const UpadateStudentInfo = `UPDATE ${table} SET  student_name = $1, grade_level = $2 WHERE id = $3;`;
  
  pool.connect()
  .then(client => {
    client.release()
    return client.query(UpadateStudentInfo, [student_name, grade_level, student_id]);
  })
  .then(res => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: res,
    }),
  };

    callback(null, response);
  })
  .catch(err => {
    console.log('err', err);
  })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
