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
- [useViewportSize](#useViewportSize)
- [useResizeObserver](#useResizeObserver)
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

### useViewportSize

Returns current viewport's `width` and `height`. It updates on `resize` and `orientationchange`.

**Examples**

```tsx
import { useViewportSize } from '@mhmdjawhar/react-hooks'

export const ViewportSizeExample: React.FC = () => {
  const { width, height } = useViewportSize()

  return (
    <p>
      width: {width}, height: {height}
    </p>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-viewport-size-example?file=src%2FDemo.tsx)

You can also pass an optional `boolean` parameter to either activate or cancel subscription. Set to `false` to stop getting updates.

```tsx
import { useViewportSize } from '@mhmdjawhar/react-hooks'
import { useState } from 'react'

export const ViewportSizeSubscriptionExample: React.FC = () => {
  const [subscription, setSubscription] = useState(true)

  const { width, height } = useViewportSize(subscription)

  return (
    <>
      <p>
        width: {width}, height: {height}
      </p>
      <button onClick={() => setSubscription((sub) => !sub)}>toggle subscription</button>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-viewport-size-example-2?file=src%2FDemo.tsx)

**Parameters**

| Name         | Type      | Description                                                                         |
| ------------ | --------- | ----------------------------------------------------------------------------------- |
| isSubscribed | `boolean` | (Optional) Activate or cancel subscription. Set to `false` to stop getting updates. |

**Return Value**

Returns an object with the following properties:

| Name   | Type     | Description          |
| ------ | -------- | -------------------- |
| width  | `number` | The viewport width.  |
| height | `number` | The viewport height. |

## useResizeObserver

Detects changes to the dimensions of an `Element` with `ResizeObserver`.

**Examples**

```tsx
import { useResizeObserver } from '@mhmdjawhar/react-hooks'
import { useState } from 'react'

export const ResizeObserverExample: React.FC = () => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  })

  const ref = useResizeObserver<HTMLTextAreaElement>((contentRect) => subscription && setRect(contentRect))

  return (
    <>
      <textarea ref={ref} style={{ width: '400px', height: '400px', position: 'relative' }} />
      <p>
        width: {rect.width}, height: {rect.height}
      </p>
      <p>
        x: {rect.x}, y: {rect.y}
      </p>
      <p>
        top: {rect.top}, left: {rect.left}, bottom: {rect.bottom}, right: {rect.right}
      </p>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-resize-observer-example?file=src%2FDemo.tsx)

You can also pass a list of dependencies used in the `callback` function.

```tsx
import { useResizeObserver } from '@mhmdjawhar/react-hooks'
import { useState } from 'react'

export const ResizeObserverExample: React.FC = () => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  })

  const [subscription, setSubscription] = useState(true)

  const ref = useResizeObserver<HTMLTextAreaElement>(
    (contentRect) => subscription && setRect(contentRect),
    [subscription]
  )

  return (
    <>
      <textarea ref={ref} style={{ width: '400px', height: '400px', position: 'relative' }} />
      <p>
        width: {rect.width}, height: {rect.height}
      </p>
      <p>
        x: {rect.x}, y: {rect.y}
      </p>
      <p>
        top: {rect.top}, left: {rect.left}, bottom: {rect.bottom}, right: {rect.right}
      </p>
      <button onClick={() => setSubscription((sub) => !sub)}>toggle subscription</button>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-resize-observer-example-2?file=src%2FDemo.tsx)

**Parameters**

| Name     | Type             | Description                                                                                                              |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| handler  | Function         | A function called when the size of the element observed changes. `contentRect` values are passed as an object parameter. |
| depsList | `DependencyList` | List of dependencies used in the `handler`. Pass state values that the `handler` might depend on.                        |
| options  | `ResizeObserver` | `ResizeObserver` options.                                                                                                |

**Return Value**

| Name | Type        | Description                                                 |
| ---- | ----------- | ----------------------------------------------------------- |
| ref  | `RefObject` | Must be passed to the element whose size is being observed. |

## 💎 Contributions

Any Contributions are welcome!!😄

Feel free to suggest hooks that you think are useful and worth adding to this collection, and work on them if you're interested!

## ⚖️ License

This library is licensed under the MIT license.
