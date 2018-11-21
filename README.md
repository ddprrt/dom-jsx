# dom-jsx

Demo project to make the DOM writeable with JSX

JSX is syntactic sugar for element factory functions. Usually we write to the virtual DOM with it, but why not going directly to the DOM, e.g. for little dynamic contents inside your app?

Here's what you need:

1. TypeScript and a tsconfig.json with your new factory method.
2. This factory:

```javascript
function DOMparseChildren(children) {
  return children.map(child => {
    if(typeof child === 'string') {
      return document.createTextNode(child);
    }
    return child;
  })
}

function nonNull(val, fallback) { return Boolean(val) ? val : fallback };

function DOMparseNode(element, properties, children) {
  const el = document.createElement(element);
  Object.keys(nonNull(properties, {})).forEach(key => {
      el[key] = properties[key];
  })
  DOMparseChildren(children).forEach(child => {
    el.appendChild(child);
  });
  return el;
}

function DOMcreateElement(element, properties, ...children) {
  if(typeof element === 'function') {
    return element({
      ...nonNull(properties, {}),
      children
    });
  }
  return DOMparseNode(element, properties, children);
}
```

P.S.: This is just a PoC. See more in [my blog](https://fettblog.eu/jsx-syntactic-sugar/)
