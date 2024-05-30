import { useState } from 'react'
import { useResetChild } from '../hooks/use-reset-child'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

const ResetChild = () => {
  const [resetKey, reset] = useResetChild()

  return (
    <>
      <p data-testid="reset_key">{resetKey}</p>
      <ChildComponent key={resetKey} />
      <button data-testid="reset" onClick={reset}>
        reset child component
      </button>
    </>
  )
}

const ResetChildren = ({ prefix = false }: { prefix?: boolean }) => {
  const [resetKeyOne, resetOne] = useResetChild(prefix ? 'foo' : undefined)
  const [resetKeyTwo, resetTwo] = useResetChild(prefix ? 'bar' : undefined)

  const reset = () => {
    resetOne()
    resetTwo()
  }

  return (
    <>
      <p data-testid="reset_key_1">{resetKeyOne}</p>
      <p data-testid="reset_key_2">{resetKeyTwo}</p>
      <ChildComponent key={resetKeyOne} />
      <ChildComponent key={resetKeyTwo} />
      <button data-testid="reset" onClick={reset}>
        reset children
      </button>
    </>
  )
}

const ChildComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <button data-testid="count_1" onClick={() => setCount((c) => c + 1)}>
        {count}
      </button>
      <SubChildComponent />
    </>
  )
}

const SubChildComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <button data-testid="count_2" onClick={() => setCount((c) => c + 1)}>
        {count}
      </button>
    </>
  )
}

describe('useResetChild', () => {
  it('should reset child component when reset function is called', async () => {
    render(<ResetChild />)

    const resetKey = screen.getByTestId<HTMLParagraphElement>('reset_key')
    const reset = screen.getByTestId<HTMLButtonElement>('reset')
    let buttonChild = screen.getByTestId<HTMLButtonElement>('count_1')
    let buttonSubChild = screen.getByTestId<HTMLButtonElement>('count_2')

    const initialResetKey = resetKey.textContent

    await userEvent.click(buttonChild)
    await userEvent.click(buttonChild)
    await userEvent.click(buttonSubChild)

    expect(buttonChild).toHaveTextContent('2')
    expect(buttonSubChild).toHaveTextContent('1')

    await userEvent.click(reset)

    const newResetKey = resetKey.textContent

    buttonChild = screen.getByTestId<HTMLButtonElement>('count_1')
    buttonSubChild = screen.getByTestId<HTMLButtonElement>('count_2')

    expect(buttonChild).toHaveTextContent('0')
    expect(buttonSubChild).toHaveTextContent('0')

    expect(initialResetKey).not.toBe(newResetKey)
  })

  it('should generate 2 identical reset keys when 2 useResetKey are used without prefix', async () => {
    render(<ResetChildren />)

    const resetKeyOne = screen.getByTestId<HTMLParagraphElement>('reset_key_1').textContent
    const resetKeyTwo = screen.getByTestId<HTMLParagraphElement>('reset_key_2').textContent

    expect(resetKeyOne).toBe(resetKeyTwo)

    await userEvent.click(screen.getByTestId('reset'))

    const newResetKeyOne = screen.getByTestId<HTMLParagraphElement>('reset_key_1').textContent
    const newResetKeyTwo = screen.getByTestId<HTMLParagraphElement>('reset_key_2').textContent

    expect(newResetKeyOne).not.toBe(resetKeyOne)
    expect(newResetKeyOne).toBe(newResetKeyTwo)
  })

  it('should generate 2 different reset keys when 2 useResetKey are used with prefix', async () => {
    render(<ResetChildren prefix />)

    const resetKeyOne = screen.getByTestId<HTMLParagraphElement>('reset_key_1').textContent
    const resetKeyTwo = screen.getByTestId<HTMLParagraphElement>('reset_key_2').textContent

    expect(resetKeyOne).not.toBe(resetKeyTwo)

    await userEvent.click(screen.getByTestId('reset'))

    const newResetKeyOne = screen.getByTestId<HTMLParagraphElement>('reset_key_1').textContent
    const newResetKeyTwo = screen.getByTestId<HTMLParagraphElement>('reset_key_2').textContent

    expect(newResetKeyOne).not.toBe(resetKeyOne)
    expect(newResetKeyOne).not.toBe(newResetKeyTwo)
  })
})
