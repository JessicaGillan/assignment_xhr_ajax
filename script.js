var $ = {};

$.ajax = function ajax(options) {
  // data (object, string, or array) converted to string if not already, appended to request
  var data = options.data ? $.convertToQueryString(options.data) : null;

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
  xhr.addEventListener('load', function(e) {
    if (xhr.status >= 200 && xhr.status < 300 && success) {
      success(this.response, this.statusText, this);
    } else if (error && xhr.status >= 300 && xhr.status < 200) {
      error(this, this.status, this.statusText);
    }
    if (complete) complete(this, this.statusText);
  });

  xhr.open( method, url, asyncBool);

  // setRequestHeader takes 2 arguments
  if (headers) xhr.setRequestHeader(headers);

  xhr.send(data);
}

$.get = function get(options) {
  var url = options.url;

  // data (object, string, or array) converted to string if not already, appended to request
  var data = options.data ? $.convertToQueryString(options.data) : null;

  // success : function that takes (response from server, string status, jQXHR)
  var success = options.success || null;

  var dataType = options.dataType || "";

  // Construct and send xhr object
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    if (xhr.status >= 200 && xhr.status < 300 && success) {
      success(this.response, this.statusText, this);
    }
  });

  xhr.open( 'GET', url);
  xhr.responseType = dataType;

  xhr.send(data);
}

$.post = function post(options) {
  var url = options.url;

  // data (object, string, or array) converted to string if not already, appended to request
  var data = options.data ? $.convertToQueryString(options.data) : null;

  // success : function that takes (response from server, string status, jQXHR)
  var success = options.success || null;

  var dataType = options.dataType || "";

  // Construct and send xhr object
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    if (xhr.status >= 200 && xhr.status < 300 && success) {
      success(this.response, this.statusText, this);
    }
  });

  xhr.open( 'POST', url);
  xhr.responseType = dataType;

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
  complete: function(xhr, status){
    console.log("completed")
    console.log( xhr );
    console.log( "status text:",status );
  },

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

var testPostOptions = {
  complete: function(xhr, status){
    console.log("completed")
    console.log( xhr );
    console.log( "status text:",status );
  },

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

  data: {title: "Foo",
         body: "Bar",
         userId: "1"},
  method: 'POST',
  url: "https://reqres.in/api/posts",
  asyncBool: true,
  dataType: 'json'
};

$.post(testPostOptions);
// $.get(testOptions);
// $.ajax(testPostOptions);
