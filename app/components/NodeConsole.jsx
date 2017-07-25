import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Console from 'react-console-component';
import { Redirect } from 'react-router-dom';

import NodeDAO from '../daos/node.js';

import '../styles/NodeConsole.css';

export default class NodeConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
  }

  componentWillReceiveProps() {
    this.setState({
      redirect: null
    });
  }

  handleConsoleInput(input) {
    const reactConsole = this.reactConsole;

    const text = input.trim();
    const args = text.split(' ');

    const command = args[0];
    switch (command) {
    case 'help':
      this.logHelp();
      break;
    case 'ls':
      this.listChildren();
      break;
    case 'cd /':
    case 'home':
      this.gotoRoot();
      break;
    case 'make':
      if (args.length < 3) {
        this.invalidArgs();
      } else {
        const nodeName = args[1];
        args.splice(0, 2);
        const nodeContent = args.join(' ');
        this.createNode(nodeName, nodeContent);
      }
      break;
    case 'cd':
      if (args.length < 2) {
        this.invalidArgs();
      } else {
        const nodeName = args[1];
        this.handleGoto(nodeName);
      }
      break;
    default:
      this.invalidArgs();
    }

    return reactConsole.return();
  }

  createNode(nodeName, nodeContent) {
    this.reactConsole.log('Creating node ' + nodeName + ' with value: ' + nodeContent);
    const parentNode = this.props.node;
    NodeDAO.createChild(parentNode, nodeName, nodeContent);
  }

  handleGoto(nodeName) {
    const node = this.props.node;
    const children = node.children || {};
    if (children[nodeName]) {
      const url = '/n/' + children[nodeName];
      this.setState({
        redirect: url
      });
    } else {
      this.reactConsole.log('This child does not exist. :(');
    }
  }

  listChildren() {
    const node = this.props.node;
    const children = node.children || {};
    _.each(children, (index, child) => {
      this.reactConsole.log(child);
    });
  }

  gotoRoot() {
    this.setState({
      redirect: '/n/root'
    });
  }

  invalidArgs() {
    this.reactConsole.log('Invalid usage. Type help for command parameters.');
  }

  logHelp() {
    const log = this.reactConsole.log;
    log('Please enter one of the following commands:');
    log('ls');
    log('    lists out all children nodes');
    log('cd');
    log('    move to a child node');
    log('        usage: cd nodeName (i.e. cd cats)');
    log('make');
    log('    create a new child node');
    log('        usage: make nodeName nodeContent (i.e. make cats lolcats)');
    log('home');
    log('    returns to root');
  }

  render() {
    const redirect = this.state.redirect ? <Redirect to={this.state.redirect} /> : null;
    return (
      <div>
        <Console ref={input => {this.reactConsole = input; }}
          handler={::this.handleConsoleInput}
          autofocus
        />
        {redirect}
      </div>
    );
  }
}

NodeConsole.propTypes = {
  node: PropTypes.object
};
