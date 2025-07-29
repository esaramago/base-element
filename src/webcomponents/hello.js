import { BaseElement } from "../base-element.js"

class Hello extends BaseElement {
  properties = {
    name: {
      value: "World",
      type: String,
      required: true,
    },
  }

  #name

  static observedAttributes = ['name']

  render() {
    return /* html */`
      <h1>Hello, <span id="name"><span id="name-text">${this.name}</span></span>!</h1>
    `
  }

  styles() {
    return /* css */`
      h1 {
        font-size: clamp(2rem, 5vw, 3rem);
      }
      #name-text {
        color: var(--primary-color);
        transition: color 2s ease-in;
      }
      #name-text.updated {
        color: #FFF;
      }
    `
  }

  mounted() {
    this.#name = this.shadowRoot.getElementById('name')
    this.#renderRandomName()
  }

  updated(property, oldValue, newValue) {
    if (property === 'name') {
      this.#renderRandomName()
    }
  }

  #renderRandomName() {
    this.#name.innerHTML = /* html */`<span id="name-text" >${this.name}</span>`
    setTimeout(() => {
      this.#name.querySelector('#name-text').classList.add('updated')
    }, 1)
  }
}

customElements.define("base-hello", Hello);
