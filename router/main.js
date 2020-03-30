/**
* Created by UKth, 16-047 on 2017-04-23.
*/
module.exports = function(app)
{

  // 키보드
  var config = { // Didn't split config file, so I made copy for github
    user: '#', //env var: PGUSER
    database: '#', //env var: PGDATABASE
    password: '#', //env var: PGPASSWORD
    host: 'ec-#.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };

  var pg = require('pg');

  //this initializes a connection pool
  //it will keep idle connections open for a 30 seconds
  //and set a limit of maximum 10 idle clients
  var pool = new pg.Pool(config);

  // to run a query we can acquire a client from the pool,
  // run a query on the client, and then return the client to the pool
  var clublist=["groove","nolsori","nuribit","delight","loony","rubicon","starstorm","binari","서향","sturgeon","ssol","eurz","esra","mcfilm","EOS","chemifile","pure"]

  app.post('/horse_racing_bet',function(req,res){
    console.log('ACCESSED by /horse_racing_bet')
    var club = Number(req.body["club_id"])
    var horse = Number(req.body["horse"])
    var garnet = Number(req.body["garnet"])

    if (club < 0 || club > 16 || horse < 0 || horse>9){
      res.end('incorrect inputs!! retry');
      return;
    }
    console.log(req.body)
    console.log('club:' + club)
    console.log('garnet:' + garnet)
    console.log('horse:'+ horse)


    // db접속
    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      //'SELECT id, active FROM userkeys WHERE userkey = $1'
      client.query('INSERT INTO bet(horse,club,bet) VALUES($1,$2,$3);', [horse,club,garnet],function(err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);

        if(err) {
          return console.error('error running query', err);
        }
        //var clublist=["groove","nolsori","nuribit","delight","loony","rubicon","starstorm","binari","서향","sturgeon","ssol","eurz","esra","mcfilm","EOS","chemifile","pure"]

        res.end(`success to upload at ${horse} horse,${garnet} garnet, ${clublist[club]} club`);
        return;
      });
    });

    pool.on('error', function (err, client) {
      // if an error is encountered by a client while it sits idle in the pool
      // the pool itself will emit an error event with both the error and
      // the client which emitted the original error
      // this is a rare occurrence but can happen if there is a network partition
      // between your application and the database, the database restarts, etc.
      // and so you might want to handle it and at least log it out
      console.error('idle client error', err.message, err.stack)
    });
  });

  app.get('/horse_racing_bettingtable',function(req,res){
    console.log('ACCESSED by /horse_racing_bettingtable')
    var bettingtable=[
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]]
      // db접속
      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }
        //'SELECT id, active FROM userkeys WHERE userkey = $1'

        client.query('SELECT horse,club,bet FROM bet', [], function(err, result) {
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);
          console.log(result["rows"])
          if(err) {
            return console.error('error running query', err);
          }
          for(var i=0; i<result["rows"].length;i++){
            var horse = result["rows"][i]["horse"]
            var bet = result["rows"][i]["bet"]
            var club = result["rows"][i]["club"]
            bettingtable[club][horse]+=bet
          }
          console.log(bettingtable)
          console.log(bettingtable)
          res.end(String(bettingtable));
          return;
        });
      });

      pool.on('error', function (err, client) {
        // if an error is encountered by a client while it sits idle in the pool
        // the pool itself will emit an error event with both the error and
        // the client which emitted the original error
        // this is a rare occurrence but can happen if there is a network partition
        // between your application and the database, the database restarts, etc.
        // and so you might want to handle it and at least log it out
        console.error('idle client error', err.message, err.stack)
      });
    });

    app.get('/attack_defense_score',function(req,res){
      console.log('ACCESSED by /attack_defense_score')

      //db접속
      var spec=[[2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }
        //'SELECT id, active FROM userkeys WHERE userkey = $1'

        client.query('SELECT id,gabba,deal FROM spec', [], function(err, result) {
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);

          if(err) {
            return console.error('error running query', err);
          }
          for(var i=0;i<17;i++){
            console.log(result["rows"][i])
            id=Number(result["rows"][i]["id"])
            spec[1][id]=result["rows"][i]["deal"]
            spec[2][id]=result["rows"][i]["gabba"]
          }
          client.query('SELECT a_club,d_club,damage FROM fight', [], function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            done(err);
            console.log(result["rows"])
            if(err) {
              return console.error('error running query', err);
            }
            for(var i=0; i<result["rows"].length;i++){
              var a_club = result["rows"][i]["a_club"]
              var d_club = result["rows"][i]["d_club"]
              var damage = result["rows"][i]["damage"]
              spec[0][d_club]-=damage
            }
            for(var i=0;i<17;i++){
              if(spec[0][i]<0){
                require(__dirname +"/../modules/" + "default")(client,done,i);
              }
            }
            console.log(spec)
            res.end(String(spec));
            return;
          });
        });
      });

      pool.on('error', function (err, client) {
        // if an error is encountered by a client while it sits idle in the pool
        // the pool itself will emit an error event with both the error and
        // the client which emitted the original error
        // this is a rare occurrence but can happen if there is a network partition
        // between your application and the database, the database restarts, etc.
        // and so you might want to handle it and at least log it out
        console.error('idle client error', err.message, err.stack)
      });
    });

    app.post('/attack_defense_item',function(req,res){
      console.log('ACCESSED by /attack_defense_item')
      console.log(req.body)
      var a_club = req.body["a_club"]
      var d_club = req.body["d_club"]
      var item = req.body["item"]//0:공격 1:hp포션 2:공격업 3:방어업 4:랜덤포션 5:전체공격////6:쉴드 7:방어무시 8:반사
      if (item<0 || item>8){
        res.end('incorrect inputs!! retry')
        return
      }
      if (a_club<0 || a_club>16){
        res.end('incorrect inputs!! retry')
        return
      }
      if (d_club<0 || d_club>16){
        res.end('incorrect inputs!! retry')
        return
      }
      if (d_club==''){
        res.end('incorrect inputs!! retry')
        return
      }
      if (a_club==''){
        res.end('incorrect inputs!! retry')
        return
      }
      if (item==''){
        res.end('incorrect inputs!! retry')
        return
      }
      else{
        //db접속
        pool.connect(function(err, client, done) {
          if(err) {
            return console.error('error fetching client from pool', err);
          }
          //'SELECT id, active FROM userkeys WHERE userkey = $1'
          console.log('item:'+String(item));
          client.query('SELECT status from spec where id=$1;', [a_club], function(err, result) {
            //status: 0정상 1쉴드 2방어무시 3반사
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            console.log('insert query in')
            done(err);

            if(err) {
              return console.error('error running query', err);
            }
            var a_status=result["rows"][0]["status"]
            client.query('SELECT status from spec where id=$1;', [d_club], function(err, result) {
              //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
              console.log('insert query in')
              done(err);

              if(err) {
                return console.error('error running query', err);
              }
              var d_status=result["rows"][0]["status"]
              if(item==0){//공격
                require(__dirname +"/../modules/" + "attack")(client,done,a_club,d_club);
                res.end('attack')
              }
              else if(item==1){//전체공격

                for(var i=0;i<17;i++){
                  console.log(i)
                  if(i!=a_club){
                    require(__dirname +"/../modules/" + "attack")(client,done,a_club,i);
                  }
                }
                res.end('attack')
              }
              else if(item==2){
                client.query('INSERT INTO fight(a_club,d_club,damage) VALUES($1,$2,$3);', [a_club,a_club,-200], function(err, result) {
                  //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                  console.log('insert query in')
                  done(err);

                  if(err) {
                    return console.error('error running query', err);
                  }
                  res.end('success with potion'+' club '+clublist[a_club]);
                  return;
                });
              }
              else if(item==3){
                client.query('SELECT deal from spec where id=$1;', [a_club], function(err, result) {
                  //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                  console.log('insert query in')
                  done(err);

                  if(err) {
                    return console.error('error running query', err);
                  }
                  var deal=result["rows"][0]["deal"]
                  if (deal==600){
                    res.end('max deal!');
                    return;
                  }

                  var deallist=[100,200,350,600,1000]
                  var index=deallist.indexOf(deal)
                  var buildup=false
                  var rand=Math.floor(Math.random()*99 + 0);
                  console.log(rand)
                  console.log(index)
                  if (index==0){
                    if (rand<70){buildup=true}
                  }else if(index==1){
                    if (rand<50){buildup=true}
                  }else if(index==2){
                    if (rand<30){buildup=true}
                  }else if(index==3){
                    if (rand<15){buildup=true}
                  }
                  if (buildup){
                    deal=deallist[index+1]
                    var ans='shining light makes you stronger'
                  }else{
                    deal=100
                    var ans='pung!!!!'
                  }
                  console.log(a_club)
                  client.query('update spec set deal=$1 where id=$2;', [deal,a_club], function(err, result) {
                    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                    console.log('insert query in')
                    done(err);

                    if(err) {
                      return console.error('error running query', err);
                    }
                    res.end('success with item'+String(item)+' club '+clublist[a_club]+'\n'+ans);
                    return;
                  });
                });
              }
              else if(item==4){
                client.query('SELECT gabba from spec where id=$1;', [a_club], function(err, result) {
                  //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                  console.log('insert query in')
                  done(err);

                  if(err) {
                    return console.error('error running query', err);
                  }
                  var gabba=result["rows"][0]["gabba"]
                  if (gabba==300){
                    res.end('max gabba!');
                    return;
                  }

                  var gabbalist=[0,40,100,200,500]
                  var index=gabbalist.indexOf(gabba)
                  var buildup=false
                  var rand=Math.floor(Math.random()*99 + 0);
                  console.log(rand)
                  console.log(index)
                  if (index==0){
                    if (rand<70){buildup=true}
                  }else if(index==1){
                    if (rand<50){buildup=true}
                  }else if(index==2){
                    if (rand<30){buildup=true}
                  }else if(index==3){
                    if (rand<15){buildup=true}
                  }
                  if (buildup){
                    gabba=gabbalist[index+1]
                    var ans='shining light makes you stronger'
                  }else{
                    gabba=0
                    var ans='pung!!!!'
                  }
                  console.log(a_club)
                  console.log('aaaaaa')
                  client.query('update spec set gabba=$1 where id=$2;', [gabba,a_club], function(err, result) {
                    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                    console.log('insert query in')
                    done(err);

                    if(err) {
                      return console.error('error running query', err);
                    }
                    res.end('success with item'+String(item)+' club '+clublist[a_club]+'\n'+ans);
                    return;
                  });
                });
              }
              else if(item==5){
                var randpotion=[300,-100,-200,-300,-400]
                var damage=randpotion[Math.floor(Math.random()*3 + 0)]
                console.log(damage);
                client.query('INSERT INTO fight(a_club,d_club,damage) VALUES($1,$2,$3);', [a_club,a_club,damage], function(err, result) {
                  //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                  console.log('insert query in')
                  done(err);

                  if(err) {
                    return console.error('error running query', err);
                  }
                  res.end('success with item'+String(item)+' club '+clublist[a_club]+'\n'+'effect:'+String(damage));
                  return;
                });
              }
              else if(item>=6){
                var status=item-5
                console.log(status)
                console.log(a_club)
                client.query('update spec set status=$1 where id=$2;', [status,a_club], function(err, result) {
                  //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                  console.log('insert query in')
                  done(err);

                  if(err) {
                    return console.error('error running query', err);
                  }
                  res.end('success with item'+String(item)+' club '+clublist[a_club]+'\n'+'effect:'+String(damage));
                  return;
                });
              }
            });
          });
        });

        pool.on('error', function (err, client) {
          // if an error is encountered by a client while it sits idle in the pool
          // the pool itself will emit an error event with both the error and
          // the client which emitted the original error
          // this is a rare occurrence but can happen if there is a network partition
          // between your application and the database, the database restarts, etc.
          // and so you might want to handle it and at least log it out
          console.error('idle client error', err.message, err.stack)
        })
      }
    });
  }

  console.log('main function is working')
