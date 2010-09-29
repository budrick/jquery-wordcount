// jQuery wordcount
// Author: Matt Cegielka <matt@mudbrick.org>
// http://bitbucket.org/budrick/jquery-wordcount

(function( $ ){

    var methods = {
      init : function( options ) { 
        var settings = {
          'limit': 0,
          'showLimit': false,
          'displayClass': 'jq-wordcount-display',
          'class': 'jq-wordcount'
        };
        $.extend(settings, options);

        return this.each(function() {
            var el = $('<div class="' + settings.displayClass + '"></div>');
            $(this).after(el);
            $(this).addClass(settings.class);
            $(this).bind('keypress.wordcount', function() {
                
                $(el).html(
                  $(this).wordcount('get') + 
                    (settings.limit && settings.showLimit?(" / " + settings.limit):"")
                ); 

                if (settings.limit && $(this).wordcount('get') > settings.limit) {
                  return false;
                }

              });
            $(this).trigger('keypress');
          });
      },
      get: function() {
        $(this).wordcount('update');
        return $(this).data('wordcount');
      },
      update: function() {
        return this.each(function() {
            $(this).data('wordcount', $.grep($(this).val().split(/\W+/), function (n, i) { return n.length; }).length);
          });
      }
    };

    $.fn.wordcount = function( method ) {

      // Method calling logic
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.wordcount' );
      }    

    };

  })( jQuery );

