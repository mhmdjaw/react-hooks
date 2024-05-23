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
- [useWindowScroll](#useWindowScroll)
- [useSystemColorScheme](#useSystemColorScheme)
- [useWindowEvent](#useWindowEvent)
- [useResetChild](#useResetChild)
- [useTimeout](#useTimeout)
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
| depsList | `DependencyList` | (Optional) List of dependencies used in the `handler`. Pass state values that the `handler` might depend on.             |
| options  | `ResizeObserver` | (Optional) `ResizeObserver` options.                                                                                     |

**Return Value**

| Name | Type        | Description                                                 |
| ---- | ----------- | ----------------------------------------------------------- |
| ref  | `RefObject` | Must be passed to the element whose size is being observed. |

## useWindowScroll

Returns current `window` scroll position and a function to scroll to a given position.

**Examples**

```tsx
import { useWindowScroll } from '@mhmdjawhar/react-hooks'

export const WindowScrollExample: React.FC = () => {
  const [position, scrollTo] = useWindowScroll()

  return (
    <>
      <p>
        Scroll position - X: {position.x}, Y: {position.y}
      </p>
      <button onClick={() => scrollTo({ y: 0 })}>scroll to top</button>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-window-scroll-example?file=src%2FDemo.tsx)

```tsx
import { useWindowScroll } from '@mhmdjawhar/react-hooks'
import { useState } from 'react'

export const WindowScrollExample: React.FC = () => {
  const [subscription, setSubscription] = useState(true)

  const [position, scrollTo] = useWindowScroll(subscription)

  return (
    <>
      <p>
        Scroll position - width: {position.x}, height: {position.y}
      </p>
      <button onClick={() => scrollTo({ y: 0 })}>scroll to top</button>
      <button onClick={() => setSubscription((prev) => !prev)}>toggle subscription</button>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-window-scroll-example-2?file=src%2FDemo.tsx)

**Parameters**

| Name         | Type      | Description                                                                         |
| ------------ | --------- | ----------------------------------------------------------------------------------- |
| isSubscribed | `boolean` | (Optional) Activate or cancel subscription. Set to `false` to stop getting updates. |

**Return Value**

Returns an array with the following elements:

| Name    | Type     | Description                                        |
| ------- | -------- | -------------------------------------------------- |
| `[0].x` | `number` | Scroll position X.                                 |
| `[0].y` | `number` | Scroll position Y.                                 |
| `[1]`   | Function | A function to scroll smoothly to a given position. |

## useSystemColorScheme

Returns current `system` color scheme. Updates on change.

**Examples**

```tsx
import { useSystemColorScheme } from '@mhmdjawhar/react-hooks'

export const SystemColorSchemeExample: React.FC = () => {
  const colorScheme = useSystemColorScheme()

  return <p>{colorScheme}</p>
}
```

**Return Value**

| Name        | Type     | Description        |
| ----------- | -------- | ------------------ |
| colorScheme | `string` | `light` or `dark`. |

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-system-color-scheme-example?file=src%2FDemo.tsx)

## useWindowEvent

Adds an `event` listener to `window` object when the component mounts and removes it when it unmounts.

**Examples**

```tsx
import { useWindowEvent } from '@mhmdjawhar/react-hooks'
import { useCallback, useState } from 'react'

export const WindowEventExample: React.FC = () => {
  const [key, setKey] = useState('nothing')

  const windowListener = useCallback((event: KeyboardEvent) => {
    setKey(event.key)
  }, [])

  useWindowEvent('keydown', windowListener)

  return <p>{key} was pressed</p>
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-window-event-example?file=src%2FDemo.tsx)

**Parameters**

| Name     | Type                                 | Description                 |
| -------- | ------------------------------------ | --------------------------- |
| type     | `keyof WindowEventMap`               | Type of `event`.            |
| listener | Function                             | `event` listener.           |
| options  | `boolean \| AddEventListenerOptions` | (Optional) `event` options. |

## useResetChild

Resets the state of a child component along with all its children. Note that it does not reset the state of the current component.

**Examples**

```tsx
import { useResetChild } from '@mhmdjawhar/react-hooks'
import { useState } from 'react'

export const ResetChildExample = () => {
  const [resetKey, reset] = useResetChild()

  return (
    <>
      <ChildComponent key={resetKey} />
      <button onClick={reset}>reset child component</button>
    </>
  )
}

const ChildComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Child Component</p>
      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
      <SubChildComponent />
    </div>
  )
}

const SubChildComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Subchild Component</p>
      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
    </div>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-reset-child-example?file=src%2FDemo.tsx)

**Return Value**

Returns an array with the following elements:

| Name  | Type     | Description                                             |
| ----- | -------- | ------------------------------------------------------- |
| `[0]` | `string` | Reset value that must be passed to the component `key`. |
| `[1]` | Function | A reset function to trigger the reset.                  |

## useTimeout

Manages `timeout` and handles starting and clearing it.

**Examples**

```tsx
import { useTimeout } from '@mhmdjawhar/react-hooks'
import { useState } from 'react'

export const TimeoutExample: React.FC = () => {
  const [count, setCount] = useState(0)
  const [start, clear] = useTimeout(() => setCount((c) => c + 1), 1000)

  return (
    <>
      <button onClick={start}>Start Timeout</button>
      <button onClick={clear}>Clear Timeout</button>
      <p>count: {count}</p>
    </>
  )
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-timeout-example?file=src%2FDemo.tsx)

**Parameters**

| Name       | Type                   | Description                                                                                                                                        |
| ---------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback   | Function               | A function that will be called after the timer elapses.                                                                                            |
| delay      | `number`               | `timeout` delay (`ms`) after which the `callback` function will be executed.                                                                       |
| autoInvoke | `boolean`              | (Optional) Determines whether the `timeout` should start when the component mounts. `false` by default.                                            |
| depsList   | `React.DependencyList` | (Optional) List of dependencies used in the `callback` function. Pass state values that the `callback` function might depend on. Empty by default. |

**Return Value**

Returns an array with the following elements:

| Name  | Type     | Description             |
| ----- | -------- | ----------------------- |
| `[0]` | Function | Start timeout function. |
| `[1]` | Function | Clear timeout function. |

## 💎 Contributions

Any Contributions are welcome!!😄

Feel free to suggest hooks that you think are useful and worth adding to this collection, and work on them if you're interested!

## ⚖️ License

This library is licensed under the MIT license.
