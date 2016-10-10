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
    // make sure I have something already appended
    // before adding the & to separate values
    if(querystring.length > 1) querystring += '&';
    querystring += property + '=' + obj[property];
  }

  return querystring;
}
