import React, { Component } from 'react';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      score: 0,
      showShop: false,
      autoInfect: false,
      autoInfectorIncrementer: 1,
      infectedNeedles: false,
    }

    this.updateScore = this.updateScore.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
    this.buyAutoInfecter = this.buyAutoInfecter.bind(this);
    this.buyInfectedNeedles = this.buyInfectedNeedles.bind(this);
  }

  updateScore(newVal){
    this.setState({
      score: newVal
    })
  }

  toggleShop(e){
    e.stopPropagation();
    this.setState({
      showShop: !this.state.showShop
    })
  }

  buyAutoInfecter(e){
    e.stopPropagation();
    if (this.state.score >= 20){
      let autoInfectorInterval = setInterval( () => {
        this.setState({
          score: this.state.score + this.state.autoInfectorIncrementer
        })
      }, 1500)
      this.setState({
        autoInfect: true,
        score: this.state.score - 20
      })
    }
  }

  buyInfectedNeedles(e){
    e.stopPropagation();
    if (this.state.score >= 50){
      this.setState({
        autoInfectorIncrementer: this.state.autoInfectorIncrementer + 2,
        infectedNeedles: true,
        score: this.state.score - 50,
      })
    }
  }

  render() {
    return (
      <div className="home">
        <div className='home_wrapper' onClick={(e) => this.updateScore(this.state.score + 1)}>

          <p className='score'>Score: {this.state.score}</p>
          <div className='shop_btn btn' onClick={this.toggleShop}>Shop</div>

          {
            this.state.showShop ? 
            <div className='shop_wrapper'>
              {!this.state.autoInfect ? <p onClick={this.buyAutoInfecter}>$20 - Auto Infect</p> : null}
              {!this.state.infectedNeedles ? <p onClick={this.buyInfectedNeedles}>$50 - Buy Infected Needles</p> : null}
            </div>
            : null
          }

        </div>
      </div>
    );
  }
}


export default Home;