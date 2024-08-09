# React Typing Effect

[![npm version](https://badge.fury.io/js/react-typed.ts.svg)](https://badge.fury.io/js/react-typed.ts)

A lightweight React component for creating a typing effect similar to a typewriter, without any external dependencies.

## Features

- Fully customizable typing effect.
- No external dependencies.
- Written in TypeScript.
- Supports looping, custom speeds, and more.

## Installation

Install the package via npm:

```bash
npm install react-typed.ts
```

Or with Yarn:

```bash
yarn add react-typed.ts
```

## Usage

Here's a basic example of how to use the `Typed` component:

```tsx
import React from "react";
import Typed from "react-typed.ts";

const App = () => {
  return (
    <div>
      <Typed
        strings={["Hello, World!", "Welcome to my site!", "Enjoy your stay!"]}
        typeSpeed={100}
        backSpeed={50}
        loop
      />
    </div>
  );
};

export default App;
```


### Props

| Prop Name      | Type                 | Description                                         | Default Value |
|----------------|----------------------|-----------------------------------------------------|---------------|
| `strings`      | `string[]`            | An array of strings to be typed.                    | -             |
| `typeSpeed`    | `number`              | Speed of typing in milliseconds.                    | `50`          |
| `startDelay`   | `number`              | Delay before typing starts in milliseconds.         | `0`           |
| `backSpeed`    | `number`              | Speed of backspacing in milliseconds.               | `30`          |
| `loop`         | `boolean`             | Whether to loop the strings.                        | `true`        |
| `loopCount`    | `number`              | Number of loops.                                    | `Infinity`    |
| `className`    | `string`              | Optional class name for styling.                    | -             |
| `cursorChar`   | `string`              | Character for the cursor.                           | `|`           |


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## Author

Sivamani-18 - [GitHub Profile](https://github.com/Sivamani-18)


