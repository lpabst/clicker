import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';

import Info from './HomeComponents/Info.js';
import Rules from './HomeComponents/Rules.js';
import LeaderBoard from './HomeComponents/LeaderBoard.js';

class Home extends Component {
  constructor(props){
    super(props);

    // bindings go above state so that I can use them in my shopItems array
    this.getLeaderBoard = this.getLeaderBoard.bind(this);
    this.startGame = this.startGame.bind(this);
    this.userClick = this.userClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handletimers = this.handletimers.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
    this.toggleRiskShop = this.toggleRiskShop.bind(this);
    this.toggleRules = this.toggleRules.bind(this);
    this.toggleLeaderBoard = this.toggleLeaderBoard.bind(this);
    this.buyAutoInfecter = this.buyAutoInfecter.bind(this);
    this.upgradeIncrementor = this.upgradeIncrementor.bind(this);
    this.upgradeInterval = this.upgradeInterval.bind(this);
    this.doubleInfectionInc = this.doubleInfectionInc.bind(this);
    this.buyInfections = this.buyInfections.bind(this);
    this.getNumInfected = this.getNumInfected.bind(this);

    this.state = {
      username: '',
      gameRunning: false,
      gameOver: false,
      clicks: 0,
      numInfected: 0,
      money: 100,
      moneyMultiplier: 1,
      autoInfectorIncrementer: 1,
      autoInfectorInterval: 1500,
      showShop: false,
      showRiskShop: false,
      showRules: false,
      showLeaderBoard: false,
      autoInfect: false,
      timeThousand: 'N/A',
      timeMillion: 'N/A',
      timeBillion: 'N/A',
      timeGameOver: 'N/A',
      shopItems: [
        {
          title: 'Infected Bandaids (INC*2)',
          click: (e) => this.upgradeIncrementor(e, 'infectedBandaids', 80, true, 2),
          show: 'infectedBandaids',
          cost: 80
        },
        {
          title: 'Hire Manager (auto click)',
          click: (e) => this.buyAutoInfecter(e, 90),
          show: 'autoInfect',
          cost: 90,
        },
        {
          title: 'Sickness Spreads By Touch (Rate/2)',
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
          title: 'Airborne Contagion (Rate*0.667)',
          click: (e) => this.upgradeInterval(e, 'airborneContagion', 1000, true, 0.667),
          show: 'airborneContagion',
          cost: 1000
        },
        {
          title: 'Hire A Mascot (INC*2)',
          click: (e) => this.upgradeIncrementor(e, 'hireMascot', 1200, true, 2),
          show: 'hireMascot',
          cost: 1200
        },
        {
          title: 'Infiltrate The CDC (INC*5)',
          click: (e) => this.upgradeIncrementor(e, 'infiltrateCDC', 2000, true, 5),
          show: 'infiltrateCDC',
          cost: 2000
        },
        {
          title: 'Infected Water (Rate/3)',
          click: (e) => this.upgradeInterval(e, 'infectedWater', 2000, true, 0.333),
          show: 'infectedWater',
          cost: 2000
        },
        {
          title: 'Infected Sodas (INC+6)',
          click: (e) => this.upgradeIncrementor(e, 'infectedSodas', 2200, false, 6),
          show: 'infectedSodas',
          cost: 2200
        },
        {
          title: 'Marketing Strategy #1: "It\'s cool to be sick" (INC*5)',
          click: (e) => this.upgradeIncrementor(e, 'marektingStrategy1', 8000, true, 5),
          show: 'marektingStrategy1',
          cost: 8000
        },
        {
          title: 'Marketing Strategy #2: "It\'s cool to get your friends sick" (INC+12)',
          click: (e) => this.upgradeIncrementor(e, 'marektingStrategy2', 14000, false, 12),
          show: 'marektingStrategy2',
          cost: 14000
        },
        {
          title: 'Infect Plant Life (Rate*0.8)',
          click: (e) => this.upgradeInterval(e, 'infectedPlants', 15000, true, 0.8),
          show: 'infectedPlants',
          cost: 15000
        },
        {
          title: 'Marketing Strategy #3: "It\'s cool to get strangers sick" (INC+100)',
          click: (e) => this.upgradeIncrementor(e, 'marektingStrategy3', 120000, false, 100),
          show: 'marektingStrategy3',
          cost: 120000
        },
        {
          title: 'Make The Air Infectious" (INC*3)',
          click: (e) => this.upgradeIncrementor(e, 'infectiousAir', 500000, true, 3),
          show: 'infectiousAir',
          cost: 500000
        },
        {
          title: 'Marketing Strategy #4: Start An "Infection Parties" Trend (INC+500)',
          click: (e) => this.upgradeIncrementor(e, 'marketingStrategy4', 800000, false, 500),
          show: 'marketingStrategy4',
          cost: 800000
        },
        {
          title: 'Infect Animal Life (Rate*0.5)',
          click: (e) => this.upgradeInterval(e, 'infectedAnimals', 850000, true, 0.5),
          show: 'infectedAnimals',
          cost: 850000
        },
        {
          title: 'Survival of the Sickest (INC*5)',
          click: (e) => this.upgradeIncrementor(e, 'survivalOfTheSickest', 5000000, true, 5),
          show: 'survivalOfTheSickest',
          cost: 5000000
        },
        {
          title: 'Biological Warfare (INC+2,000)',
          click: (e) => this.upgradeIncrementor(e, 'biologicalWarfare', 6500000, false, 2000),
          show: 'biologicalWarfare',
          cost: 6500000
        },
        {
          title: 'Catch The Disease Just By Seeing Someone who\'s sick (Rate*0.75)',
          click: (e) => this.upgradeInterval(e, 'visualContagion', 6500000, true, 0.75),
          show: 'visualContagion',
          cost: 6500000
        },
        {
          title: 'Hire More Employees (INC*4)',
          click: (e) => this.upgradeIncrementor(e, 'moreEmployees', 6500000, true, 4),
          show: 'moreEmployees',
          cost: 6500000
        },
        {
          title: 'Offer Stock Options (INC*5)',
          click: (e) => this.upgradeIncrementor(e, 'stockOptions', 7000000, true, 5),
          show: 'stockOptions',
          cost: 7000000
        },
        {
          title: 'Offer Overtime Pay (INC*4)',
          click: (e) => this.upgradeIncrementor(e, 'overtimePay', 475000000, true, 4),
          show: 'overtimePay',
          cost: 475000000
        },
        {
          title: 'Double Overtime Pay (INC+50,000)',
          click: (e) => this.upgradeIncrementor(e, 'doubleOvertimePay', 987654321, false, 50000),
          show: 'doubleOvertimePay',
          cost: 987654321
        },
      ],
      riskShopItems: [
        {
          title: 'Double your infection incrementer (INC), receive 1/3 the money',
          click: (e) => this.doubleInfectionInc(e, 1000),
          show: 'doubleInfectionInc',
          cost: 1000
        },
        {
          title: 'Pay 1000 People To Infect Themselves (No Money Reward)',
          click: (e) => this.buyInfections(e, 1000, 1000),
          show: 'always',
          cost: 1000
        },
        {
          title: 'Pay 10,000 People To Infect Themselves (No Money Reward)',
          click: (e) => this.buyInfections(e, 9500, 10000),
          show: 'always',
          cost: 9500
        },
        {
          title: 'Pay 100,000 People To Infect Themselves (No Money Reward)',
          click: (e) => this.buyInfections(e, 90000, 100000),
          show: 'always',
          cost: 90000
        },
        {
          title: 'Pay 1,000,000 People To Infect Themselves (No Money Reward)',
          click: (e) => this.buyInfections(e, 850000, 1000000),
          show: 'always',
          cost: 850000
        },
        {
          title: 'Pay 10,000,000 People To Infect Themselves (No Money Reward)',
          click: (e) => this.buyInfections(e, 8250000, 10000000),
          show: 'always',
          cost: 8250000
        },
      ],
      fastestTimes: {
        thousand: [1000, 1120.20, 1253.36, 1855.32, 2210.25],
        million: [321, 323, 354, 545, 896],
        billion: [125, 126, 127, 159, 189],
        gameOver: [1, 2, 3, 4, 5],
      }
    }

  }

  componentDidMount(){
    // Gets the leaderboard the current user's username
    this.getLeaderBoard();
  }

  getLeaderBoard(){
    axios.get('/api/leaderboard')
    .then( res => {
      this.setState({
        fastestTimes: res.data.leaders,
        username: res.data.username
      })
    })
    .catch(err => console.log(err));
  }

  startGame(){
    this.setState({
      sentThousand: false,
      sentMillion: false,
      sentBillion: false,
      sentGameOver: false,
      gameRunning: true
    }, () => {
      // Focus the home wrapper div to enable the space bar click functionality
      document.getElementById('home_wrapper').focus();
  
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
    })
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  // When user buys the auto clicker, this function gets called, so I pass in the closeShop variable so that when the user clicks it closes the shop, but when the computer clicks it can stay open
  userClick(closeShop){
    if (!this.state.gameRunning || this.state.gameOver){
      return;
    }

    // Check for script that is clicking over 70 times per second on average
    let timer = document.getElementById('timer').innerText;
    timer = Math.ceil(timer.replace(/s/, ''));
    if (timer && this.state.clicks / timer > 70){
      alert('Cheater! No scripts allowed');
      return this.endGame();
    }

    let newMoney = this.state.money + (this.state.autoInfectorIncrementer * this.state.moneyMultiplier);
    let newNumInfected = this.state.numInfected + this.state.autoInfectorIncrementer;
    this.setState({
      money: newMoney,
      numInfected: newNumInfected,
      clicks: this.state.clicks + 1,
    })

    if (closeShop){
      this.setState({
        showShop: false,
        showRiskShop: false,
        showRules: false,
      })
    }

    this.handletimers(newNumInfected);
  }

  handleKeyPress(e){
    if (this.state.gameRunning && e.keyCode === 32){
      this.userClick(false);
    }
  }

  handletimers(newNumInfected){
    if (!this.state.sentThousand && newNumInfected >= 1000){
      this.setState({sentThousand: true, timeThousand: '...'});
      axios.post('/api/timeThousand')
      .then( res => {
        this.setState({timeThousand: res.data.time/1000 + 's'});
        if (res.data.isRecord){
          this.getLeaderBoard();
        }
      })
      .catch(err => {})
    }
    if (!this.state.sentMillion && newNumInfected >= 1000000){
      this.setState({sentMillion: true, timeMillion: '...'});
      axios.post('/api/timeMillion')
      .then( res => {
        this.setState({timeMillion: res.data.time/1000 + 's'})
        if (res.data.isRecord){
          this.getLeaderBoard();
        }
      })
      .catch(err => {})
    }
    if (!this.state.sentBillion && newNumInfected >= 1000000000){
      this.setState({sentBillion: true, timeBillion: '...'});
      axios.post('/api/timeBillion')
      .then( res => {
        this.setState({timeBillion: res.data.time/1000 + 's'})
        if (res.data.isRecord){
          this.getLeaderBoard();
        }
      })
      .catch(err => {})
    }
    if (!this.state.sentGameOver && newNumInfected >= 7000000000){
      this.setState({sentGameOver: true, timeGameOver: '...'});
      this.endGame();
      axios.post('/api/timeGameOver')
      .then( res => {
        this.setState({timeGameOver: res.data.time/1000 + 's'})
        if (res.data.isRecord){
          this.getLeaderBoard();
        }
      })
      .catch(err => {})
    }
  }

  toggleShop(e){
    e.stopPropagation();
    this.setState({
      showShop: !this.state.showShop
    })
  }

  toggleRiskShop(e){
    e.stopPropagation();
    this.setState({showRiskShop: !this.state.showRiskShop})
  }

  toggleRules(e){
    e.stopPropagation();
    this.setState({showRules: !this.state.showRules});
  }

  toggleLeaderBoard(e){
    e.stopPropagation();
    this.setState({showLeaderBoard: !this.state.showLeaderBoard});
  }

  buyAutoInfecter(e, cost){
    e.stopPropagation();
    if (!this.state.gameRunning || this.state.gameOver){
      return;
    }

    if (this.state.money >= cost){
      
      this.setState({
        autoInfect: true,
        money: this.state.money - cost
      })
      
      // starts triggering the click function automatically (the interval time is controlled on state)
      this.autoInfectorInterval = setInterval( () => {
        this.userClick(false);
      }, this.state.autoInfectorInterval)

    }
  }

  upgradeInterval(e, upgradeName, cost, isPercentUpgrade, upgradeAmt){
    e.stopPropagation();

    if (!this.state.gameRunning || this.state.gameOver){
      return;
    }

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
        // If the user hasn't purchased the auto clicker, then do nothing. If they have, execute this block of code
        if (this.autoInfectorInterval){
          // once the interval time has been updated on state, clear the old interval and create a new one using the new value on state
          clearInterval(this.autoInfectorInterval);
          this.autoInfectorInterval = setInterval( () => {
            this.userClick(false);
          }, this.state.autoInfectorInterval)
        }
      })
    }
  }

  upgradeIncrementor(e, upgradeName, cost, isPercentUpgrade, upgradeAmt){
    e.stopPropagation();

    if (!this.state.gameRunning || this.state.gameOver){
      return;
    }

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

  doubleInfectionInc(e, cost){
    e.stopPropagation();

    if (!this.state.gameRunning || this.state.gameOver){
      return;
    }

    if (this.state.money > cost){
      this.setState({
        moneyMultiplier: this.state.moneyMultiplier / 3,
        autoInfectorIncrementer: this.state.autoInfectorIncrementer * 2,
        doubleInfectionInc: true,
      })
    }
  }

  buyInfections(e, cost, peopleInfected){
    e.stopPropagation();

    if (!this.state.gameRunning || this.state.gameOver){
      return;
    }

    if (this.state.money > cost){
      this.setState({
        money: this.state.money - cost,
        numInfected: this.state.numInfected + peopleInfected
      })
    }
  }

  getNumInfected(){
    let num = this.state.numInfected;

    if (num >= 1000000000){
      return (num/1000000000) + ' Billion';
    }else if (num >= 1000000){
      return (num/1000000) + ' Million';
    }else if (num >= 1000){
      return (num/1000) + ' Thousand';
    }else{
      return num;
    }
  }

  endGame(){
    clearInterval(this.timer);
    return this.setState({
      gameOver: true,
      showLeaderBoard: true,
    })
  }

  logout(){
    axios.post('/api/logout')
    .then( res => {
      console.log(res);
      if (res.data && !res.data.match(/error/)){
        let newUrl = window.location.href.replace('/home', '/');
        window.location.href = newUrl;
      }
    })
    .catch(err=>{});
  }

  render() {
    return (
      <div className="home">
        <div id='home_wrapper' onClick={() => this.userClick(true)} onKeyDown={this.handleKeyPress} tabIndex='0' autoFocus='true' >

          <div className='userProfile'>
            <p>{this.state.username}</p>
          </div>

          { this.state.gameRunning ?
              <Info getNumInfected={this.getNumInfected} timeThousand={this.state.timeThousand} 
              timeMillion={this.state.timeMillion} timeBillion={this.state.timeBillion} 
              timeGameOver={this.state.timeGameOver} money={this.state.money} 
              autoInfectorIncrementer={this.state.autoInfectorIncrementer} 
              autoInfectorInterval={this.state.autoInfectorInterval} clicks={this.state.clicks} />
            : <div className='start_btn btn' onClick={this.startGame} >Start Game</div>
          }

          <div className='shop_btn btn' onClick={this.toggleShop}>Shop</div>

          { this.state.showShop ? 
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

          <div className='btn' onClick={this.toggleRiskShop}>Risk Shop</div>

          { this.state.showRiskShop ?
              <div className='shop_wrapper'>
                {
                  this.state.riskShopItems.map( (item, i) => {
                    let color = this.state.money >= item.cost ? 'green' : 'red';
                    return !this.state[item.show] ? <p key={i} onClick={item.click} style={{color: color}} className='shop_item' >${item.cost} - {item.title}</p> : null
                  })
                }
              </div>
            : null
          }

          <div className='btn' onClick={this.toggleRules}>How To Play</div>

          { this.state.showRules ? <Rules toggleRules={this.toggleRules} /> : null }

          <div className='btn' onClick={this.toggleLeaderBoard}>LeaderBoard</div>

          {this.state.showLeaderBoard ? <LeaderBoard fastestTimes={this.state.fastestTimes} /> : null}

          <div className='btn' onClick={this.logout}><p>Logout</p></div>

        </div>
      </div>
    );
  }
}

export default Home;