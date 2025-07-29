import { BaseElement } from "../base-element.js"

class Card extends BaseElement {
  properties = {
    name: {
      value: "World",
      type: String,
      required: true,
    },
  }

  render() {
    return /* html */`
      <h1>Hello, ${this.name}</h1>
    `
  }
}

customElements.define("base-card", Card);
