const Didact = (() => {
  // テキスト要素の作成
  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      }
    }
  }
  
  // 要素の作成（JSX のトランスパイル時に使われる関数）
  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object"
            ? child
            : createTextElement(child)
        )
      }
    }
  }
  
  // レンダリング関数（再帰的に実行する）
  function render(element, container) {
    // エレメントを判定して DOM を生成
    const dom = element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
    
    // プロパティを生成した DOM に追加
    const isProperty = key => key !== "children"
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name]
      })
  
    // 子要素をレンダリング
    element.props.children.forEach(child =>
      render(child, dom)
    )
  
    // 親要素に生成した DOM を追加
    container.appendChild(dom)
  }

  return {
    createElement,
    render
  }
})();

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

const container = document.getElementById("root")
Didact.render(element, container)
