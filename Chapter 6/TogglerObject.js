function Toggler(element){
  var answer = element.nextSibling;
  if(answer.nodeType !=1) answer = answer.nextSibling;
  var startHeight = answer.offsetHeight;
  var hidden = false;

  function toggle()
  {
    var start, stop;
    if(hidden)
    {
      start = 0;
      stop = startHeight;
    }else{
      start = startHeight;
      stop = 0;
    }

    var options = {
      element: answer,
      from:start,
      to:stop,
      duration:250,
      property:'height'
    };
    // instantiate and start the animation
    (new Animation(options)).start()
    // toggle the hidden property
    hidden = hidden ? false : true;
  }

  element.onclick = toggle;
  toggle();
}
