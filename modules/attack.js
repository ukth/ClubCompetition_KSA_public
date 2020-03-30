module.exports = function(client,done,a_club,d_club)
{
  console.log(String(a_club)+' attacks '+String(d_club))
  client.query('SELECT deal, status from spec where id=$1;', [a_club], function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
      return console.error('error running query', err);
    }
    var deal=result["rows"][0]["deal"]
    var a_status=result["rows"][0]["status"]
    client.query('SELECT gabba,status from spec where id=$1;', [d_club], function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      console.log('insert query in')
      done(err);

      if(err) {
        return console.error('error running query', err);
      }
      var gabba=result["rows"][0]["gabba"]
      var d_status=result["rows"][0]["status"]
      console.log('deal:'+String(deal))
      console.log('gabba:'+String(gabba))
      if(deal>gabba){
        var damage=deal-gabba
        console.log(d_status)
        if (d_status==3){
          console.log('gongban')
          client.query('INSERT INTO fight(a_club,d_club,damage) values($1,$2,$3);', [d_club,a_club,damage], function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);

            if(err) {
              return console.error('error running query', err);
            }
            return;
          });
          client.query('update spec set status=0 where id=$1;', [d_club], function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            console.log('insert query in')
            done(err);

            if(err) {
              return console.error('error running query', err);
            }
            return;
          });
        }else {
          if (d_status==1){
            console.log('shield')
            damage=0
            client.query('update spec set status=0 where id=$1;', [d_club], function(err, result) {
              //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
              console.log('insert query in')
              done(err);

              if(err) {
                return console.error('error running query', err);
              }
              return;
            });
          }else if (a_status==2){
            damage=deal
            client.query('update spec set status=0 where id=$1;', [a_club], function(err, result) {
              //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
              console.log('insert query in')
              done(err);

              if(err) {
                return console.error('error running query', err);
              }
              return;
            });
            console.log('bangmu')
          }
          client.query('INSERT INTO fight(a_club,d_club,damage) values($1,$2,$3);', [a_club,d_club,damage], function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);

            if(err) {
              return console.error('error running query', err);
            }
            return;
          });
        }
      }
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
