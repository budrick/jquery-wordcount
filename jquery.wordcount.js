// jQuery wordcount
// Author: Matt Cegielka <matt@mudbrick.org>
// http://bitbucket.org/budrick/jquery-wordcount

(function( $ ){

    var methods = {
      init : function( options ) { 
        var settings = {
          'limit': 0,
          'showLimit': false
        };
        $.extend(settings, options);

        return this.each(function() {
            var el = $('<span class="jq-wordcount"></span>');
            $(this).after(el);
            $(this).bind('keypress.wordcount', function() {
                
                $(el).html(
                  $(this).wordcount('update').wordcount('get') + 
                    (settings.limit?(" / " + settings.limit):"")
                ); 
                if (settings.limit && $(this).wordcount('update').wordcount('get') > settings.limit) {
                  return false;
                }

              });
          });
      },
      get: function() {
        return $(this).data('wordcount');
      },
      update: function() {
        return this.each(function() {
            $(this).data('wordcount', $(this).val().split(/\W+/).length);
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
        $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
      }    

    };

  })( jQuery );

