# Base Element

A lightweight JavaScript class that extends `HTMLElement` and provides essential functionality for creating custom web components. Base Element offers property management, rendering, and lifecycle hooks, making it easy to create reusable web components without any dependencies.

## Features

- No dependencies
- No build tools required
- Lightweight (~2.5kb minified)
- Property management with validation
- Shadow DOM support
- Lifecycle hooks
- Built-in styling capabilities

## Installation

Base Element is a standalone JavaScript file that can be used in any project.

### Direct Download

Download [base-element.js](https://raw.githubusercontent.com/esaramago/base-element/main/src/base-element.js) from GitHub and import it in your project.

## Usage

```javascript
import { BaseElement } from "base-element";

class MyComponent extends BaseElement {
  properties = {
    // Define your component's properties
    myProperty: {
      value: "default",
      type: String,
      required: true,
      validator: (value) => value.length > 0
    }
  }

  styles() {
    return /* css */`
      // Your component's styles
    `;
  }

  render() {
    return /* html */`
      // Your component's template
    `;
  }

  mounted() {
    // Code that runs when the component is mounted
  }

  updated(property, oldValue, newValue) {
    // Code that runs when a property is updated
  }
}

customElements.define("my-component", MyComponent);
```

## Properties

Base Element provides a simple way to define properties for your components:

```javascript
properties = {
  myProperty: {
    value: "default",      // Default value
    type: String,         // Property type (String, Number, Boolean, etc.)
    required: false,      // Whether the property is required
    validator: (value) => value.length > 0  // Custom validation function
  }
}
```

## Development

To develop Base Element locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

Emanuel Saramago - [emanuelsaramago.com](https://emanuelsaramago.com)

## Acknowledgments
- Inspired by the love of web components
- Thanks to all contributors
