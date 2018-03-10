import React, { Component } from 'react';

import './Home.css';


class Home extends Component {
  constructor(props){
    super(props);

    this.userClick = this.userClick.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
    this.buyAutoInfecter = this.buyAutoInfecter.bind(this);
    this.buyInfectedNeedles = this.buyInfectedNeedles.bind(this);
    this.buyFasterInfectionRate = this.buyFasterInfectionRate.bind(this);

    this.state = {
      score: 80,
      showShop: false,
      autoInfect: false,
      autoInfectorIncrementer: 1,
      autoInfectorInterval: 1500,
      infectedNeedles: false,
      fasterInfectionRate: false,
      shopItems: [
        {
          title: 'Auto Infect',
          click: this.buyAutoInfecter,
          show: 'autoInfect',
          cost: 20,
        },
        {
          title: 'Buy Infected Needles',
          click: this.buyInfectedNeedles,
          show: 'infectedNeedles',
          cost: 50,
        },
        {
          title: 'Faster Infection Rate',
          click: this.buyFasterInfectionRate,
          show: 'fasterInfectionRate',
          cost: 50,
        }
      ]
    }

  }

  userClick(){
    let newVal = this.state.score + this.state.autoInfectorIncrementer;
    this.setState({
      score: newVal,
      showShop: false,
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
      this.autoInfectorInterval = setInterval( () => {
        this.setState({
          score: this.state.score + this.state.autoInfectorIncrementer
        })
      }, this.state.autoInfectorInterval)
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

  buyFasterInfectionRate(e){
    e.stopPropagation();
    if (this.state.score >= 50){
      this.setState({
        autoInfectorInterval: 500,
        score: this.state.score - 50,
        fasterInfectionRate: true,
      }, () => {
        clearInterval(this.autoInfectorInterval);
        this.autoInfectorInterval = setInterval( () => {
          this.setState({
            score: this.state.score + this.state.autoInfectorIncrementer
          })
        }, this.state.autoInfectorInterval)
      })
    }
  }

  render() {
    return (
      <div className="home">
        <div className='home_wrapper' onClick={this.userClick}>

          <p className='score'>Score: {this.state.score}</p>
          <div className='shop_btn btn' onClick={this.toggleShop}>Shop</div>

          {
            this.state.showShop ? 
              <div className='shop_wrapper'>
                {
                  this.state.shopItems.map( (item, i) => {
                    let color = this.state.score >= item.cost ? 'green' : 'red';
                    return !this.state[item.show] ? <p key={i} onClick={item.click} style={{color: color}} className='shop_item' >${item.cost} - {item.title}</p> : null
                  })
                }
              </div>
            : null
          }

        </div>
      </div>
    );
  }
}


export default Home;