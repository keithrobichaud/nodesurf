import React from 'react';
// import styles from './App.css';
import Navbar from './components/Navbar.jsx';
import AppRouter from './router.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div>
        <div>
          <Navbar />
          <AppRouter />
        </div>
		<link rel="stylesheet" href="App.css" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
      </div>
    );
  }
}
