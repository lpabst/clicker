import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

import axios from 'axios';

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        guestUsername: '',
    }

    this.login = this.login.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.playAsGuest = this.playAsGuest.bind(this);
  }

  componentDidMount(){
    axios.post('/api/captureAnalytics', {
      metric: 'loginpagehits'
    })
  }

  login(){
    axios.post('/api/login', {
        username: this.state.username,
        password: this.state.password,
    })
    .then( res => {
      if (res.data === 'ok'){
          document.getElementById('homeLink').click();
      }else if (res.data.match(/error/)){
        alert(res.data);
      }else{
        alert(res.data);
      }
    })
    .catch(err=>{});
  }

  createAccount(){
    axios.post('/api/createAccount', {
        newUsername: this.state.newUsername,
        newPassword: this.state.newPassword,
    })
    .then( res => {
      if (res.data === 'ok'){
        document.getElementById('homeLink').click();
      }else if (res.data.match(/error/)){
        alert(res.data);
      }
    })
    .catch(err=>{});
  }

  playAsGuest(){
    axios.post('/api/playAsGuest', {
        guestUsername: this.state.guestUsername,
    })
    .then( res => {
        console.log(res);
        if (res.data === 'ok'){
          document.getElementById('homeLink').click();
        }
    })
    .catch(err=>{});
  }

  render() {
    return (
      <section className='login'>

        <p>Login</p>
        <input onChange={(e) => this.setState({username: e.target.value})} placeholder='Username' />
        <input onChange={(e) => this.setState({password: e.target.value})} placeholder='Password' />
        <button onClick={this.login} >Login</button>
        
        <p>Create An Account</p>
        <input onChange={(e) => this.setState({newUsername: e.target.value})} placeholder='New Username' />
        <input onChange={(e) => this.setState({newPassword: e.target.value})} placeholder='New Password' />
        <button onClick={this.createAccount}>Create Account</button>

        <p>Play As A Guest</p>
        <input onChange={(e) => this.setState({guestUsername: e.target.value})} placeholder='Guest Username' />
        <button onClick={this.playAsGuest} >Play!</button>

        <Link to='/home' id='homeLink' style={{display: 'none'}}></Link>

      </section>
    );
  }
}


export default Login;