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
    this.state = {
      post: props.post || defaultPost
    };
    this.validate = this.validate.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.sync = this.sync.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.post) {
      this.setState({post: defaultPost});
    }
    if (nextProps.post && nextProps.post.id !== this.state.post.id) {
      tinymce.get('content').setContent(this.state.content);
    }
  }

  validate (e) {
    e.preventDefault();
    let valid = true;
    if (valid) {
      if (this.state.event.id) {
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

  sync (method) {
    //let data = this.getFormData();
    let url = method === 'PATCH' ?
      '/crm/events/' + this.state.event.id :
      '/crm/events';
    //let headers = getAuthorizationHeaders();
    ajax({
      url,
      //headers,
      method,
      data,
      success: (response, status, request) => {
        //refreshToken(request);
        if (!response.error) {
          //this.props.eventsNeedsUpdate();
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

  updateStateValue (name, value) {
    let nextPost = Object.assign({}, this.state.post);
    nextPost[name] = value;
    this.setState({ post: nextPost });
  }

  render () {
    let post = this.state.post;
    let saveText = this.state.post.id ? 'Save Changes' : 'Create Post';
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
            defaultValue={post.title}
            onChange={(e) => { this.updateStateValue('title', e.target.value); }}
          />
          <label className='Label' htmlFor='startTime'>Post Date</label>
          <DateSelector
            name='postDate'
            updateStateValue={this.updateStateValue}
            date={post.postDate}
          />
          <label className='Label' htmlFor='content'>Content</label>
          <TinyMCE
            id='content'
            name='content'
            defaultValue={post.content}
            config={config}
            content={post.content}
            onChange={this.updateContent}
            ref={(el) => { this.tincymcecontent = el; }}
          />
          <input className='Input Input--Submit' type='submit' value={saveText}/>
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
