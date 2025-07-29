import { BaseElement } from "../base-element.js"

class Card extends BaseElement {
  properties = {
  }

  styles() {
    return /* css */`
      .base-card {
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      :host ::slotted(h3) {
        font-size: 1.5rem;
        margin-block-end: .8rem;
      }
    `
  }

  render() {
    return /* html */`
      <div class="base-card">
        <slot name="title"></slot>
        <slot></slot>
      </div>
    `
  }
  
}

customElements.define("base-card", Card);
