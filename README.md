# React Typing Effect

[![npm version](https://badge.fury.io/js/react-typed.ts.svg)](https://badge.fury.io/js/react-typed.ts)

A lightweight React component for creating a typing effect similar to a typewriter, without any external dependencies.

## Features

- **Customizable Typing Speed**: Control how fast the text is typed and deleted.
- **Looping**: Automatically loop through the provided strings.
- **Custom Cursor**: Customize the cursor character and choose whether to display it.
- **Lightweight**: Minimal dependencies, easy to integrate into any React project.


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

### 1. Import and Use the `TypingEffect` Component

First, import the `TypingEffect` component and use it in your React project.

```tsx
import React from 'react';
import TypingEffect from 'react-typed.ts';

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <TypingEffect
        strings={[
          'Hello, World!',
          'This is a typing effect.',
          'React is awesome!',
          'Enjoy coding!',
        ]}
        typeSpeed={70}
        backSpeed={50}
        loop={true}
      />
    </div>
  );
};

export default App;
```

### 2. Customization Options

The `TypingEffect` component accepts several props to customize the typing effect:

| Prop Name   | Type       | Default | Description                                                  |
|-------------|------------|---------|--------------------------------------------------------------|
| `strings`   | `string[]` | `[]`    | An array of strings to be typed in sequence.                 |
| `typeSpeed` | `number`   | `50`    | Speed of typing in milliseconds.                             |
| `backSpeed` | `number`   | `30`    | Speed of backspacing in milliseconds.                        |
| `loop`      | `boolean`  | `true`  | Whether to loop the strings.                                 |
| `cursorChar`| `string`   | `|`     | Character for the cursor.                                    |
| `showCursor`| `boolean`  | `true`  | Whether to show the cursor.                                  |

### 3. Advanced Usage

You can use the component multiple times within your application, passing different sets of strings or customization options to each instance.

```tsx
<TypingEffect
  strings={['Typing effect example 1', 'React components are great!']}
  typeSpeed={60}
  backSpeed={40}
  loop={true}
/>

<TypingEffect
  strings={['Another example', 'With a different cursor']}
  typeSpeed={80}
  backSpeed={60}
  cursorChar="_"
/>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## Author

Sivamani-18 - [GitHub Profile](https://github.com/Sivamani-18)







