# React Hooks

A collection of hooks for better state management.

Advantages of using this library:

- Super tiny bundle size (supports tree shaking).
- Very detailed documentation along with previews and live demos.
- Highly performant (no unnecessary rerenders at all).
- Well tested.
- Super flexible (providing options whenever possible).

## 📕 Table of Content

- [Installation](#⬇️-installation)
- [Hooks](#🪝-hooks)
- [Usage](#🔎-usage)
- [Contributions](#🤝-contributions)
- [License](#⚖️-license)

## ⬇️ Installation

```bash
npm i @mhmdjawhar/react-hooks
```

## 🪝 Hooks

- [useDisclosure](#usedisclosure)
- useClickOutside
- useViewportSize
- useResizeObserver
- useWindowScroll
- useSystemColorScheme
- useWindowEvent
- useResetChild
- useTimeout
- useInterval
- useAnimationFrame

## 🔎 Usage

### useDisclosure

Used to manage `boolean` state and controlled components.

#### Examples

```tsx
import { useDisclosure } from '@mhmdjawhar/react-hooks'

export const Demo = () => {
  const [opened, { close, open, toggle }] = useDisclosure()

  return (
    <>
      <button onClick={open}>open</button>&emsp;&emsp;
      <button onClick={close}>close</button>&emsp;&emsp;
      <button onClick={toggle}>toggle</button>
      <p>{opened ? 'opened' : 'closed'}</p>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-disclosure-example?file=src%2FDemo.tsx)

#### API Reference

**Parameters:**

| Name         | Type      | Description                                  |
| ------------ | --------- | -------------------------------------------- |
| initialValue | `boolean` | Initial `opened` state. Defaults to `false`. |

**Return value:**

Returns an array with the following elements:

| Name         | Type      | Description                                  |
| ------------ | --------- | -------------------------------------------- |
| `[0]`        | `boolean` | The current state of the disclosure.         |
| `[1].open`   | Function  | A function that sets the state to `true`.    |
| `[2].close`  | Function  | A function that sets the state to `false`.   |
| `[3].toggle` | Function  | A function that toggles the `boolean` state. |

## 🤝 Contributions

Any Contributions are welcome!!😄

Feel free to suggest hooks that you think are useful and worth adding to this collection, and work on them if you're interested!

## ⚖️ License

This library is licensed under the MIT license.
