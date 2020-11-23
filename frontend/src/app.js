// Imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// App Imports
import Layout from './components/layout';
import PostListContainer from './components/post/list-container';
import PostAdd from './components/post/add';
import PostViewContainer from './components/post/view-container';
import UserLogin from './components/user/login';
import UserRegister from './components/user/register';
import About from './components/about';
import PageNotFound from './components/page-not-found';
import MyPosts from './components/post/my-posts';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={PostListContainer}/>
      <Route path="/my-posts" component={MyPosts} />
      <Route path="/post/add" component={PostAdd}/>
      <Route path="/post/:postId" component={PostViewContainer}/>
      <Route path="/user/login" component={UserLogin}/>
      <Route path="/user/register" component={UserRegister}/>
      <Route path="/about" component={About}/>
      <Route component={PageNotFound}/>
    </Switch>
  </Layout>
)

export default App;
