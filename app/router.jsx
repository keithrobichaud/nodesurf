import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import NodeContent from './components/NodeContent.jsx';


export default class AppRouter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/" exact render={()=><div>Welcome.</div>} />
          <Route path="/contact" exact render={()=><a href="https://twitter.com/s2b_ssb" target="_blank">I made this</a>} />
          <Route path="/n/:nid" render={(props)=><NodeContent {...props.match.params} />} />
        </div>
  	  </Router>
    );
  }
}
