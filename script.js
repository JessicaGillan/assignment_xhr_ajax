var $ = {};

$.ajax = function ajax(options) {
  // data (object, string, or array) converted to string if not already, appended to request
  var data = options.data? convertToQueryString(options.data) : null;

  // error : function that takes XMLH obj, string status, string of error
  var error = options.error || null;

  // success : function that takes (response from server, string status, jQXHR)
  var success = options.success || null;

  var complete = options.complete || null; // complete(xhr, request)

  var headers = options.headers || null; // headers : obj
  var method = options.method || 'GET'; // method : Http verb
  var url = options.url || null;
  var asyncBool = options.asyncBool || false; // async boolean

  // Construct and send xhr object
  var xhr = new XMLHttpRequest();
  if (success)
    xhr.addEventListener('success',
                          function() { success(this.response, this.statusText, this) });

  if (error)
    xhr.addEventListener('error',
                          function() { error(this, this.status, this.statusText) });
  if (complete)
    xhr.addEventListener('load',
                         function() { complete(this, this.statusText) });

  xhr.open( method, url, asyncBool);

  // setRequestHeader takes 2 arguments
  if (headers) xhr.setRequestHeader(headers);

  xhr.send(data);
}

$.convertToQueryString = function(obj) {
  if (typeof obj === "string") {
    return obj;
  }
  var str = [];
  for(var p in obj)
  if (obj.hasOwnProperty(p)) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}

var testOptions = {
  // complete: function(xhr, status){
  //   console.log("completed")
  //   console.log( xhr );
  //   console.log( "status text:",status );
  // },

  success: function(response, status, xhr){
    console.log("success", response);
    console.log( xhr );
    console.log( "status text:",status );
  },

  error: function(xhr, status, statusText){
    console.log("error", xhr);
    console.log( "status:",status );
    console.log( "status text:", statusText );
  },

  method: 'GET',
  url: "https://reqres.in/api/users",
  asyncBool: true
}

$.ajax(testOptions);
