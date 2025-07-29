import { BaseElement } from "../base-element.js"

class Counter extends BaseElement {

  #incrementButton
  #decrementButton
  #input

  properties = {
    count: {
      value: 0,
      type: Number
    }
  }

  styles() {
    return /* css */`
      .counter {
        display: flex;
        gap: 1rem;
        max-width: 13rem;
      }
      base-input::part(input) {
        text-align: center;
      }
    `
  }

  render() {
    return /* html */`
      <div class="counter">
        <base-button type="button" id="decrement">-</base-button>
        <base-input type="number" value="${this.count}" id="input" label-hidden></base-input>
        <base-button type="button" id="increment">+</base-button>
      </div>
    `
  }

  mounted() {
    this.#incrementButton = this.shadowRoot.getElementById("increment")
    this.#decrementButton = this.shadowRoot.getElementById("decrement")
    this.#input = this.shadowRoot.getElementById("input")

    this.#incrementButton.addEventListener("click", () => {
      this.count++
      this.#input.value = this.count
    })

    this.#decrementButton.addEventListener("click", () => {
      this.count--
      this.#input.value = this.count
    })
  }
}

customElements.define("base-counter", Counter);