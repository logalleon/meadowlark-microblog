const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.HashRouter;
const Route = ReactRouter.Route;
const Navigation = require('./Components/Navigation');
const PostList = require('./Components/PostList');
const Editor = require('./Components/Editor');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Router>
        <div>
          <Navigation match={this.props.match}/>
          <Route path='/create-post' component={Editor}/>
          <Route path='/manage-posts' component={PostList}/>
          <Route path='/edit-post/:id' render={({match}) => (
            <Editor id={match.params.id}/>)}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
