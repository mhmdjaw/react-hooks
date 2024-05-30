import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useClickOutside } from '../hooks/use-click-outside'
import { useRef } from 'react'

interface Props {
  handler: () => void
  event?: keyof DocumentEventMap
}

const SingleElement: React.FC<Props> = ({ handler, event }) => {
  const ref = useClickOutside<HTMLDivElement>(handler, null, event)

  return (
    <>
      <div data-testid="target" ref={ref} />
      <div data-testid="outside" />
    </>
  )
}

const MultipleElements: React.FC<Props> = ({ handler }) => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  useClickOutside(handler, [ref1, ref2])

  return (
    <>
      <div data-testid="target_1" ref={ref1} />
      <div data-testid="target_2" ref={ref2} />
      <div data-testid="outside" />
    </>
  )
}

describe('useClickOutside', () => {
  it('should call the handler when it detects click outside target element', async () => {
    const handler = jest.fn()

    render(<SingleElement handler={handler} />)

    const element = screen.getByTestId('target')
    const outsideElement = screen.getByTestId('outside')

    await userEvent.click(element)
    expect(handler).not.toHaveBeenCalled()

    await userEvent.click(outsideElement)
    expect(handler).toHaveBeenCalled()
  })

  it('should call the handler when given event is triggered outside element', async () => {
    const handler = jest.fn()

    const { rerender } = render(<SingleElement handler={handler} event="mousedown" />)

    const element = screen.getByTestId('target')
    const outsideElement = screen.getByTestId('outside')

    // press left click without releasing
    await userEvent.pointer({ keys: '[MouseLeft>]', target: element })
    expect(handler).not.toHaveBeenCalled()

    // press left click without releasing
    await userEvent.pointer({ keys: '[MouseLeft>]', target: outsideElement })
    expect(handler).toHaveBeenCalled()

    // try with mouse up
    rerender(<SingleElement handler={handler} event="mouseup" />)

    const user = userEvent.setup()

    // press left click without releasing
    await user.pointer({ keys: '[MouseLeft>]', target: outsideElement })
    expect(handler).toHaveBeenCalledTimes(1)

    // release left click
    await user.pointer({ keys: '[/MouseLeft]', target: outsideElement })
    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('should call the handler when it detects click outside target elements', async () => {
    const handler = jest.fn()

    render(<MultipleElements handler={handler} />)

    const element1 = screen.getByTestId('target_1')
    const element2 = screen.getByTestId('target_2')
    const outsideElement = screen.getByTestId('outside')

    await userEvent.click(element1)
    expect(handler).not.toHaveBeenCalled()

    await userEvent.click(element2)
    expect(handler).not.toHaveBeenCalled()

    await userEvent.click(outsideElement)
    expect(handler).toHaveBeenCalled()
  })
})
