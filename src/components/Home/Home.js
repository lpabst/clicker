import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';


class Home extends Component {
  constructor(props){
    super(props);

    this.userClick = this.userClick.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
    this.buyAutoInfecter = this.buyAutoInfecter.bind(this);
    this.upgradeIncrementor = this.upgradeIncrementor.bind(this);
    this.upgradeInterval = this.upgradeInterval.bind(this);

    this.state = {
      numInfected: 0,
      money: 100,
      autoInfectorIncrementer: 1,
      autoInfectorInterval: 1500,
      showShop: false,
      autoInfect: false,
      shopItems: [
        {
          title: 'Infected Bandaids (INC*2)',
          click: (e) => this.upgradeIncrementor(e, 'infectedBandaids', 80, true, 2),
          show: 'infectedBandaids',
          cost: 80
        },
        {
          title: 'Hire Employee (auto click)',
          click: (e) => this.buyAutoInfecter(e, 90),
          show: 'autoInfect',
          cost: 90,
        },
        {
          title: 'Contagious Touch (Rate*2)',
          click: (e) => this.upgradeInterval(e, 'contagiousTouch', 180, true, 0.5),
          show: 'contagiousTouch',
          cost: 180,
        },
        {
          title: 'Buy Infected Needles (INC+3)',
          click: (e) => this.upgradeIncrementor(e, 'infectedNeedles', 500, false, 3),
          show: 'infectedNeedles',
          cost: 500,
        },
        {
          title: 'Airborne Contagion (Rate*1.5)',
          click: (e) => this.upgradeInterval(e, 'airborneContagion', 1000, true, 0.67),
          show: 'airborneContagion',
          cost: 1000
        },
      ]
    }

  }

  componentDidMount(){
    // Start Timer on front end for user and back end for legit time keeping
    this.timeMS = 0;
    this.timer = setInterval(()=>{
      this.timeMS += 100
      document.getElementById('timer').innerText = (this.timeMS / 1000).toFixed(1) + 's';
    }, 100);

    axios.post('/api/startTimer')
    .then( res => {
      console.log(res);
    })
    .catch(err=>console.log(err));
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  userClick(){
    let newMoney = this.state.money + this.state.autoInfectorIncrementer;
    let newNumInfected = this.state.numInfected + this.state.autoInfectorIncrementer;
    this.setState({
      money: newMoney,
      numInfected: newNumInfected,
      showShop: false,
    })
  }

  toggleShop(e){
    e.stopPropagation();
    this.setState({
      showShop: !this.state.showShop
    })
  }

  buyAutoInfecter(e, cost){
    e.stopPropagation();
    if (this.state.money >= cost){
      this.autoInfectorInterval = setInterval( () => {
        this.setState({
          money: this.state.money + this.state.autoInfectorIncrementer,
          numInfected: this.state.numInfected + this.state.autoInfectorIncrementer,
        })
      }, this.state.autoInfectorInterval)
      this.setState({
        autoInfect: true,
        money: this.state.money - cost
      })
    }
  }

  upgradeInterval(e, upgradeName, cost, isPercentUpgrade, upgradeAmt){
    e.stopPropagation();

    let newInterval;
    if (isPercentUpgrade){
      newInterval = this.state.autoInfectorInterval * upgradeAmt;
    }else{
      newInterval = this.state.autoInfectorInterval - upgradeAmt;
    }

    if (this.state.money >= cost){
      this.setState({
        autoInfectorInterval: newInterval,
        money: this.state.money - cost,
        [upgradeName]: true,
      }, () => {
        clearInterval(this.autoInfectorInterval);
        this.autoInfectorInterval = setInterval( () => {
          this.setState({
            money: this.state.money + this.state.autoInfectorIncrementer,
            numInfected: this.state.numInfected + this.state.autoInfectorIncrementer,
          })
        }, this.state.autoInfectorInterval)
      })
    }
  }

  upgradeIncrementor(e, upgradeName, cost, isPercentUpgrade, upgradeAmt){
    e.stopPropagation();

    let newIncrementer;
    if (isPercentUpgrade){
      newIncrementer = this.state.autoInfectorIncrementer * upgradeAmt;
    }else{
      newIncrementer = this.state.autoInfectorIncrementer + upgradeAmt;
    }

    if (this.state.money >= cost){
      this.setState({
        money: this.state.money - cost,
        autoInfectorIncrementer: newIncrementer,
        [upgradeName]: true
      })
    }
  }

  render() {
    return (
      <div className="home">
        <div className='home_wrapper' onClick={this.userClick}>

          <p className='timer'>Time Elapsed: <span id='timer'></span></p>
          <p className='score'>People Infected: {this.state.numInfected}</p>
          <p className='score'>Money: ${this.state.money}</p>
          <p className='info'>Incrementer (INC): {this.state.autoInfectorIncrementer.toFixed(2)}</p>
          <p className='info'>Interval (Rate): {(this.state.autoInfectorInterval / 1000).toFixed(3)} seconds</p>
          <div className='shop_btn btn' onClick={this.toggleShop}>Shop</div>

          {
            this.state.showShop ? 
              <div className='shop_wrapper'>
                {
                  this.state.shopItems.map( (item, i) => {
                    let color = this.state.money >= item.cost ? 'green' : 'red';
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