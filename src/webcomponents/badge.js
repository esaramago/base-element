import { BaseElement } from "../base-element.js"

/**
 * A badge component for displaying status, counts, or labels.
 */
class Badge extends BaseElement {
  properties = {
    text: {
      value: "",
      type: String,
      required: true
    },
    type: {
      value: "default",
      type: String,
      validator: (value) => ["default", "primary", "success", "warning", "error"].includes(value)
    },
    dot: {
      value: false,
      type: Boolean
    },
    count: {
      value: null,
      type: Number
    },
    showZero: {
      value: false,
      type: Boolean
    }
  }

  render() {
    const { text, type, dot, count } = this
    const classes = [
      "base-badge",
      `base-badge--${type}`,
      dot ? "base-badge--dot" : "",
      count ? "base-badge--count" : ""
    ].filter(Boolean).join(" ")

    const badgeContent = dot ? "•" : count ? count : text

    return /* html */`
      <span class="${classes}">
        ${badgeContent}
      </span>
    `
  }

  styles() {
    return /* css */`
      .base-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
        min-width: 1rem;
        height: 1rem;
        line-height: 1;
        text-align: center;
      }

      .base-badge--default {
        background-color: #646cff;
        color: white;
      }

      .base-badge--primary {
        background-color: #646cff;
        color: white;
      }

      .base-badge--success {
        background-color: #52c41a;
        color: white;
      }

      .base-badge--warning {
        background-color: #faad14;
        color: white;
      }

      .base-badge--error {
        background-color: #ff4d4f;
        color: white;
      }

      .base-badge--dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        padding: 0;
      }

      .base-badge--count {
        min-width: auto;
      }

      .base-badge--dot.base-badge--default {
        background-color: #646cff;
      }

      .base-badge--dot.base-badge--primary {
        background-color: #646cff;
      }

      .base-badge--dot.base-badge--success {
        background-color: #52c41a;
      }

      .base-badge--dot.base-badge--warning {
        background-color: #faad14;
      }

      .base-badge--dot.base-badge--error {
        background-color: #ff4d4f;
      }
    `
  }
}

customElements.define("base-badge", Badge);
