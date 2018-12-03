const cassandra = require('cassandra-driver');

const mainFunction = async () => {
  const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'demo'});
  await client.execute('drop table if exists student_course');
  await client.execute('create table student_course(student_rollno int, student_name text, course_name text, primary key(student_rollno))');

  const startTime = Date.now();
  for (let i = 1; i <= 100000000; i++) {
    await client.execute(`insert into student_course(student_rollno,student_name,course_name) values(${i},'Ivan','DBMS')`);
    setTimeout(() => {
      if (i % 1000000 === 0) {
        console.log(`Import ban ghi thu ${i}: `, Date.now() - startTime, ' ms')
      }
    }, 0);
  }
  console.log('Thoi gian thuc hien: ', Date.now() - startTime, ' ms');
}

mainFunction();