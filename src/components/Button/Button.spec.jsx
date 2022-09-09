import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "."

describe('<Button/>', () => {
    it('should render the button with the text', () => {
        render(<Button text={'load more posts'} />)
        const button = screen.getByRole('button', { name: /load more posts/ })
    })
    it('should have className = button', () => {
        render(<Button text={'load more posts'} />)
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('class', 'button')
    })
    it('should call function on button click', () => {
        const fn = jest.fn()
        render(<Button text={'load more posts'} onClick={fn} />)
        const button = screen.getByRole('button', { name: /load more posts/ })
        fireEvent.click(button)
        expect(fn).toHaveBeenCalledTimes(1)
    })
    it('should not call function when button disable', () => {
        render(<Button text={'load more posts'} disabled={true} />)
        const button = screen.getByRole('button', { name: /load more posts/ })
        expect(button).toBeDisabled()
    })

})