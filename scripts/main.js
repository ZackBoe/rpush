"use strict";function addCard(e,t){var r='<div class="mdl-card mdl-cell mdl-shadow--2dp mdl-cell--4-col"><div class="mdl-card__media mdl-color-text--grey-50"><h3><a href="https://reddit.com/r/'+e+'" target="_blank">r/'+e+'</a></h3></div><div class="mdl-card__supporting-text"><a class="pushbullet-subscribe-widget" data-channel="'+t+'" data-widget="button" data-size="small"></a></div></div>';document.querySelectorAll(".add-subreddit")[0].insertAdjacentHTML("afterend",r)}function error(){document.querySelectorAll(".loading-text")[0].innerHTML='There was an error fetching the channels! Why not&nbsp;<a href="https://github.com/zackboe/rpush/issues">open a ticket?</a>',document.querySelectorAll(".loading-bar")[0].remove()}function getSubs(){var e=new XMLHttpRequest;e.open("GET","https://cdn.rawgit.com/ZackBoe/rpush/master/subreddits.json",!0),e.onload=function(){if(this.status>=200&&this.status<400){for(var e=JSON.parse(this.response),t=0,r=Object.keys(e).length-1;r>=0;r--)console.log(Object.keys(e)[r],e[Object.keys(e)[r]]),addCard(Object.keys(e)[r],e[Object.keys(e)[r]]),t++;!function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.pushbullet.com/embed.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),document.querySelectorAll(".channel-count")[0].innerHTML=t,document.querySelectorAll(".loading")[0].remove()}else error(this.status)},e.onerror=function(){error()},e.send()}document.addEventListener("DOMContentLoaded",function(){getSubs()});