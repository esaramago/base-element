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
        width: 18rem;
        justify-content: center;
      }
      label {
        visibility: hidden;
        position: absolute;
      }
      input {
        text-align: center;
        width: 4rem;
        border: none;
        background-color: transparent;
        font-size: 1.8rem;
        font-weight: 600;
        font-family: inherit;
      }
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button 
      {
          -webkit-appearance: none;
          margin: 0;
      }
      /* For Firefox  */
      
      input[type="number"] {
          -moz-appearance: textfield;
      }
      
      base-button span {
        display: block;
        padding-block-end: 0.4rem;
        font-size: 1.8rem;
        line-height: 1.2;
      }
    `
  }

  render() {
    const { count } = this
    return /* html */`
      <div class="counter">
        <base-button type="button" id="decrement" aria-hidden="true">
          <span>-</span>
        </base-button>
        <label for="input">Counter</label>
        <input type="number" value="${count}" id="input" />
        <base-button type="button" id="increment" aria-hidden="true">
          <span>+</span>
        </base-button>
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