const React = require('react');
const Link = require('react-router-dom').Link;

class PostListItem extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    let {post} = this.props;
    return (
      <div className='PostListItem'>
        <h2>{post.title}</h2>
        <h3>{new Date(post.postDate).toLocaleString()}</h3>
        <Link to={'/edit-post/' + post.id}>Edit</Link>
      </div>
    );
  }

}
module.exports = PostListItem;
