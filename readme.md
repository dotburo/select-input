# SelectInput ![](https://img.shields.io/github/package-json/v/pecuchet/select-input.svg?style=flat)

Minimal vanilla Javascript select box/dropdown with an input field. (ie11+)  
<br>
[> demo](https://pecuchet.github.io/select-input/)

## Installation
```
npm i -D @dotburo/select-input
```


## Usage
```
import SelectInput from 'select-input';

// Minimal parameters
let selectInput = new SelectInput('.select-input', {
    items: ['A', 'B', 'C', 'D']
});

// Listen to the selected event 
selectInput.on('selected', e => {
    console.log(e.detail);
});
```

## Available options (and their defaults)
```
{
    items: [],                              # Array of strings/numbers or of {value: String|Number} objects
    current: null,                          # Item to select on instantiation
    parent: null,                           # Parent element, to 
    maxHeight: 0,                           # Maximum height of the dropdown, `0` means no constraint
    proposal: 'Add {X} to the list?',       # Message to add an item to the list, {X} will be replaced
    sort: true,                             # Whether to sort the list
    order: 'desc',                          # Sort order
    removalIcon: '&times;'                  # HTML for deletion button in each item li-element
}
```

## Events

- **selected**
- **created**
- **removed**

Event handlers can be bound with `instance.on()` or `instance.getElement().addEventListener()`. In browsers which
support `CustomEvent` the `detail` property of the event object contains the created, selected or removed item. 
For older browsers `instance.getCurrent()` will need to be used.

## Public methods

### instance.on(event, fn, el = null)
Listen to events, pass in and event name (`String`), a subscriber (`Function`) and optionally and event target (`Element`). 
If the latter is omitted, events are delegated to `instance.getElement()`.

### instance.toggle(show = false)
Show or hide the list

### instance.getElement()
Return SelectInput's outermost element 

### instance.getItems() 
Get all the items in the list as an array of objects

### instance.getCurrent()
Return the currently selected item of the list
 
### instance.findItem(value)
Find an item in the list by its value (`String|Number`)

### instance.remove()
Unbind all events and clean up the DOM
