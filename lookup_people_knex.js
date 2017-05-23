const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

function loopUp(name){
  console.log("Searching ...");
  knex.select()
  .from('famous_people')
  .where('first_name', name)
  .orWhere('last_name', name)
  .then(function(rows) {
    console.log(`Found ${rows.length} person(s) by name '${name}':`);
    rows.forEach((row) => {
        console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().slice(0, 10)}'`);
    });
  });
}

loopUp(process.argv[2]);