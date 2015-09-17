var chalk = require('chalk');
var pushbullet = require('pushbullet');
var rockets = require('rockets');
var secrets = require('./secrets.json');
var subs = require('./subreddits.json');

var error = chalk.bold.red;
var info = chalk.dim.blue;

var pusher = new pushbullet(secrets.pushbulletAPI);
var client = new rockets();

// Register events on the client.
client.on('connect', function() {
  // Subscribe to posts on our configured subreddits
  client.subscribe('posts', {
    subreddit: Object.keys(subs)
  });
  console.log(info('['+new Date(Date.now()).toTimeString().split(' ')[0]+'] ')+chalk.bgGreen.black(' Connected ')); 
});

// There's a new post on a subscribed subreddit
client.on('post', function(post) {
  var data = post.data;
  var time = new Date(data.created_utc * 1000).toTimeString().split(' ')[0];

  // Grab the pushbullet channel tag for this subreddit
  pushParams = {'channel_tag': subs[data.subreddit]};

  // Push the link!
  pusher.link(pushParams, data.title, data.url, function(err, response){
    if(err) {
      console.log(info('['+time+']')+error(' Failed to push ')+chalk.yellow(data.id)+' from ' +chalk.yellow('r/'+data.subreddit)+' to '+chalk.green(subs[data.subreddit]));
      console.log(err);
    }
    else console.log(info('['+time+']')+' Pushed '+chalk.yellow(data.id)+' from ' +chalk.yellow('r/'+data.subreddit)+' to '+chalk.green(subs[data.subreddit]));
  });
});

client.on('disconnect', function(){ 
  console.log(info('['+new Date(Date.now()).toTimeString().split(' ')[0]+'] ')+chalk.bgRed.black(' Disconnected ')); 
  process.exit(1);
});

client.connect();