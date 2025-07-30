import { BaseElement } from "../base-element.js"

/**
 * A customizable button component with support for different variants and sizes.
 */
class Button extends BaseElement {
  properties = {
    variant: {
      value: "primary",
      type: String,
      validator: (value) => ["primary", "secondary", "outline", "text"].includes(value)
    },
    size: {
      value: "medium",
      type: String,
      validator: (value) => ["small", "medium", "large"].includes(value)
    },
    disabled: {
      value: false,
      type: Boolean
    },
    ariaHidden: {
      value: false,
      type: Boolean
    }
  }

  render() {
    const { variant, size, disabled, ariaHidden } = this
    const classes = [
      "base-button",
      `base-button--${variant}`,
      `base-button--${size}`,
      disabled ? "base-button--disabled" : ""
    ].filter(Boolean).join(" ")

    return /* html */`
      <button class="${classes}" ${disabled ? "disabled" : ""} ${ariaHidden ? "aria-hidden=true" : ""}>
        <slot></slot>
      </button>
    `
  }

  styles() {
    return /* css */`
      :host {
        display: flex;
        justify-content: center;
      }
      .base-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: 1px solid transparent;
        font-family: inherit;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        height: 2.8rem;
        min-width: 3.4rem;
      }

      .base-button--primary {
        background-color: #646cff;
        border-color: #646cff;
        color: white;
      }

      .base-button--secondary {
        background-color: #1a1a1a;
        border-color: #1a1a1a;
        color: white;
      }

      .base-button--outline {
        background-color: transparent;
        border-color: #646cff;
        color: #646cff;
      }

      .base-button--text {
        background-color: transparent;
        border: none;
        color: #646cff;
      }

      .base-button--small {
        padding: 0.3rem 0.75rem;
        font-size: 0.875rem;
      }

      .base-button--large {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      }

      .base-button--disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .base-button:hover:not(.base-button--disabled) {
        opacity: 0.9;
      }

      .base-button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.5);
      }
    `
  }
}

customElements.define("base-button", Button);
