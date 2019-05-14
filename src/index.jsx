import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import './style.css';

class App extends React.Component {
    render () {
        return <h1>Hello World from React boilerplate</h1>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
