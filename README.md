# CML
Canvas Markup Language

## Shapes Properties

### Properties Events
#### onChanged
*occur after a spesific property has be changed*.

For example
```javascript
 domElem.properties.onChanged('font-size', handler)
```
The event param is an object: `{ name, newValue, oldValue};`

