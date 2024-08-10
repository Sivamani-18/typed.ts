# React Typing Effect

[![npm version](https://img.shields.io/npm/v/react-typed.ts.svg?style=flat)](https://www.npmjs.com/package/react-typed.ts)
[![npm downloads](https://img.shields.io/npm/dt/react-typed.ts.svg?style=flat)](https://www.npmjs.com/package/react-typed.ts)



A lightweight React component for creating a typing effect similar to a typewriter, without any external dependencies.

![typed](https://github.com/user-attachments/assets/7baaaaae-2f23-4091-91bd-a3d2919abde4)


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
## Usage

### Props

| Prop Name             | Type                           | Default                  | Description                                                                 |
|-----------------------|--------------------------------|--------------------------|-----------------------------------------------------------------------------|
| `strings`             | `string[]`                     | `['Hello, World!', 'This is a typing effect.', 'React is awesome!', 'Enjoy coding!']` | An array of strings to be typed in sequence.                               |
| `stringsElement`      | `string \| null`               | `null`                   | ID or instance of an HTML element containing string children.              |
| `typeSpeed`           | `number`                       | `50`                     | Speed of typing in milliseconds.                                           |
| `startDelay`          | `number`                       | `0`                      | Delay before typing starts in milliseconds.                                |
| `backSpeed`           | `number`                       | `30`                     | Speed of backspacing in milliseconds.                                      |
| `smartBackspace`      | `boolean`                      | `true`                   | Only backspace what doesn't match the previous string.                     |
| `shuffle`             | `boolean`                      | `false`                  | Shuffle the strings randomly.                                              |
| `backDelay`           | `number`                       | `700`                    | Time before backspacing in milliseconds.                                   |
| `fadeOut`             | `boolean`                      | `false`                  | Fade out instead of backspace.                                             |
| `fadeOutClass`        | `string`                       | `'typed-fade-out'`       | CSS class for fade animation.                                              |
| `fadeOutDelay`        | `number`                       | `500`                    | Fade out delay in milliseconds.                                            |
| `loop`                | `boolean`                      | `false`                  | Whether to loop the strings.                                               |
| `loopCount`           | `number`                       | `Infinity`               | Number of loops before stopping.                                           |
| `showCursor`          | `boolean`                      | `true`                   | Show the typing cursor.                                                    |
| `cursorChar`          | `string`                       | `'|'`                    | Character for the cursor.                                                  |
| `autoInsertCss`       | `boolean`                      | `true`                   | Insert CSS for cursor and fadeOut into HTML.                               |
| `attr`                | `string \| null`               | `null`                   | Attribute to type into (e.g., `input` placeholder, `value`, or just HTML text). |
| `bindInputFocusEvents`| `boolean`                      | `false`                  | Bind to focus and blur if the element is a text input.                     |
| `contentType`         | `'html' \| 'null'`             | `'html'`                 | Type of content to display: HTML or plaintext.                             |
| `onBegin`             | `(self: any) => void`          | `() => {}`               | Callback before typing begins.                                             |
| `onComplete`          | `(self: any) => void`          | `() => {}`               | Callback when typing is complete.                                          |
| `preStringTyped`      | `(arrayPos: number, self: any) => void` | `() => {}`      | Callback before each string is typed.                                      |
| `onStringTyped`       | `(arrayPos: number, self: any) => void` | `() => {}`      | Callback after each string is typed.                                       |
| `onLastStringBackspaced` | `(self: any) => void`       | `() => {}`               | Callback during looping, after the last string is backspaced.              |
| `onTypingPaused`      | `(arrayPos: number, self: any) => void` | `() => {}`      | Callback when typing is paused.                                            |
| `onTypingResumed`     | `(arrayPos: number, self: any) => void` | `() => {}`      | Callback when typing is resumed after being paused.                        |
| `onReset`             | `(self: any) => void`          | `() => {}`               | Callback after the typing effect is reset.                                 |
| `onStop`              | `(arrayPos: number, self: any) => void` | `() => {}`      | Callback after the typing effect is stopped.                               |
| `onStart`             | `(arrayPos: number, self: any) => void` | `() => {}`      | Callback after the typing effect is started.                               |
| `onDestroy`           | `(self: any) => void`          | `() => {}`               | Callback after the typing effect is destroyed.                             |

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

### Here are some different effects you can achieve:

### 1. **Different Typing Speed:**

```tsx
<TypingEffect
  strings={["Fast typing", "Slow typing"]}
  typeSpeed={100}   // Typing speed
  backSpeed={50}    // Backspacing speed
  loop={true}
/>
```

### 2. **Fade Out Effect:**

```tsx
<TypingEffect
  strings={["This will fade out", "And then this text will appear"]}
  typeSpeed={50}
  backSpeed={25}
  fadeOut={true}
  loop={true}
/>
```

### 3. **Show Cursor or Hide Cursor:**

```tsx
<TypingEffect
  strings={["No cursor", "Cursor visible"]}
  typeSpeed={50}
  showCursor={false}   // Hides the cursor
  loop={true}
/>
```

### 4. **Smart Backspacing:**

```tsx
<TypingEffect
  strings={["Backspacing only mismatched text", "Smart backspacing at work"]}
  typeSpeed={50}
  backSpeed={50}
  smartBackspace={true}  // Only backspace the part of the string that doesn't match
  loop={true}
/>
```

### 5. **Shuffle Strings:**

```tsx
<TypingEffect
  strings={["Shuffled string 1", "Shuffled string 2", "Shuffled string 3"]}
  typeSpeed={50}
  shuffle={true}  // Randomize the order of strings
  loop={true}
/>
```

### 6. **Custom Cursor Character:**

```tsx
<TypingEffect
  strings={["Custom cursor character"]}
  typeSpeed={50}
  cursorChar={'_'}  // Change the cursor character
  loop={true}
/>
```

### 7. **Typing Text with a Delay:**

```tsx
<TypingEffect
  strings={["Delayed start typing"]}
  typeSpeed={50}
  startDelay={1000}   // Delay before typing starts
  backDelay={1000}    // Delay before backspacing starts
  loop={true}
/>
```

### Example Combining Multiple Effects:

```tsx
<TypingEffect
  strings={["Typing fast!", "Then typing slow...", "And finally fading out!"]}
  typeSpeed={100}
  backSpeed={50}
  startDelay={500}
  backDelay={700}
  fadeOut={true}
  smartBackspace={true}
  shuffle={true}
  cursorChar={'|'}
  loop={true}
/>
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## Author

Sivamani-18 - [GitHub Profile](https://github.com/Sivamani-18)
