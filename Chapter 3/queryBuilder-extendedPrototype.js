Object.prototype.extend = function(obj) {
  for (var property in obj) {
    this[property] = obj[property];
  }
  return this;
}

var queryComponents = {
  sortBy: 'name',
  page: 1,
  pages: 10,
  resultsPerPage: 20
}

function queryBuilder(obj)
{
  var querystring = '?';
  for(var property in obj)
  {
    if(obj.hasOwnProperty(property)
    {
      // make sure I have something already appended
      // before adding the & to separate values
      if(querystring.length > 1) querystring += '&';
      querystring += property + '=' + obj[property];
    }
  }

  return querystring;
}
