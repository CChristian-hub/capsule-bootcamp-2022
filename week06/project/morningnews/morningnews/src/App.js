import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource'
import ScreenMyArticles from './ScreenMyArticles'
import ScreenSource from './ScreenSource'

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import myArticles from './reducers/article'
import token from './reducers/token'
import language from './reducers/language'

const store = createStore(combineReducers({ myArticles, token, language }));

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Switch>
          <Route path="/screenarticlesbysource/:id" component={ScreenArticlesBySource} />
          <Route path="/screenmyarticles" component={ScreenMyArticles} />
          <Route path="/screensource" component={ScreenSource} />
          <Route path="/" component={ScreenHome} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;