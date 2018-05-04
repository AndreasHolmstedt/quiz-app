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
            let data = snapshot.val();
            let highscores = [];

            for(let score in data) {
                if(data.hasOwnProperty(score)) {
                    highscores.push(data[score]);
                }
            }

            highscores.sort(this.sortHighscores);

            this.setState({ highscores: highscores, isLoading: false });
        });
    }

    sortHighscores(a, b) {
        if(a.highscore < b.highscore)
            return -1;
        if(a.highscore > b.highscore)
            return 1;
        return 0;
    }

    render() {
        return (
            <div className="Highscore">
                <p>Highscore</p>
                {
                //spelarens highscore
                //lista med högsta poäng för alla användare
                }
                <div className="userStats">
                    <h3 className="personalHighscore">Your Highscore: 250</h3>
                    <img className="avatar" src="http://avatarbox.net/avatars/img19/47_face_avatar_picture_12669.jpg" alt="avatar"  />
                    <p className="player">You</p>
                </div>
                {
                    this.state.isLoading
                    ? <p>Loading Highscores...</p>
                    :   <ul>
                            <li>
                                <p className="rankHeader">Rank</p>
                                <p className="scoreHeader">Score</p>
                                <p className="playerHeader">Player</p>
                            </li>
                            { this.state.highscores.map( (score, index) => (
                                    <li key={score.nick}>
                                        <h3 className="rank">{index+1}</h3>
                                        <h3 className="score">{score.highscore}</h3>
                                        <img className="avatar" src={score.img} alt="avatar"  />
                                        <p className="player">{score.nick}</p>
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
