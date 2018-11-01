var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function show_notification(type, message){
    $.bootstrapGrowl(message, {
        ele: 'body',
        type: type,
        offset: {from: 'bottom', amount: 40},
        align: 'right',
        width: 250,
        delay: 500,
        allow_dismiss: true,
        stackup_spacing: 10
      });``
}

// This is method is used for generate unique number.
function generate_unique_number(){
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return generate_hash(current_date + random);
}

// Generates a hash for a string
function generate_hash(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

// Generates base64 for a file
function get_base64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {

   };
   reader.onerror = function (error) {

   };
}

//Limits the length of characters in a number field.
//Parameter "len" takes a numeric value from the html and "ele" takes the instance of the element.
function checkLength(len, ele) {
  var fieldLength = ele.value.length;
  if(fieldLength <= len){
    return true;
  }
  else
  {
    var str = ele.value;
    str = str.substring(0, str.length - 1);
    ele.value = str;
  }
}
