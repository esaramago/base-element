import { BaseElement } from "../base-element.js"

class Hello extends BaseElement {
  properties = {
    name: {
      value: "World",
      type: String,
      required: true,
    },
  }

  render() {
    return /* html */`
      <h1>Hello, ${this.name}!</h1>
    `
  }

  styles() {
    return /* css */`
      h1 {
        font-size: clamp(2rem, 5vw, 3rem);
      }
    `
  }
}

customElements.define("base-hello", Hello);
