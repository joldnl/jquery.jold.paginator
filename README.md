# jQuery JOLD Paginator

Version 1.0.1

## Summary

A jQuery pagination plugin for easy and quick pagination of items inside an element.

## Author

Jurgen Oldenburg ( [@staxxnl](http://twitter.com/staxxnl) / [jold.nl](https://www.jold.nl) / [info@jold.nl](mailto:info@jold.nl) )

## Usage

Include `jquery.joldPaginator.min.js` after calling jQuery in the footer. Alternatively, include in your `plugins.js` file if using [HTML5 Boilerplate](http://html5boilerplate.com).


### Create a list of paginatable items

Create a list with items to paginate:
```html
    <div class="items-container">
        <h3>Paginated items:</h3>
        <div class="item item-visible">item 1</div>
        <div class="item item-visible">item 2</div>
        <div class="item item-visible">item 3</div>
        <div class="item item-visible">item 3</div>
        <div class="item item-visible">item 4</div>
        <div class="item item-visible">item 5</div>
        <div class="item item-visible">item 6</div>
        <div class="item item-visible">item 7</div>
        <div class="item item-visible">item 8</div>
        <div class="item item-visible">item 9</div>
        <div class="item item-visible">item 10</div>
    </div>
```
The `item-visible` class is necessary to tell the paginator these are active items to search for. All items that do not have this class will not be picked up by the paginator, and should be hidden.


Create a container for the pagination links and pagination indicator:
```html
    <div class="pagination-indicator"></div>
    <ul class="pagination-container"></ul>
```

### Initialize pagination

```js
    var paginator = new $('.items-container').joldPaginator({
        'perPage': 10,
        'items': '.item',
        'paginator': '.pagination-container',
        'indicator': {
            'selector': '.paginationindicator',
            'text': 'Showing item {start}-{end} of {total}',
        }
    });
```

This example initiates the paginator on the `.items-container` element and searches for all elements with the class `.item` within that container. It pages on 10 items, and displays the pagination in the `.pagination-container` element in your html.
All of these elements need to be present on the page you're initiating the paginator.

The plugin is quipped to handle changes in the number of visible items. If you, for example, have a filter that changes the number of items displayed. See the example page for a example usage on how to toggle items.



## Options

| Option                 | Description                                          | Required | Default |
|------------------------|------------------------------------------------------|----------|---------|
| **perPage**            | The number of items to show per page                 | TRUE     | N/A     |
| **items**              | The items to search for in the container             | TRUE     | N/A     |
| **paginator**          | The container where the pagination will be displayed | TRUE     | N/A     |
| **indicator.selector** | The container where the indicator will be displayed  | TRUE     | N/A     |
| **paginator.text**     | The text of the indicator                            | TRUE     | N/A     |


## Requirements

Tested with jQuery 1.12.1.


## Changelog


#### Version 1.0.1

* Fix npm vulnerabilities
* Update gulp workflow for Gulp v4.
* Cleanup gulp workflow
* Update all npm packages


#### Version 1.0

* Initial commit.
