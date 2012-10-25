console.log('client.js');

var removeOldJquery = function () {
  if (typeof jQuery != 'undefined') {
    console.log('removing old jquery');
    $.noConflict(true); // unload the $ and jQuery
  }
};

var jqueryIsLoaded = function () {
  run();
};

var checkJquery = function () {
  if (typeof jQuery != 'undefined') {
    jqueryIsLoaded();
  } else {
    window.setTimeout(checkJquery, 100);
  }
};

var loadJqueryAndRun = function (callback) {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = false;
  ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);

  checkJquery();
};

var run = function () {
  console.log('run()');
  
  console.log(jQuery('title').html());
  
  var title = jQuery('title').html() || jQuery('meta[name=title]').attr('content') || 'No Title';
  
  var description = jQuery('meta[name=description]').attr('content');
  if (!description) {
    description = prompt("No description found. You can enter one.", "");
  }
  
  var body = location.href + "\n\n" + description;

  jQuery.ajax({
    dataType: 'jsonp',
    jsonp: 'callback',
    url: 'http://www.verbalpuke.com:3000/bookmark?callback=?',
    data: {
      clientId:'1x2x3x4x5',
      url: location.href,
      body: body,
      subject: title
    },
    success: function (data) {
      console.dir(data);
    }
  });
  
};

if (typeof jQuery != 'undefined') {
  console.log('jQuery is not undefined');

  (function(jQuery) {
      /**
       * Used for version test cases.
       *
       * @param {string} left A string containing the version that will become
       *        the left hand operand.
       * @param {string} oper The comparison operator to test against. By
       *        default, the "==" operator will be used.
       * @param {string} right A string containing the version that will
       *        become the right hand operand. By default, the current jQuery
       *        version will be used.
       *
       * @return {boolean} Returns the evaluation of the expression, either
       *         true or false.
       */
      jQuery.isVersion = function(left, oper, right) {
          if (left) {
              var pre = /pre/i,
                  replace = /[^\d]+/g,
                  oper = oper || "==",
                  right = right || jQuery.jquery,
                  l = left.replace(replace, ''),
                  r = right.replace(replace, ''),
                  l_len = l.length, r_len = r.length,
                  l_pre = pre.test(left), r_pre = pre.test(right);
  
              l = (r_len > l_len ? parseInt(l) * ((r_len - l_len) * 10) : parseInt(l));
              r = (l_len > r_len ? parseInt(r) * ((l_len - r_len) * 10) : parseInt(r));
  
              switch(oper) {
                  case "==": {
                      return (true === (l == r && (l_pre == r_pre)));
                  }
                  case ">=": {
                      return (true === (l >= r && (!l_pre || l_pre == r_pre)));
                  }
                  case "<=": {
                      return (true === (l <= r && (!r_pre || r_pre == l_pre)));
                  }
                  case ">": {
                      return (true === (l > r || (l == r && r_pre)));
                  }
                  case "<": {
                      return (true === (l < r || (l == r && l_pre)));
                  }
              }
          }
  
          return false;
      };
  })(jQuery);

  jQuery(document).ready(function(jQuery) {
    console.log('ready()');
    
    // new enough
    if (jQuery.isVersion(jQuery.fn.jquery, ">=", '1.5.0')) {
      console.log('new enough' + jQuery.fn.jquery);
      run();
    } else {
      // need a newer jquery
      console.log('jquery is present, but version is too old');
      removeOldJquery();
      loadJqueryAndRun();
    }
  });
  
  console.log('done');
  
} else {
  console.log('jquery not found');
  // load up jquery
  loadJqueryAndRun();
}
