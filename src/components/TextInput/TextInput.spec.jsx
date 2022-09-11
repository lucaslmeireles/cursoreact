import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from '.';

describe('<TextInput/>', () => {
  it('should call handleChange fn on each key pressed TextInput', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);
    const input = screen.getByPlaceholderText(/type your search/);
    const value = 'o valor';
    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
  it('should have a value of serachValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'teste'} />);
    const input = screen.getByPlaceholderText(/type your search/);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('teste');
  });
});
