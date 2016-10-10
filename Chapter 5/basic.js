// Use the native version for everybody but IE6<
if(window.XMLHttpRequest) {
    transport = new XMLHttpRequest();
}else{
    try{ transport = new ActiveXObject("MSXML2.XMLHTTP.6.0");  }catch(e){}
    try{ transport = new ActiveXObject("MSXML2.XMLHTTP");  }catch(e){}
}

if(transport)
{
   transport.open("GET", "http://example.com/test/", true);
   transport.onreadystatechange = function(){ alert('I am back!'); };
   transport.send();
}
