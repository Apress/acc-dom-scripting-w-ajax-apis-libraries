/*
This example requires the inclusion of PrototypeJS
*/

var FormField = Class.create();
FormField.prototype = {
  initialize: function(id) {
    var el = $(id);
    Event.observe(el,'focus',(function()
    {
       if(this.value == this.defaultValue) this.value = '';
    }).bindAsEventListener(el));

    Event.observe(el,'blur',(function()
    {
       if(this.value == '') this.value = this.defaultValue;
    }).bindAsEventListener(el));
  }
};

new FormField('searchfield');
