/*!
 * Jold jQuery Paginator 1.0.4
 *
 * Copyright (c) 2018 Jold Interactive; Jurgen Oldenburg <info@jold.nl>
 *
 * A jQuery pagination plugin for easy and quick pagination of items inside an element.
 * See README.md for usage and options
 *
 * Licences: BSD-3-Clause
 * https://opensource.org/licenses/BSD-3-Clause
 */
(function($){

    var JoldPaginator = function( element, options ) {

        var obj         = this;
        var $container  = $(element);

        /**
         * Pick up the options passed to the plugin
         */
        var settings = $.extend({
            param: 'defaultValue'
        }, options || {});


        /**
         * defaults
         * The initial default pagint parameters and settings
         * for the items start, end, total, end page parameters
         * @type {object}
         */
        var defaults = {
            'items': {
                'total': 0,
                'start': 1,
                'end': options.perPage,
            },
            'pages': {
                'total': 0,
                'current': 1,
            },
        };


        /**
         * details
         * Details about the current page, and items displayed
         * @type {object}
         */
        var details = {
            'items': {
                'total': defaults.items.total,
                'start': defaults.items.start,
                'end': options.perPage,
            },
            'pages': {
                'total': defaults.pages.total,
                'current': defaults.pages.current,
            },
        };


        /**
         * Get all visible items from the container
         * @return integer    The total number of reports
         */
        this.items = function() {
            var $items = $container.find( options.items + ".item-visible" );
            return $items;
        }


        /**
         * Count the total reports in a report container
         * @return integer    The total number of reports
         */
        this.total = function() {
            var $count = this.items();
            return $count.length;
        }


        /**
         * Calc the number of pages to paginate
         * @return integer    The total number of reports
         */
        this.pages = function() {
            return Math.ceil( (this.total() / options.perPage) );
        }


        /**
         * Show items x to x in the container
         * @param  integer start    Show items from x
         * @param  integer end      Show items to x
         * @return array            The items to show
         */
        this.show = function( start, end ) {
            this.items().slice( start, end ).show();
        }


        /**
         * Hide all items in the $container
         * @return na
         */
        this.hideAll = function() {
            $container.find( options.items ).hide();
        }


        /**
         * Find and replace in a string
         * @param  {string}     subject     String to sear for
         * @param  {string}     replace     Will be replaces with this
         * @param  {string}     heystack    The string to searh and replace in
         * @return {string}                 Replaced string output
         */
        this.replace = function( subject, replace, heystack ) {
            var find = heystack.replace(subject,replace);
            return find;
        }


        /**
         * Set the indicator content with updated details
         * @return na     Set the content of the indicator witht formatted indicator text
         */
        this.indicator = function( ) {


            var selector = $(options.indicator.selector);
            var content  = options.indicator.text;

            $( selector ).text( '' );

            content = obj.replace( '{start}', details.items.start, content );
            content = obj.replace( '{end}',   details.items.end,   content );
            content = obj.replace( '{total}', details.items.total, content );

            $( selector ).text( content );

        }


        /**
         * Update the pagination details, if they validate
         * @param  {integer} start          The start position of the items to displaying
         * @param  {integer} end            The end position of the items to display
         * @param  {integer} total          The total number of all items
         * @param  {integer} pageTotal      Total pages
         * @param  {integer} pageCurrent    Current active page
         * @return {na}                     Returns nothing, just updates the internal details object.
         */
        this.updateDetails = function( start, end, total, pageTotal, pageCurrent ) {

            // console.log('Update details: ', start, end, total, pageTotal, pageCurrent)

            if (start !== 'undefined' && typeof start == 'number')
                details.items.start = start;

            if (end !== 'undefined' && typeof end == 'number')
                details.items.end = end;

            if (total !== 'undefined' && typeof total == 'number')
                details.items.total = total;

            if (pageTotal !== 'undefined' && typeof pageTotal == 'number')
                details.pages.total = pageTotal;

            if (pageCurrent !== 'undefined' && typeof pageCurrent == 'number')
                details.pages.current = pageCurrent;

            if ( total <= end ) {
                details.items.end = total;
            }

            // console.log('Details updated! ', details);

        }


        /**
         * Plot the pagination items
         * @return mixed    Write html to the paging container
         */
        this.plot = function( $paginator ) {

            /** Get the number of pages to paginate */
            var pages = new Array( this.pages() );

            /** Update the main paginator details */
            obj.updateDetails( defaults.items.start, defaults.items.end, obj.total(), obj.pages(), null );

            /** Empty / reset the pagination container */
            $paginator.html('');

            /** Only plot pages if there are more than 1 */
            if ( pages <= 1 )
                return false;

            /** Build the pagination container links */
            $.each(pages, function(index) {

                /** Create li item */
                var $item = $('<li></li>', {
                    'class'     : 'pagination__item',
                });

                /** Add 'pagination__item--current' class to the first item */
                if (index == 0) {
                    $item.addClass('pagination__item--current');
                }

                /** Create and append a link to the li item */
                var $link = $('<a></a>', {
                    'text'      : (index + 1),
                    'href'      : '#',
                    'class'     : 'pagination__link',
                    'data-item' : (index + 1)
                });

                /** Register click action on pagination item */
                $link.on('click', function(event) {

                    event.preventDefault();

                    var current     = $(this).data('item');
                    var pageItems   = (current * options.perPage);
                    var start       = (pageItems - options.perPage);
                    var end         = (pageItems);

                    /** Remove 'pagination__item--current' class from all items */
                    $paginator.find('.pagination__item--current').removeClass('pagination__item--current');

                    /** Add 'pagination__item--current' class to the current item */
                    $(this).parent().addClass('pagination__item--current');

                    obj.hideAll();
                    obj.show( start, end );

                    /** Update the main paginator details */
                    obj.updateDetails( (start + 1), end, obj.total(), obj.pages(), current );

                    /** Update the indicator text */
                    obj.indicator();

                    return false;

                });

                $item.append($link);
                $paginator.append($item);

            })

        }


        /**
         * Initiate / reset pagination
         */
        this.default = function() {
            obj.updateDetails( defaults.start, defaults.end, obj.total(), obj.pages(), defaults.pages.current );
            return false;
        }


        /**
         * Initiate / reset pagination
         */
        this.init = function() {

            obj.hideAll();
            obj.show( 0, options.perPage );

            obj.plot( $(options.paginator) );

            /** Reset indicator text */
            obj.indicator();

        }

        // Initiate the paginator
        this.init();

    };


    $.fn.joldPaginator = function( options ) {

        var element = $(this);

        // Return early if this element already has a plugin instance
        if (element.data('joldPaginator')) return element.data('joldPaginator');

        // pass options to plugin constructor
        var joldPaginator = new JoldPaginator( this, options );

        // Store plugin object in this element's data
        element.data('joldPaginator', joldPaginator);

        return joldPaginator;

    };

})(jQuery);
