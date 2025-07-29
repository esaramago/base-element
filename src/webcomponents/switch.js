import { BaseElement } from "../base-element.js"

/**
 * A toggle switch component that can be used as an alternative to checkboxes.
 */
class Switch extends BaseElement {
  properties = {
    checked: {
      value: false,
      type: Boolean
    },
    disabled: {
      value: false,
      type: Boolean
    },
    label: {
      value: "",
      type: String
    },
    name: {
      value: "",
      type: String
    },
    id: {
      value: "",
      type: String,
      required: true
    }
  }

  #input = null

  render() {
    const { checked, disabled, label, name, id } = this
    const classes = [
      "base-switch",
      disabled ? "base-switch--disabled" : ""
    ].filter(Boolean).join(" ")

    return /* html */`
      <label class="base-switch-container">
        <input
          type="checkbox"
          class="base-switch-input"
          ?checked="${checked}"
          ?disabled="${disabled}"
          name="${name}"
          id="${id}"
        />
        <span class="base-switch-slider"></span>
        ${label ? `<span class="base-switch-label">${label}</span>` : ``}
      </label>
    `
  }

  styles() {
    return /* css */`
      .base-switch-container {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        user-select: none;
      }

      .base-switch-input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .base-switch-slider {
        position: relative;
        width: 48px;
        height: 24px;
        background-color: #ccc;
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .base-switch-slider::before {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        border-radius: 50%;
        transition: all 0.2s ease;
      }

      .base-switch-input:checked + .base-switch-slider {
        background-color: #646cff;
      }

      .base-switch-input:checked + .base-switch-slider::before {
        transform: translateX(24px);
      }

      .base-switch-input:focus + .base-switch-slider {
        box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
      }

      .base-switch--disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .base-switch--disabled .base-switch-slider {
        background-color: #ccc;
      }

      .base-switch-label {
        font-size: 1rem;
        color: #646cff;
      }

      .base-switch-input:disabled + .base-switch-slider {
        background-color: #ccc;
      }
    `
  }

  mounted() {
    this.#input = this.shadowRoot.querySelector(".base-switch-input")
    this.#input.addEventListener("change", () => {
      this.checked = this.#input.checked
      this.dispatchEvent(new Event("change"))
    })
  }

  updated(property, oldValue, newValue) {
    if (property === "checked") {
      this.#input.checked = newValue
    }
  }
}

customElements.define("base-switch", Switch);
