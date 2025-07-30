/**
 * Base class for custom Web Components that provides essential functionality
 * including property management, rendering, and lifecycle hooks.
 *
 * @extends HTMLElement
 */
export class BaseElement extends HTMLElement {
  /**
   * Creates an instance of BaseElement.
   * Attaches shadow DOM if the render method is implemented.
   */
  constructor() {
    super()

    if (this.render) {
      this.attachShadow({mode: 'open'})
    }
  }

  /**
   * Configuration object for custom properties.
   * Each property can have:
   * - value: Default value
   * - type: Property type (e.g., String, Number, Boolean)
   * - required: Whether the property is required
   * - validator: Custom validation function
   * @type {Object}
   */
  properties = {}

  /**
   * Indicates whether the element has been mounted in the DOM.
   * @type {boolean}
   */
  isMounted = false
  
  /**
   * Renders the component's content.
   * Must be overridden by subclasses.
   * @abstract
   * @returns {string} HTML string to be rendered in the shadow DOM
   */
  render() {}

  /**
   * Lifecycle method called when the element is mounted.
   * Override to add initialization code.
   */
  mounted() {}

  /**
   * Lifecycle method called when an property is updated.
   * Override to handle property changes.
   * 
   * @param {string} property - The name of the updated property
   * @param {any} oldValue - The previous value of the property
   * @param {any} newValue - The new value of the property
   */
  updated(property, oldValue, newValue) {}

  /**
   * Lifecycle method called when the element is connected to the DOM.
   * Initializes the component.
   */
  connectedCallback() {
    this.#init()
  }

  /* 
    * Private methods
    */
  /**
   * Initializes the component by setting up properties, rendering content,
   * and calling the mounted lifecycle method if implemented.
   */
  #init() {
    this.#setProps()

    if (this.render) {
      this.shadowRoot.innerHTML = this.render()
      this.#renderStyles()
    }

    this.isMounted = true

    if (this.mounted) {
      this.mounted()
    }
  }
  /**
   * Sets up the component's properties by defining getters and setters
   * that handle attribute synchronization and validation.
   */
  #setProps() {
    if (!this.properties) return

    const properties = {}

    Object.keys(this.properties).forEach((key) => {
    
      properties[key] = {
        enumerable: true,
        /**
         * Gets the current value of the property, either from the
         * corresponding attribute or the default value.
         */
        get() {
          const property = this.properties[key]
          const attribute = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
          const attributeValue = this.getAttribute(attribute)
          const defaultValue = property.value  

          const value = this.#validatePropValue({
            attribute,
            value: attributeValue === null || attributeValue === undefined ? defaultValue : attributeValue,
            type: property.type || property,
            required: property.required,
            validator: property.validator,
          })

          return value
        },
        /**
         * Sets the property value, validates it, and updates the
         * corresponding attribute.
         * @param {any} value - The new value to set
         */
        set(value) {
          const property = this.properties[key]
          const attribute = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

          const newValue = this.#validatePropValue({
            attribute,
            value,
            type: property.type || property,
            required: property.required,
            validator: property.validator,
          })

          // call updated lifecycle method if implemented
          if (this.updated) {
            this.updated(key, this[key], newValue)
          }

          // update attribute
          if (newValue === false) {
              this.removeAttribute(attribute)
          } else {
            if (newValue === true) {
                this.setAttribute(attribute, "")
            } else {
                this.setAttribute(attribute, newValue)
            }
          }

          return newValue
        },
      }

    })

    Object.defineProperties(this, properties)

  }

  /**
   * Renders CSS styles into the shadow DOM.
   * Adds a default display:block style to the host element and
   * any additional styles defined by the styles() method.
   */
  #renderStyles() {
    if (this.styles) {
      const styles = document.createElement('style')
      styles.textContent = `
        :host {
          display: block;
        }
        ${this.styles()}
      `
      this.shadowRoot.prepend(styles)
    }
  }

  /**
   * Validates and converts a property value based on its type.
   * 
   * @param {Object} prop - The property configuration
   * @param {string} prop.attribute - The attribute name
   * @param {any} prop.value - The value to validate
   * @param {Function} prop.type - The expected type (String, Number, Boolean, etc.)
   * @param {boolean} prop.required - Whether the property is required
   * @param {Function} prop.validator - Optional custom validation function
   * @returns {any} The validated and converted value
   * @throws {Error} If required property is missing or validation fails
   */
  #validatePropValue(prop) {
    var value = prop.value
  
    if (prop.type === String) {
      value = String(value)
    } else if (prop.type === Number) {
      value = Number(value)
    } else if (prop.type === Boolean) {
      if (value === "true" || value === true || value === "") {
        value = true
      } else {
        value = false
      }
    }

    if (prop.required && !value) {
      throw new Error(`Required property ${prop.attribute} is missing`)
    }

    if (prop.validator && !prop.validator(value)) {
      throw new Error(`Property ${prop.attribute} failed validation`)
    }
  
    return value
  }
  
  attributeChangedCallback(attribute, oldValue, newValue) {
    if (!this.isMounted) return

    // only call updated if the value has changed
    if (oldValue !== newValue) {
      // update property
      const propertyName = attribute.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
      this[propertyName] = newValue
      
      if (this.updated) {
        this.updated(propertyName, oldValue, this[propertyName])
      }
    }
  }  

}
