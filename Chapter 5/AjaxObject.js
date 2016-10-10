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
  var _options = {
      method:"GET",
      callback:function(){}
      };

  // override options
   for(var key in options)
   {
     _options[key] = options[key];
   }

   transport.open(_options.method, url, true);
   transport.onreadystatechange = function(){ _options.callback(transport) };
   transport.send();
}

// how to use the object
var ajax = new Ajax();
ajax.send('/path/to/script', {callback:processRequest});

