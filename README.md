# ✨ React Hooks

A collection of hooks for better state management.

Advantages of using this library:

- Super tiny bundle size (supports tree shaking).
- Very detailed documentation along with previews and live demos.
- Highly performant (no unnecessary rerenders at all).
- Well tested.
- Super flexible (providing options whenever possible).

## 📕 Table of Content

- [Installation](#%EF%B8%8F-installation)
- [Hooks](#-hooks)
- [Usage](#-usage)
- [Contributions](#-contributions)
- [License](#%EF%B8%8F-license)

## ⬇️ Installation

```bash
npm i @mhmdjawhar/react-hooks
```

## 🪝 Hooks

- [useDisclosure](#usedisclosure)
- [useClickOutside](#useclickoutside)
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

**Examples**

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

**Parameters**

| Name         | Type      | Description                                             |
| ------------ | --------- | ------------------------------------------------------- |
| initialValue | `boolean` | (Optional) Initial `opened` state. Defaults to `false`. |

**Return Value**

Returns an array with the following elements:

| Name         | Type      | Description                                  |
| ------------ | --------- | -------------------------------------------- |
| `[0]`        | `boolean` | The current state of the disclosure.         |
| `[1].open`   | Function  | A function that sets the state to `true`.    |
| `[2].close`  | Function  | A function that sets the state to `false`.   |
| `[3].toggle` | Function  | A function that toggles the `boolean` state. |

### useClickOutside

Detects `click` or an optional given event outside of a given element or list of elements.

**Examples**

```tsx
import { useClickOutside } from '@mhmdjawhar/react-hooks'
import { useCallback, useState } from 'react'

export const ClickOutsideExample: React.FC = () => {
  const [count, setCount] = useState(0)

  const handler = useCallback(() => {
    setCount((c) => c + 1)
    console.log('outside was clicked')
  }, [])

  const ref = useClickOutside<HTMLDivElement>(handler)

  return (
    <>
      <div ref={ref} style={{ width: '400px', height: '400px', backgroundColor: 'black' }} />
      <p>Click outside count: {count}</p>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-click-outside-example?file=src%2FDemo.tsx)

You can also specify multiple nodes. The nodes in the list won't trigger the outside `click` event.

```tsx
import { useClickOutside } from '@mhmdjawhar/react-hooks'
import { useCallback, useRef, useState } from 'react'

export const ClickOutsideMultipleExample: React.FC = () => {
  const [count, setCount] = useState(0)

  const redBoxRef = useRef<HTMLDivElement>(null)
  const blackBoxRef = useRef<HTMLDivElement>(null)

  const handler = useCallback(() => {
    setCount((c) => c + 1)
    console.log('outside was clicked')
  }, [])

  useClickOutside(handler, [redBoxRef, blackBoxRef])

  return (
    <>
      {/* first element */}
      <div ref={redBoxRef} style={{ width: '400px', height: '400px', backgroundColor: 'red' }} />
      {/* second element */}
      <div ref={blackBoxRef} style={{ width: '400px', height: '400px', backgroundColor: 'black' }} />
      <p>Click outside count: {count}</p>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-click-outside-example-2?file=src%2FDemo.tsx)

You can also specify another event to replace the default `click` event.

```tsx
import { useClickOutside } from '@mhmdjawhar/react-hooks'
import { useCallback, useState } from 'react'

export const OutsideEventExample: React.FC = () => {
  const [count, setCount] = useState(0)

  const handler = useCallback(() => {
    setCount((prevCount) => prevCount + 1)
    console.log('outside was clicked')
  }, [])

  const ref = useClickOutside<HTMLDivElement>(handler, null, 'mousedown')

  return (
    <>
      <div ref={ref} style={{ width: '400px', height: '400px', backgroundColor: 'black' }} />
      <p>Click outside count: {count}</p>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-click-outside-example-3?file=src%2FDemo.tsx)

**Parameters**

| Name    | Type                     | Description                                                                         |
| ------- | ------------------------ | ----------------------------------------------------------------------------------- |
| handler | Function                 | A `callback` function triggered when outside click is detected.                     |
| refs    | `RefObject[]`            | (Optional) List of `RefObject`s for elements that should not trigger outside click. |
| event   | `keyof DocumentEventMap` | (Optional) Event to replace the default `click` event.                              |

**Return Value**

| Name | Type        | Description                                                   |
| ---- | ----------- | ------------------------------------------------------------- |
| ref  | `RefObject` | Must be passed to the element to detect clicks outside of it. |

## 🤝 Contributions

Any Contributions are welcome!!😄

Feel free to suggest hooks that you think are useful and worth adding to this collection, and work on them if you're interested!

## ⚖️ License

This library is licensed under the MIT license.
