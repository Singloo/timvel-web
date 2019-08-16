import React, { Component, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
const Landing = React.lazy(() => import('./modules/landing/landing.container'));
const AboutMe = React.lazy(() => import('./modules/aboutMe/aboutMe.container'));
import './App.css'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/" component={Landing} />
              <Route exact path="/aboutMe" component={AboutMe} />
            </Suspense>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
