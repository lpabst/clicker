import React, { Component } from 'react';


class Rules extends Component {
    render() {
        let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let screenInterface = screenWidth > 815 ? 'Click (or press space-bar)' : 'Tap';
        return (
            <section className='rules'>
                <p>You have been hired by a pharmaceutical company to start a plague (they're the only ones with the vacine).{screenInterface} anywhere on the screen to infect someone. Each person you infect earns you $1. Buy upgrades in the Shop. The Risk Shop also has upgrades, but the benefits aren't always as apparent at first.</p> 
                <p>Your progress to 1 Thousand infections, 1 Million, 1 Billion, and world-wide infection (7 billion) will be timed. Clicking 'Start Game' will initiate the timer. Compare your times to the leaderboard!</p>
                <div className='btn' style={{margin: '5px auto'}} onClick={this.props.toggleRules} >Close Rules</div>
            </section>
        );
    }
}


export default Rules;