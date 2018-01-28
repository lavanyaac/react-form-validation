import React, { Component } from 'react';
import CreateAccount from './components/Form/CreateAccount';

class App extends Component {
	onCreateAccount(){
		alert('Account Created');
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Form demo</h1>
        </header>

        <CreateAccount onCreateAccount={this.onCreateAccount}/>
      </div>
    );
  }
}

export default App;
