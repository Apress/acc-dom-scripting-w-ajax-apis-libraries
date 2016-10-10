function addListener(element, event, listener) {
  if (element.addEventListener){
    element.addEventListener(event, listener, false);
  } else if (element.attachEvent){
    element.attachEvent('on'+event, listener);
  }
}
