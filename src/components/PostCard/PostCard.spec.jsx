import { render, screen } from '@testing-library/react';
import { PostCard } from '.';

const post = {
  title: 'Alguma',
  body: 'body1',
  id: 1,
  cover: 'img/img.png',
};

describe('<PostCard/>', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard post={post} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('body1')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const { container } = render(<PostCard post={post} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
