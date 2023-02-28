import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent  from '@testing-library/user-event'
import App from './App'

  describe('<App />', () => {
    test('App component renders', () => {
      const wrapper = render(<App />)
      expect(wrapper).toBeTruthy()
    })

    test('Testing input with correct input', async () => {
        render(<App />)
        const user = userEvent.setup()

        const input = screen.getByTestId('add-word-input');
        fireEvent.change(input, {target: {value: 'IV'}})

        const spyAnchorTag = vi.spyOn(user, 'click') 
        await user.click(screen.getByText('Calculate from roman to normal'))

        const p = screen.getByTestId('answer')
        expect(p?.textContent).toBe('4')
      })

      test('Testing input with too many same character input', async () => {
        render(<App />)
        const user = userEvent.setup()

        const input = screen.getByTestId('add-word-input');
        fireEvent.change(input, {target: {value: 'IIII'}})

        const spyAnchorTag = vi.spyOn(user, 'click') 
        await user.click(screen.getByText('Calculate from roman to normal'))

        const p = screen.getByTestId('answer')
        expect(p?.textContent).toBe('')

        const h2 = screen.getByTestId('message')
        expect(h2?.textContent).toBe('Your input IIII contains too many characters in a row')
      })

      test('Testing input with too many D, L, V character input', async () => {
        render(<App />)
        const user = userEvent.setup()

        const input = screen.getByTestId('add-word-input');
        fireEvent.change(input, {target: {value: 'IVV'}})

        const spyAnchorTag = vi.spyOn(user, 'click') 
        await user.click(screen.getByText('Calculate from roman to normal'))

        const p = screen.getByTestId('answer')
        expect(p?.textContent).toBe('')

        const h2 = screen.getByTestId('message')
        expect(h2?.textContent).toBe('Your input IVV contains too many D, L, V characters')
      })

      test('Testing input with too many wrong input', async () => {
        render(<App />)
        const user = userEvent.setup()

        const input = screen.getByTestId('add-word-input');
        fireEvent.change(input, {target: {value: 'moi'}})

        const spyAnchorTag = vi.spyOn(user, 'click') 
        await user.click(screen.getByText('Calculate from roman to normal'))

        const p = screen.getByTestId('answer')
        expect(p?.textContent).toBe('')

        const h2 = screen.getByTestId('message')
        expect(h2?.textContent).toBe('Your input moi contains characters that are not roman numbers')
      })

      test('Testing input with no input', async () => {
        render(<App />)
        const user = userEvent.setup()

        const input = screen.getByTestId('add-word-input');
        fireEvent.change(input, {target: {value: ''}})

        const spyAnchorTag = vi.spyOn(user, 'click') 
        await user.click(screen.getByText('Calculate from roman to normal'))

        const p = screen.getByTestId('answer')
        expect(p?.textContent).toBe('')

        const h2 = screen.getByTestId('message')
        expect(h2?.textContent).toBe('Please write something')
      })


  });