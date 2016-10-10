var ElementReady= new function(){
  var polled = []; /* store polled elements */
  var timer = null; /* store timer */
  var timerStarted = false;

  var ceasePoll = function()
  {
    clearTimeout(timer);
    timerStarted = false;
  };
  var startPoll = function()
  {
    if(!timerStarted) {
      timer = setTimeout( function(){ElementReady.check(false)}, 100);
    }
  };

  return {
      check:function(clean)
      {
        for(var i=0;i<polled.length;i++)
        {
          if(document.getElementById(polled[i]['element']))
          {
            polled[i]['callback']();
            polled.splice(i--,1);
          }else if(clean){
            polled.splice(i--,1);
          }
        }
        if(polled.length == 0) ceasePoll();
      },
      cleanUp:function()
      {
         check(true);
         ceasePoll();
      },
      chkDomId:function(elId,callback) {
          var el = document.getElementById(elId);
          if (el)
          {
            callback();
          }else{
            polled[polled.length] = {'element':elId, 'callback':callback};
            startPoll();
          }
      }
  }
};
