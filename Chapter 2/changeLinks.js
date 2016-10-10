function addListener(element, event, listener) {
  if (element.addEventListener){
    element.addEventListener(event, listener, false);
  } else if (element.attachEvent){
    element.attachEvent('on'+event, function(){listener.call(element)});
  }
}

function changeLinksToNewWindow()
{
   // grab the url and match up to the first "/" after the "http://"
   // grab the first (and only) match
   var currentDomain = window.location.href.match(/^http:\/\/[^\/]+/)[0];
   var elements = document.getElementsByTagName('a');
   for(var i=0;i<elements.length;i++)
   {
     // if the currentDomain is in the href, it'll return a value of 0 or more.
     if(elements[i].href.lastIndexOf(currentDomain) >= 0)
     {
        addListener(elements[i], 'click', openWin);
     }
   }
}

function openWin(evt)
{
  evt = evt||window.event;
  window.open(this.href);
  if(evt.preventDefault)
  {
    evt.preventDefault();
  }else{
    evt.returnValue=false;
  }
}

addListener(window, 'load', changeLinksToNewWindow);
