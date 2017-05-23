const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function lookUp(name, callback) {
  console.log("Searching ...", name);
  client.query(
    `select *
     from famous_people
     where first_name = $1::text
     or last_name = $2::text`, [name, name], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.rows);
  });
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  let name = process.argv[2];

  lookUp(name, (err, result) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Found ${result.length} person(s) by name '${name}':`);
    if (result) {
      result.forEach((row) => {
        console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().slice(0, 10)}'`);
      });
    }
  });
});