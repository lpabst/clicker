import React, { Component } from 'react';


class LeaderBoard extends Component {
    render() {
        let ft = this.props.fastestTimes || [{}];
        return (
            <section className='leaderboard'>

                <div className='leaderboard_section'>
                    <p>Fastest Times to 1 Thousand Infections</p>
                    {
                        ft.thousand.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <p>Fastest Times to 1 Million Infections</p>
                    {
                        ft.million.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <p>Fastest Times to 1 Billion Infections</p>
                    {
                        ft.billion.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <p>Fastest Times to World-Wide Infection</p>
                    {
                        ft.gameOver.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

            </section>
        );
    }
}


export default LeaderBoard;