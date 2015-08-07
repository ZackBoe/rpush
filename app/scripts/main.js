/* jshint devel:true */
'use strict';

function addCard(subreddit, tag){
    var card  = '<div class="mdl-card mdl-cell mdl-shadow--2dp mdl-cell--4-col">' +
      '<div class="mdl-card__media mdl-color-text--grey-50">' +
      '<h3><a href="https://reddit.com/r/'+subreddit+'" target="_blank">r/'+subreddit+'</a></h3></div>' +
      '<div class="mdl-card__supporting-text">' +
      '<a class="pushbullet-subscribe-widget" data-channel="'+tag+'" data-widget="button" data-size="small"></a>' +
      '</div></div>';

      document.querySelectorAll('.add-subreddit')[0].insertAdjacentHTML('afterend', card);
}

function error() {
  document.querySelectorAll('.loading-text')[0].innerHTML = 
    'There was an error fetching the channels! Why not&nbsp;<a href="https://github.com/zackboe/rpush/issues">open a ticket?</a>'; 
  document.querySelectorAll('.loading-bar')[0].remove();
}

function getSubs() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://cdn.rawgit.com/ZackBoe/rpush/master/subreddits.json', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      var count = 0;
      for (var i = Object.keys(data).length - 1; i >= 0; i--) {
        console.log(Object.keys(data)[i], data[Object.keys(data)[i]]);
        addCard(Object.keys(data)[i], data[Object.keys(data)[i]]);
        count++;
      }
      
      (function(){var a=document.createElement('script');a.type='text/javascript';a.async=true;a.src='https://widget.pushbullet.com/embed.js';var b=document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a,b);})();
      document.querySelectorAll('.channel-count')[0].innerHTML = count;
      document.querySelectorAll('.loading')[0].remove();

    } else {
      error(this.status);
    }
  };

  request.onerror = function() {
    error();
  };

  request.send();
}

document.addEventListener('DOMContentLoaded', function() {
  getSubs();
});