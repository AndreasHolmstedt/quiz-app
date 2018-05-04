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
                {
                    this.state.isLoading
                    ? <p>Loading Highscores...</p>
                    :   <ul>
                            { this.state.highscores.map( (score, index) => (
                                    <li key={score.nick}>
                                        <img src={score.img} alt="avatar" />
                                        <p>{index+1} - {score.nick}</p>
                                        <h3>{score.highscore}</h3>
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
