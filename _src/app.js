const Didact = (() => {
  // テキスト要素の作成
  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
  } // 要素の作成（JSX のトランスパイル時に使われる関数）


  function createElement(type, props, ...children) {
    return {
      type,
      props: { ...props,
        children: children.map(child => typeof child === "object" ? child : createTextElement(child))
      }
    };
  } // レンダリング関数（再帰的に実行する）


  function render(element, container) {
    console.log(element.type);
    const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);

    const isProperty = key => key !== "children";

    Object.keys(element.props).filter(isProperty).forEach(name => {
      dom[name] = element.props[name];
    });
    element.props.children.forEach(child => render(child, dom));
    container.appendChild(dom);
  }

  return {
    createElement,
    render
  };
})();
/** @jsx Didact.createElement */


const element = Didact.createElement("div", {
  id: "foo"
}, Didact.createElement("a", null, "bar"), Didact.createElement("b", null));
const container = document.getElementById("root");
Didact.render(element, container);
