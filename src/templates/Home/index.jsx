import './styles.css';
import { Component } from 'react'
import { loadPost } from '../../utils/load-posts';
import Posts from '../../components/Post';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };
  componentDidMount() {
    this.loadPost()
  }
  loadPost = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPost()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    console.log(nextPosts, posts)
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }
  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length
    const filteredPosts = !!searchValue ? posts.filter((post) => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts
    return (
      <section className='container'>
        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}
        <TextInput handleChange={this.handleChange} searchValue={searchValue} />
        <Posts posts={filteredPosts} />
        <div className='button-container'>
          {!searchValue && (
            <Button text='Load more posts' onClick={this.loadMorePosts} disable={noMorePosts} />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
