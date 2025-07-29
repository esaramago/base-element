import { BaseElement } from "../base-element.js"
import Prism from 'prismjs'

/**
 * A code component for displaying code snippets.
 */
class Code extends BaseElement {
  properties = {
    language: {
      value: "javascript",
      type: String,
    }
  }

  render() {
    return /* html */`
      <pre><slot></slot></pre>
    `
  }

  mounted() {
    const { language } = this
    this.innerHTML = Prism.highlight(this.innerHTML, Prism.languages[language], language)
  }

  styles() {
    return /* css */`
      :host {
        width: 100%;
        background-color: #111;
        overflow: auto;
        padding-inline-end: 2rem;
      }

      @media (prefers-color-scheme: light) {
        :host {
          background-color: #EEE;
        }
      }
    `
  }
}

customElements.define("base-code", Code);
