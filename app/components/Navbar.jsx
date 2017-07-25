import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Nabvar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
		<Navbar>
  	      <Navbar.Header>
  	        <Navbar.Brand>
  	          <a href="/">NodeSurf</a>
  	        </Navbar.Brand>
  	      </Navbar.Header>
  	      <Nav>
			<NavItem eventKey={1} href="/n/root">Surf!</NavItem>
  	        <NavItem eventKey={2} href="/contact">Contact</NavItem>
  	      </Nav>
  	    </Navbar>
    );
  }
}
