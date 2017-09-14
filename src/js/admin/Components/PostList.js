const React = require('react');
const PostListItem = require('./PostListItem');
const ajax = require('jquery').ajax;

class PostList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      posts: []
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount () {
    this.fetchPosts();
  }

  fetchPosts () {
    ajax({
      url: '/api/post',
      success: (posts) => {
        this.setState({posts});
      },
      error: (jqxhr) => {
        console.log(jqxhr);
      }
    });
  }

  render () {
    return (
      <div className='PostList'>
        <h1>Posts</h1>
        {this.state.posts.map((post) => (
          <PostListItem key={post.id} post={post}/>
        ))}
      </div>
    );
  }

}
module.exports = PostList;
