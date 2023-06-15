A Leaflet plugin to display a temporary message on a map. 
([Demo](https://www.grendelman.net/leaflet/))

# Leaflet.Messagebox

Leaflet.Messagebox is a simple control to display a temporary message, like an
error, on a [Leaflet](http://leafletjs.com/) map. The message is hidden after
a configurable timeout.

## Using the Messagebox

There a are two ways to add the messagebox to the map. First:
````javascript
let options = { timeout: 5000 }
let box = L.control.messagebox(options).addTo(map);
````

or, add it on map initialization:
````javascript
let map = L.map( 'mapdiv', {'messagebox': true, ...} );
map.messagebox.options.timeout = 5000;
````

Then, create a messagebox:
````javascript
box.new( 'This is a message' );
````

or, when implicitly used with the map:
````javascript
map.messagebox.new( 'This is a message' );
````

## Complete example of use : 

````javascript
let options = {
    position: 'topright',
    timeout: 3000,
    cssClass: 'messagebox'
}
let box = L.control.messagebox(options).addTo(map);
// will show the messagebox directly on creation for 3s
box.new( 'This is a message' );

// will re-show the messagebox 5s after it was hidden
setTimeout(function () {
    box.show('This is a permanent message',false) // the messagebox will not automatically hide

    // will re-hide the messagebox after 5s
    setTimeout(function () {
        box.hide()
        box.delete() // destroy the messagebox
        box.show() // will do nothing
    }, (5000));
}, (box.options.timeout + 5000));


````

## Available Options :

* `position` : {string} The standard Leaflet.Control position parameter. Optional, defaults to __'topright'__.
* `timeout` : {integer|bool} The duration the messagebox is shown in milliseconds. If false, the messagebox will never hide.  Optional, defaults to __3000__ (3 sec).
* `cssClass` : {string|string[]} The default css class to apply on message dom element. Optional, defaults to __'messagebox'__.


## Available methods :

### `new(message, cssClass, timeout, show)`:`{Messagebox}`

Creates a new messagebox and return the messagebox object
* `message` : {string} The message to display.
* `cssClass` : {string|string[]} The css class to apply on message dom element. Optional, defaults to `options.cssClass` value.
* `timeout` : {integer|bool} The duration the messagebox is shown in milliseconds. If false, the messagebox will never hide.  Optional, defaults `options.timeout` value.
* `show` : {bool} show messagebox on creation. Optional, defaults to __true__.


### `show(message,timeout)`:`{Messagebox}`

Shows a messagebox and return the messagebox object
* `message` : {string} The message to display. Optional, the default value will be the one assigned via the `new()` method.
* `timeout` : {integer} The duration the messagebox is shown in milliseconds. Optional, the default value will be the one assigned via the `new()` method.

### `hide()`:`{Messagebox}`
Hides the messagebox and return the messagebox object

### `delete()`:`void`
Removes the messagebox from map. The messagebox will be destroyed and can no longer be used.

## Styling ##

The messagebox can be styled with CSS, see [the css file]( leaflet-messagebox.css) for details.

# License

Leaflet.Messagebox is free software. Please see [LICENSE](LICENSE) for details.

# Misc
Alternatives names of the plugin: **Leaflet notifications** and **Leaflet alerts**

