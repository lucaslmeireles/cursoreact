const { render, screen, waitForElementToBeRemoved } = require('@testing-library/react');
import { Home } from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
        },
        {
          userId: 1,
          id: 2,
          title: 'title2',
          body: 'body2',
        },
        {
          userId: 1,
          id: 3,
          title: 'title3',
          body: 'body3',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img1.png',
        },
        {
          url: 'img2.png',
        },
        {
          url: 'img3.png',
        },
      ]),
    );
  }),
];
const server = setupServer(...handlers);

describe('<Home/>', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    server.close();
  });
  it('should render serach, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();
    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect.assertions(3);
  });
  it('should searchfor posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');
    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText(/type your search/i);
    expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title3/i })).toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: /title1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title2/i })).not.toBeInTheDocument();
  });
});
