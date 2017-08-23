const React = require('react');
//const ReactRedux = require('react-redux');
const Link = require('react-router-dom').Link;

class Navigation extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    let linkClasses = (to) => {
      return window.location.href.match(to) ?
        'Link Link--Active' : 'Link';
    };
    return (
      <div className='Navigation'>
        <div className='Navigation__Item'>
          <Link
            className={linkClasses('/create-post')}
            to={'/create-post'}
          >Create Post</Link>
        </div>
        <div className='Navigation__Item'>
          <Link
            className={linkClasses('/manage-posts')}
            to={'/manage-posts'}
          >Manage Posts</Link>
        </div>
        <div className='Navigation__Item'>
          <a href='#' className='Link' onClick={(e) => {
              e.preventDefault();
              this.props.logout();
            }}
          >Logout</a>
        </div>
      </div>
    );
  }

}

/*const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(LoginAction.logout());
    }
  };
};

Navigation = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
*/

module.exports = Navigation;
