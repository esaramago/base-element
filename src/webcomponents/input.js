import { BaseElement } from "../base-element.js"

/**
 * A customizable input component with support for different types and validation.
 */
class Input extends BaseElement {
  properties = {
    id: {
      value: "",
      type: String,
      required: true
    },
    type: {
      value: "text",
      type: String,
      validator: (value) => ["text", "password", "email", "number"].includes(value)
    },
    label: {
      value: "Input",
      type: String
    },
    labelHidden: Boolean,
    placeholder: {
      value: "",
      type: String
    },
    value: {
      value: "",
      type: String || Number
    },
    required: {
      value: false,
      type: Boolean
    },
    disabled: {
      value: false,
      type: Boolean
    },
    error: {
      value: false,
      type: Boolean
    },
    errorMessage: {
      value: "",
      type: String
    }
  }

  static observedAttributes = ["value"]

  render() {
    const { id, type, label, labelHidden, placeholder, value, required, disabled, error, errorMessage } = this
    
    const classes = [
      "base-input",
      error ? "base-input--error" : "",
      disabled ? "base-input--disabled" : ""
    ].filter(Boolean).join(" ")

    return /* html */`
      <div class="base-input-container">
        <label for="${id}" ${labelHidden ? "hidden" : ""}>${label}</label>
        <input
          part="input"
          id="${id}"
          name="${id}"
          type="${type}"
          placeholder="${placeholder}"
          value="${value}"
          ${required ? "required" : ""}
          ${disabled ? "disabled" : ""}
          class="${classes}"
        />
        ${error && errorMessage ? `<div class="base-input-error">${errorMessage}</div>` : ``}
      </div>
    `
  }

  styles() {
    return /* css */`
      .base-input-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .base-input-container label {
        font-size: 0.875rem;
        color: #646cff;
      }

      .base-input {
        padding: 0.5rem 0.5rem .5rem 1rem;
        border: 1px solid #646cff;
        border-radius: 4px;
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.2s ease;
        width: 100%;
        box-sizing: border-box;
      }

      .base-input:focus {
        outline: none;
        border-color: #535bf2;
        box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.1);
      }

      .base-input--error {
        border-color: #ff4444;
      }

      .base-input--error:focus {
        box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.1);
      }

      .base-input--disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .base-input-error {
        color: #ff4444;
        font-size: 0.75rem;
        padding: 0.25rem 0;
      }

      label {
        text-align: initial;
      }
    `
  }

  updated(property, oldValue, newValue) {
    if (property === "value") {
      this.shadowRoot.querySelector("input").value = newValue
    }
  }
}

customElements.define("base-input", Input);
