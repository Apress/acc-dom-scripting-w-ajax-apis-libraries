var ElementReady={
  polled:[], /* store polled elements */
  timer:null, /* store timer */
  timerStarted: false,
  ceasePoll:function()
  {
    clearTimeout(this.timer);
    this.timerStarted = false;
  },
  startPoll:function()
  {
    if(!this.timerStarted) this.timer = ~CCC
setTimeout(function(){ElementReady.check(false)},100);
  },
  check:function(clean)
  {
    for(var i=0;i<this.polled.length;i++)
    {
      if(document.getElementById(this.polled[i]['element']))
      {
        this.polled[i]['callback']();
        this.polled.splice(i--,1);
      }else if(clean){
        this.polled.splice(i--,1);
      }
    }
    if(this.polled.length == 0) this.ceasePoll();
  },
  cleanUp:function()
  {
     this.check(true);
     this.ceasePoll();
  },
  chkDomId:function(elId,callback) {
      var el = document.getElementById(elId);
      if (el)
      {
        callback();
      }else{
        this.polled[this.polled.length] = ~CCC
{'element':elId, 'callback':callback};
        this.startPoll();
      }
  }
};

// elements to check for
ElementReady.chkDomId('message',doStuff);
ElementReady.chkDomId('message2',doStuff2);

window.onload = function() {
  ElementReady.cleanUp();
};
