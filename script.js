var $ = {

  ajax: function(options) {
    // complete(xhr, request)
    var complete = options.complete || null;
    // data (object, string, or array) converted to string if not already, appended to request
    if (options.data) {
      var data = convertToQueryString(options.data)
    };

  },

  convertToQueryString: function(obj) {
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
};
