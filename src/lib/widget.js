class Widget {
  static elem(elemName, mods) {
    const elem = elemName ? `${this._block}__${elemName}` : this._block;

    let result = elem;

    if (mods) {
      for (const mod of mods) {
        result += ` ${elem}_${mod}`;
      }
    }

    return result;
  }

  static selector(elemName, mods) {
    return '.' + this.elem(elemName, mods);
  }

  static browserTemplateEngine(block) {
    if ((block === undefined) || (block === null) || (block === false)) {
      return document.createTextNode('');
    }

    if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
      return document.createTextNode(block);
    }

    if (Array.isArray(block)) {
      const fragment = document.createDocumentFragment();

      for (const item of block) {
        const itemElem = this.browserTemplateEngine(item);

        fragment.appendChild(itemElem);
      }

      return fragment;
    }

    const elem = document.createElement(block.block);

    elem.appendChild(this.browserTemplateEngine(block.content));

    if (block.cls) {
      const classes = [].concat(block.cls);

      elem.classList.add(...classes.reduce((all, item) => {
        all.push(...item.split(' '));

        return all;
      }, []));
    }

    if (block.attrs) {
      for (const [key, value] of Object.entries(block.attrs)) {
        elem.setAttribute(key, value);
      }
    }

    return elem;
  }

  static triggerEvent(eventName, data) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data, bubbles: true }));
  }

  constructor(container) {
    this._container = container;
  }

  render(data) {
    this.widget = Widget.browserTemplateEngine(this.constructor.template(data));

    this._container.appendChild(this.widget);
  }

  _trigger(eventName, data) {
    Widget.triggerEvent.call(this.widget, eventName, data);
  }

  _triggerGlobal(eventName, data) {
    Widget.triggerEvent.call(document.body, eventName, data);
  }
}

export { Widget };
