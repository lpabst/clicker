import React, { Component } from 'react';


class Info extends Component {

    formatNumber(amt){
        return amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    render() {
        let inc = Math.floor(this.props.autoInfectorIncrementer);

        return (
            <section className='info'>
                <p className='timer'>Time Elapsed: <span id='timer'></span></p>
                <p className='timer'>Total Clicks (including auto clicker): {this.props.clicks}</p>
                <p className='score'>People Infected: {this.props.getNumInfected()}</p>
                <p className='timer'>Time To Infect One Thousand: {this.props.timeThousand}</p>
                <p className='timer'>Time To Infect One Million: {this.props.timeMillion}</p>
                <p className='timer'>Time To Infect One Billion: {this.props.timeBillion}</p>
                <p className='timer'>Time To Infect The Whole World: {this.props.timeGameOver}</p>
                <p className='score'>Money: ${this.formatNumber(this.props.money)}</p>
                <p className='timer'>Incrementer (INC): {this.formatNumber(inc) + (inc > 1 ? ' People' : ' Person')} infected at a time</p>
                <p className='timer'>Interval (Rate): {(this.props.autoInfectorInterval / 1000).toFixed(3)} seconds</p>
            </section>
        );
    }
}


export default Info;