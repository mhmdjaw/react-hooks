import { render, renderHook, screen } from '@testing-library/react'
import { useWindowEvent } from '../hooks/use-window-event'
import userEvent from '@testing-library/user-event'

describe('useWindowEvent', () => {
  it('should call listener when event is triggered', async () => {
    const listener = jest.fn()
    renderHook(() => useWindowEvent('keydown', listener))

    expect(listener).not.toHaveBeenCalled()

    render(<div data-testid="target" />)

    const target = screen.getByTestId('target')
    await userEvent.type(target, '{enter}')

    expect(listener).toHaveBeenCalled()
  })
})
