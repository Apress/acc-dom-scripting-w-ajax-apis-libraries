function Animation(options)
{
  var el = options.element;
  if(typeof el == 'string') el = document.getElementById(options.element);
  if(!el) return false;
  var fps = 30;
  // stores which step we're on
  var step = 0;
  // determines the total number of steps
  var numsteps = options.duration / 1000 * fps;
  // determines the interval between each step
  var interval = (options.from - options.to) / numsteps;
  var intervalID;

  function animate()
  {
     // what the new position will be
     var newval = options.from - (step * interval);
     // the step increments AFTER the comparison
     if(step++ < numsteps) {
       // use Math.ceil to round to an integer and style
       el.style[options.property] =  Math.ceil(newval) + 'px';
     }else{
       el.style[options.property] =  options.to + 'px';
       publicMethods.stop();
     }
  }

  var publicMethods = {
    start:function(){
      intervalID = setInterval(animate, 1000 / fps);
    },
    stop:function(){
      clearInterval(intervalID);
    },
    gotoStart:function(){
      step = 0;
      el.style[options.property] = options.from + 'px';
    },
    gotoEnd:function(){
      step = numsteps;
      el.style[options.property] = options.to + 'px';
    }
  }
  return publicMethods;
}

// setting up the options
var options = {
      element:document.getElementById('elementID'),
      property: 'left',
      from: 0,
      to: 200,
      duration: 1000
    };

// creating the new object
new Animation(options);
