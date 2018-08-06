/* global google, tinymce */
const React = require('react');
const ReactRedux = require('react-redux');
const TinyMCE = require('react-tinymce');
const ajax = require('jquery').ajax;
const DateSelector = require('./DateSelector');
/*const getAuthorizationHeaders = require('../jwt').getAuthorizationHeaders;
const refreshToken = require('../jwt').refreshToken;
const EventsNeedsUpdateActions = require('../Actions/EventsNeedsUpdate');*/

const defaultPost = {
  title: '',
  content: '',
  postDate: new Date()
};

class Editor extends React.Component {

  constructor (props) {
    super(props);
    this.state = props.post || defaultPost;
    this.validate = this.validate.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.withValue = this.withValue.bind(this);
    this.sync = this.sync.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount () {
    if (this.props.id) {
      this.fetch(this.props.id);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.post) {
      this.setState({post: defaultPost});
    }
    if (nextProps.id !== this.state.id) {
      this.fetch(nextProps.id);
    }
  }

  validate (e) {
    e.preventDefault();
    let valid = true;
    if (valid) {
      if (this.state.id) {
        this.sync('PATCH');
      } else {
        this.sync('POST');
      }
    } else {
      // @TODO
    }
  }

  updateContent (e) {
    let content = e.target.getContent();
    this.setState({content});
  }

  fetch (id) {
    let url = '/api/post/' + id;
    ajax({
      url,
      success: (response) => {
        response.postDate = new Date(response.postDate);
        let nextState = Object.assign({}, this.state, response);
        this.setState(nextState);
        tinymce.get('content').on('init', (e) => {
          e.target.setContent(nextState.content);
        });
      }
    });
  }

  sync (method) {
    let {title, content, postDate} = this.state;
    let data = {title, content, postDate};
    let url = method === 'PATCH' ?
      '/api/post/' + this.state.id :
      '/api/post';
    //let headers = getAuthorizationHeaders();
    ajax({
      url,
      //headers,
      method,
      data,
      success: (response, status, request) => {
        //refreshToken(request);
        console.log(response);
        if (!response.error) {
          //this.props.eventsNeedsUpdate();
          let nextState = Object.assign({}, this.state, response);
          this.setState(nextState);
        } else {
          // @TODO error
        }
      },
      error: (jqxhr) => {
        console.log(jqxhr);
      },
      complete: () => {
        // @TODO cleanup
      }
    });
  }

  withValue (e) {
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  render () {
    let post = this.state;
    console.log(post);
    let saveText = this.state.id ? 'Save Changes' : 'Create Post';
    let config = { menubar: false };
    return (
      <div className='EventForm'>
        <form className='Form' onSubmit={this.validate}>
          <label className='Label' htmlFor='title'>Post Title</label>
          <input
            className='Input Input--Text'
            type='text'
            placeholder='My Blog Post'
            name='title'
            autoComplete='off'
            value={post.title}
            onChange={this.withValue}
          />
          <label className='Label' htmlFor='startTime'>Post Date</label>
          <DateSelector
            name='postDate'
            withValue={this.withValue}
            date={post.postDate}
          />
          <label className='Label' htmlFor='content'>Content</label>
          <TinyMCE
            id='content'
            name='content'
            config={config}
            content={post.content}
            onChange={this.updateContent}
            ref={(el) => { this.tincymcecontent = el; }}
          />
          <input
            className='Input Input--Submit'
            type='submit'
            value={saveText}
          />
        </form>
      </div>
    );
  }

}

/*const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    eventsNeedsUpdate: () => {
      dispatch(EventsNeedsUpdateActions.eventsNeedsUpdate(true));
    }
  };
};

EventForm = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);*/

module.exports = Editor;
