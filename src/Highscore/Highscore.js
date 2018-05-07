import React, { Component } from 'react';
import './Highscore.css';

class Highscore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            highscores: [],
            playerScore: null
        }
    }

    componentDidMount() {
        this.props.database.ref("/users/").once("value", snapshot => {
            let users = snapshot.val();
            let scores = [];

            for(let user in users) {
                if(users.hasOwnProperty(user)) {
                    if(users[user].highscore > 0) {
                        scores.push(users[user]);
                    }
                }
            }

            scores.sort(this.sortHighscores);

            this.setState({ highscores: scores, isLoading: false });
        });
    }

    sortHighscores(a, b) {
        if(a.highscore < b.highscore)
            return 1;
        if(a.highscore > b.highscore)
            return -1;
        return 0;
    }

    render() {
        return (
            <div className="Highscore">
                <h2>Highscores</h2>
                { this.state.isLoading
                    ? <h2>Loading Highscores...</h2>
                    :   <ul>
                            { this.props.user.uid
                                ?   <li>
                                        <img className="avatar" src={this.props.user.photoURL} alt="avatar" />
                                        <p className="player">You</p>
                                        <h3 className="personalHighscore">Your Highscore: {this.props.user.highscore}</h3>
                                    </li>
                                : null
                            }
                            <li className="header">
                                <p className="rankHeader">Rank</p>
                                <p className="scoreHeader">Score</p>
                                <p className="playerHeader">Player</p>
                            </li>
                            { this.state.highscores.map( (player, index) => (
                                    <li key={index + "" + player.displayName}>
                                        <h3 className="rank">{index+1}</h3>
                                        <h3 className="score">{player.highscore}</h3>
                                        <img className="avatar" src={player.photoURL} alt="avatar" onError={(e)=>{e.target.src="http://www.zimphysio.org.zw/wp-content/uploads/2018/01/default-avatar-2.jpg"}} />
                                        <p className="player">{player.displayName}</p>
                                    </li> )
                                )
                            }
                        </ul>
                }
            </div>
        );
    }
}

export default Highscore;
