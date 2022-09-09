import './styles.css';
import { Component, useCallback, useEffect, useState } from 'react'
import { loadPost } from '../../utils/load-posts';
import Posts from '../../components/Post';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [allPosts, setAllPosts] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleLoadPost = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPost()
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPost(0, postsPerPage)
  }, [handleLoadPost, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    console.log(nextPosts, posts)
    posts.push(...nextPosts);
    setPosts(posts)
    setPage(page)
  }

  const handleChange = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue ? posts.filter((post) => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase())
  }) : posts

  return (
    <section className='container'>
      {!!searchValue && (
        <h1>Search Value: {searchValue}</h1>
      )}
      <TextInput handleChange={handleChange} searchValue={searchValue} />
      <Posts posts={filteredPosts} />
      <div className='button-container'>
        {!searchValue && (
          <Button text='Load more posts' onClick={loadMorePosts} disable={noMorePosts} />
        )}
      </div>
    </section>
  );

}

// class Home extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: ''
//   };
//   componentDidMount() {
//     this.loadPost()
//   }
//   loadPost = async () => {
//     const { page, postsPerPage } = this.state
//     const postsAndPhotos = await loadPost()
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     })
//   }
//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     console.log(nextPosts, posts)
//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   }
//   handleChange = (e) => {
//     const { value } = e.target
//     this.setState({ searchValue: value })
//   }
//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length
//     const filteredPosts = !!searchValue ? posts.filter((post) => {
//       return post.title.toLowerCase().includes(searchValue.toLowerCase())
//     }) : posts
//     return (
//       <section className='container'>
//         {!!searchValue && (
//           <h1>Search Value: {searchValue}</h1>
//         )}
//         <TextInput handleChange={this.handleChange} searchValue={searchValue} />
//         <Posts posts={filteredPosts} />
//         <div className='button-container'>
//           {!searchValue && (
//             <Button text='Load more posts' onClick={this.loadMorePosts} disable={noMorePosts} />
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// export default Home;
