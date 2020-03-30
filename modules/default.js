module.exports = function(client,done,id)
{
  client.query('delete from fight where d_club=$1;', [id], function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
      return console.error('error running query', err);
    }
    client.query('INSERT INTO fight(a_club,d_club,damage) VALUES($1,$2,$3);', [id,id,2000], function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)

      done(err);

      if(err) {
        return console.error('error running query', err);
      }
      return;
    });
  });
}
// client.query('INSERT INTO fight(a_club,d_club,damage) values($1,$2,$3);', [a_club,d_club,damage], function(err, result) {
//   //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
//   console.log(`attack function activate ${a_club}, ${d_club}, ${damage}`)
//   done(err);
//
//   if(err) {
//     return console.error('error running query', err);
//   }
//   return;
// });
