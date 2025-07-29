import { BaseElement } from "../base-element.js"

/**
 * A customizable alert component for displaying notifications and messages.
 */
class Alert extends BaseElement {

  #closeButton = null

  properties = {
    type: {
      value: "info",
      type: String,
      validator: (value) => ["info", "success", "warning", "error"].includes(value)
    },
    message: {
      value: "",
      type: String,
      required: true
    },
    closable: {
      value: true,
      type: Boolean
    },
    showIcon: {
      value: true,
      type: Boolean
    },
    fixed: {
      value: true,
      type: Boolean
    }
  }

  render() {
    const { type, message, closable, showIcon } = this
    const classes = [
      "base-alert",
      `base-alert--${type}`
    ].filter(Boolean).join(" ")

    const icon = showIcon ? /* html */`
      <span class="base-alert-icon">
        ${this.#getIcon(type)}
      </span>
    ` : ``

    const closeButton = closable ? /* html */`
      <button type="button" class="base-alert-close" id="close-button">
        <span class="base-alert-close-icon">×</span>
      </button>
    ` : ``

    return /* html */`
      <div class="${classes}">
        ${icon}
        <div class="base-alert-content">
          ${message}
        </div>
        ${closeButton}
      </div>
    `
  }

  styles() {
    return /* css */`
      .base-alert {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        gap: 0.75rem;
      }

      .base-alert--info {
        background-color: #e6f4ff;
        color: #1890ff;
      }

      .base-alert--success {
        background-color: #f6ffed;
        color: #52c41a;
      }

      .base-alert--warning {
        background-color: #fffbe6;
        color: #faad14;
      }

      .base-alert--error {
        background-color: #fff2f0;
        color: #ff4d4f;
      }

      .base-alert-icon {
        font-size: 1.25rem;
      }

      .base-alert-content {
        flex: 1;
      }

      .base-alert-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        opacity: 0.7;
      }

      .base-alert-close:hover {
        opacity: 1;
      }

      .base-alert-close-icon {
        font-size: 1.25rem;
      }
    `
  }

  #getIcon(type) {
    const icons = {
      info: "ℹ️",
      success: "✅",
      warning: "⚠️",
      error: "❌"
    }
    return icons[type]
  }

  close() {
    this.remove()
  }

  mounted() {
    this.#closeButton = this.shadowRoot.getElementById("close-button")
    this.#closeButton.addEventListener("click", () => this.close())
  }
}

customElements.define("base-alert", Alert);
