(function($) {
    var namespace = ".dropdown",
        methods = {
        init: function(opts) {
            return this.each(function() {
                var $dropdownEl = $("<div class='dropdown-element'>"),
                    $self = $(this),
                    values = [], 
                    entries = [];
                $self.css({     // Off the screen
                    "position": "fixed",
                    "top"   :   "-1000px",
                }).wrap($dropdownEl);
                $self.children("option").each(function(){   
                    values.push($(this).attr('value'));
                    entries.push($(this).text());
                });
                $self.data({
                    'values': values,
                    'entries': entries,
                }).after(
                    "<div class='show-selected'>" + entries[0] + "</div>  \
                    <div class='dropdown-data'>  \
                    " + (function() {
                        var optHTML = "";
                        for (var i = 0; i < values.length; i++) {
                            optHTML += "<div class='dropdown-option selectable' value='" 
                                    + values[i] + "'>" + entries[i] + "</div>";
                        }
                        return optHTML;
                    })() + " \
                    </div>   \
                    <div class='dropdown-button'></div>");
                attachEvents($self.parent().css({
                    "-moz-user-select": "none",
                    "-user-user-select": "none",
                    "-o-user-select": "none",
                    "-user-select": "none"
                }));
            });
        },
        destroy: function() {
            return this.each(function() {
                // Remove events
                var $self = $(this);
                removeEvents($self.parent());
                $self.nextAll().remove();
                $self.css({position:"", top:""}).unwrap();
            });
        },
        value: function() {
            if (arguments.length >= 1) {
                var value = arguments[0];
                this[0].value = value;
                setDisplayText(this, value);
            } else {
                return this.val();
            }
        },
    };
    
    function setDisplayText($select, value) {
        $select.next().text($select.find('option[value="'+value+'"]').text())
    }
    
    function setHighlight($option) {
        $option.attr("highlight","1").siblings().removeAttr("highlight");
    }
    
    function open($dpdn) {
        var $select = $dpdn.children("select");
        $dpdn.addClass("open");
        $(document).bind("click"+namespace, function(){
            close($dpdn);
        });
        $dpdn.bind("click"+namespace, function(e){
            e.stopPropagation();
        });
        $dpdn.find(".selectable").bind("mousedown"+namespace, function(){
            //var value = $(this).attr("value");
            var value = $(this).parent().children('[highlight]').attr("value");
            $dpdn.children('select').dropdown('value', value);
            close($dpdn);
        }).bind("mouseover"+namespace, function(){
            if (typeof $(this).parent().attr("no-hover") === undefined){return;}
            setHighlight($(this));
        });
        $select.focus();
        setHighlight($dpdn.find(".selectable[value='" + $select.val() + "']"));
    }
    
    function close($dpdn, doFocus) {
        $dpdn.removeClass("open");
        $(document).unbind(namespace);
        $dpdn.unbind(namespace);
        $dpdn.find(".selectable").unbind(namespace);
        if (typeof doFocus !== "undefined" && doFocus !== false) {
            $dpdn.children("select").focus();
        }
    }
    
    function attachEvents($dpdn) {
        $dpdn.children(".dropdown-button, .show-selected").bind("click"+namespace, function(){
            if (!$dpdn.hasClass("open")) {
                open($dpdn);
            } else {
                close($dpdn);
            }
        });
        $dpdn.children("select").bind("focus"+namespace, function(){
            $dpdn.addClass("focus");
            var $select = $(this);
            $select.unbind("keydown"+namespace).bind("keydown"+namespace, function(e){
                var $data = $(this).next().next(),
                    code = (e.keyCode ? e.keyCode : e.which),
                    $curr = $data.children("[highlight]"),
                    $next;
                if ($curr.length === 0) {
                    $curr = $data.children(':first-child');
                }
                switch(code) {
                    case 37:        // Left
                    case 38:        // Up
                        $next = $curr.prev();
                        break;
                    case 39:        // Right
                    case 40:        // Down
                        $next = $curr.next();
                        break;
                    case 13:        //Enter key
                        $select.dropdown('value', $curr.attr('value'));
                        close($dpdn);
                        return false;
                    case 27:        //ESC key
                        close($dpdn);
                        return;
                    default:
                        return;
                }
                if ($next.length === 0) {
                    $next = $curr;
                }
                var value = $next.attr("value");
                setDisplayText($select, value);
                setHighlight($next);
            });
        }).bind("blur"+namespace, function(e){
            // Hack fix for Firefox blurring after this function finishes
            if ($dpdn.hasClass("focus")) {
                setTimeout(function(){
                    $dpdn.find("select").focus();
                    $dpdn.removeClass("focus");
                });
            }
            
            // Hack for chrome because it will continuous focus itself
            //close($dpdn, $dpdn.hasClass("focus"));
            $dpdn.removeClass("focus");
            $(this).unbind("keypress"+namespace);
        });
    }
    
    function removeEvents($dpdn) {
        $dpdn.children(".dropdown-button .show-selected").unbind(namespace);
        $dpdn.children("select").unbind(namespace);
    }
    
    $.fn.dropdown = function( method ) {    
        if (this.prop("tagName") === "SELECT") {
            if ( methods[method] ) {
                return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.dropdown' );
            }
        } else {
            $.error("You can only apply dropdown() to a select element.");
        }
    };
})(jQuery);