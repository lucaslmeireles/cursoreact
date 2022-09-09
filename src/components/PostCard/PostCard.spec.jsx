import { render, screen } from "@testing-library/react"
import { PostCard } from '.'

const mock = {
    title: 'Alguma',
    body: 'body1',
    id: 1,
    cover: 'img/img.png'
}

describe('<PostCard/>', () => {
    it('should render PostCard correctly', () => {
        render(<PostCard {...mock} />)
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})