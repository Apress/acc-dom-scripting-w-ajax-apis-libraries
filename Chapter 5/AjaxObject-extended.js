function Ajax()
{
  var transport;
  if(window.XMLHttpRequest) {
    transport = new XMLHttpRequest();
  }else{
    try{ transport = new ActiveXObject("MSXML2.XMLHTTP.6.0");  }catch(e){}
    try{ transport = new ActiveXObject("MSXML2.XMLHTTP");  }catch(e){}
  }
  if(!transport) return;
  this.transport = transport;
}

Ajax.prototype.send = function(url, options)
{
  if(!this.transport) return;
  var transport = this.transport;
  var aborted = false;
  var _options = {
      method:"GET",
      timeout:5,
      onerror:function(){},
      onsuccess:function(){}
      };

  // override options
   for(var key in options)
   {
     _options[key] = options[key];
   }

   function checkForTimeout()
   {
      if(transport.readyState != 4)
      {
        aborted = true;
        transport.abort();
      }
   }
   setTimeout(checkForTimeout, _options.timeout * 1000);

   function onreadystateCallback()
   {
    if(transport.readyState == 4)
    {
      if( !aborted && transport.status >= 200 && transport.status < 300 )
      {
        _options.onsuccess(transport);
      }else{
        _options.onerror(transport);
      }
    }
   }

   transport.open(_options.method, url, true);
   transport.onreadystatechange = onreadystateCallback;
   transport.send('');
}
