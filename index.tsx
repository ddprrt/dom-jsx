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

const Button = ({ msg }) => {
  return <button onclick={() => alert(msg)}><strong>Click me</strong></button>
}

const el = <div>
  <h1 className="what">Hello world</h1>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae sed consectetur placeat veritatis 
    illo vitae quos aut unde doloribus, minima eveniet et eius voluptatibus minus aperiam sequi asperiores, odio ad?
  </p>
  <Button msg='Yay' />
  <Button msg='Nay' />
</div>

document.body.appendChild(el);
