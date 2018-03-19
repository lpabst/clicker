import React, { Component } from 'react';


class LeaderBoard extends Component {
    render() {
        let ft = this.props.fastestTimes || [{}];
        return (
            <section className='leaderboard'>

                <div className='leaderboard_section'>
                    <h6>One Thousand Infections LeaderBoard</h6>
                    {
                        ft.thousand.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <h6>10-Thousand Infections LeaderBoard</h6>
                    {
                        ft.tenThousand.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <h6>100-Thousand Infections LeaderBoard</h6>
                    {
                        ft.hundredThousand.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <h6>One Million Infections LeaderBoard</h6>
                    {
                        ft.million.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <h6>One Billion Infections LeaderBoard</h6>
                    {
                        ft.billion.map((item, i) => {
                            return <p key={i}>{i+1}. {item.score} seconds - {item.username}</p>
                        })
                    }
                </div>

                <div className='leaderboard_section'>
                    <h6>World-Wide Infections LeaderBoard</h6>
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