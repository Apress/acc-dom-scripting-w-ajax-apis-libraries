var FAQ = {
  // open items
  open_items:      [],
  // running processes
  processes:       [],
  // timer wrapper
  timer:           new Object(),
  // what's opening
  to_open:         null,
  // position we are scrolling to
  scrolling_to:    null,
  /* cache of where we are in the scrolling to keep us from
     trying to scroll again at the top or bottom */
  scroll_cache:    null,

  // ----- Initialization
  initialize:      function(){
    trace( 'initialize()' );
    // Collect the DLs & loop
    $$( 'dl.faq' ).each( function( dl ){
      trace( 'DL loop' );
      // Turn "on" the FAQ
      dl.addClassName( 'on' );
      // Loop through the DDs
      $A( dl.getElementsByTagName( 'dd' ) ).each( function( dd ){
        // Set up the height effect (using moo.fx)
        dd.heightFX = new fx.Style(
          dd, 'height',
          { duration: 500,
            onComplete: function(){
                          this.complete( dd );
                        }.bind( this )
          }
        );
        dd.openHeight = dd.getHeight();
        // Reset the ID (so we can keep bookmarking active)
        var new_id = 'FAQ_' + dd.getAttribute( 'id' );
        dd.setAttribute( 'id', new_id );
        // Close this DD
        dd.heightFX.set( 0 );
      }.bind( this ) );
      // Loop through the ANCHORs
      $A( dl.getElementsByTagName( 'a' ) ).each( function( a ){
        var href = a.getAttribute( 'href' );
        /* Drop out if the link is not an in-page ANCHOR
           or if it's TARGET cannot be found */
        if( !href.match( /#.*/ ) ||
            href.indexOf( '#' ) != 0 ||
            !$( href.replace( /#/, 'FAQ_' ) ) ) return;
        // set the event handler
        Event.observe( a, 'click', function( e ){
          var el = Event.element( e );
          var id = 'FAQ_' + el.getAttribute( 'href' ).replace( /#/, '' );
          trace( 'looking for ' + id );
          if( this.open_items.indexOf( id ) == -1 ){
            this.to_open = id;
            // See if the ANCHOR is inside a DT
            if( el.parentNode.nodeName.toUpperCase() == 'DT' ){
              /* If yes, we need to set the action to close
                 any open FAQs and then go */
              this.closeAndGo();
             } else {
              // Otherwise we need to just go to the chosen FAQ
              this.goTo();
            }
          }
          return false;
        }.bind( this ), false );
      }.bind( this ) ); // End ANCHOR loop
    }.bind( this ) ); // End DL loop
    trace( 'DL loop complete' );
    // See if we have a bookmark situation
    if( window.location.toString().indexOf( '#' ) != -1 ){
      var id = 'FAQ_' + window.location.hash.toString().replace( /#/, '' );
      trace( 'loading with bookmark: ' + id );
      if( !$( id ) ){
        trace( "can't find " + id );
      } else {
        this.to_open = id;
        this.open();
      }
    }
  },

  // ----- Open/Close/Complete
  open:            function(){
    if( this.processing() ) return this.wait( 'open' );
    clearInterval( this.timer['open'] );
    trace( 'open()' );
    var dd = $( this.to_open );
    dd.heightFX.custom( 0, dd.openHeight );
  },
  closeAndGo:      function(){
    if( this.processing() ) return this.wait( 'closeAndGo' );
    clearInterval( this.timer['closeAndGo'] );
    trace( 'closeAndGo()' );
    var id = this.to_open;
    trace( 'need to close '+this.open_items.length+' dds' );
    if( this.open_items.length > 0 ){
      $A( this.open_items ).each( function( id ){
        trace( 'closing ' + id );
        this.processes.push( id );
        var dd = $( id );
        dd.heightFX.custom( dd.openHeight, 0 );
      }.bind( this ) );
    }
    this.goTo();
  },
  complete:        function( dd ){
    trace( 'transition complete' );
    var id = dd.getAttribute( 'id' );
    if( this.to_open == id ){
      this.open_items.push( id );
      // run the scroll again (just in case the page has changed)
      this.scrolling_to = Position.cumulativeOffset( this.getDT() );
      this.scroll();
    } else {
      this.open_items = this.open_items.without( id );
    }
    this.processes = this.processes.without( id );
  },

  // ----- Scrolling stuff
  goTo:            function(){
    if( this.processing() ) return this.wait( 'goTo' );
    clearInterval( this.timer['goTo'] );
    trace( 'goTo()' );
    /* We are looking to scroll to the DT so we
       need its position */
    this.scrolling_to = Position.cumulativeOffset( this.getDT() );
    trace( 'DT position: '+ this.scrolling_to[0] + ',' + this.scrolling_to[1] );
    this.scroll();
    this.open();
  },
  /* Based on Travis Beckham's (squidfingers.com) smooth scroll
     with a little Shaun Inman (shauninman.com) thrown in */
  getScrollLeft:   function(){
    if( document.all ){
      return ( document.documentElement.scrollLeft ) ? document.documentElement.scrollLeft
                                                     : document.body.scrollLeft;
    } else {
      return window.pageXOffset;
    }
  },
  getScrollTop:    function(){
    if( document.all ){
      return ( document.documentElement.scrollTop ) ? document.documentElement.scrollTop
                                                    : document.body.scrollTop;
    } else {
      return window.pageYOffset;
    }
  },
  scroll:          function(){
    if( this.processes.indexOf( 'scroll' ) != -1 ){
      // scrolling
      var left = this.getScrollLeft();
      var top = this.getScrollTop();
      if( // damn close
          ( Math.abs( left - this.scrolling_to[0] ) <= 1 &&
            Math.abs( top - this.scrolling_to[1] ) <= 1 ) ||
          // can't scroll any farther
          ( this.scroll_cache &&
            ( this.scroll_cache[0] == left &&
              this.scroll_cache[1] == top ) ) ){
        trace( 'wrapping the scroll()' );
        window.scrollTo( this.scrolling_to[0], this.scrolling_to[1] );
        clearInterval( this.timer.scroll );
        this.scroll_cache = null;
        this.processes = this.processes.without( 'scroll' );
      } else {
        trace( 'scrolling()' );
        window.scrollTo( left + ( this.scrolling_to[0] - left )/2,
                         top + ( this.scrolling_to[1] - top )/2 );
        this.scroll_cache = [ left, top ];
      }
    } else {
      trace( 'starting the scroll()' );
      this.processes.push( 'scroll' );
      this.timer.scroll = setInterval( 'FAQ.scroll()', 100 );
    }
  },

  // ----- Element Finder
  getDT:           function(){
    trace( 'looking for the DT associated with ' + this.to_open );
    var el = $( this.to_open ).previousSibling;
    while( el.nodeName.toLowerCase() != 'dt' ){
      el = el.previousSibling;
    }
    return el;
  },

  // ----- Process Management
  processing:      function(){
    trace( 'current processes: ' + this.processes.toString() );
    return ( this.processes.length > 0 ) ? true : false;
  },
  wait:            function( method ){
    trace( 'waiting to run this.' + method + '()' );
    this.timer[ method ] = setTimeout( 'FAQ.' + method + '()', 10 );
    return false;
  }

};
if( typeof( Prototype ) != 'undefined' &&
    typeof( fx ) != 'undefined' &&
    document.getElementsByTagName( 'dl' ) ){
  addDOMLoadEvent( function(){ FAQ.initialize(); } );
}