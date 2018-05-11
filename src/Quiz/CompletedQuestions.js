import React, { Component } from 'react';
import './CompletedQuestions.css';


class CompletedQuestions extends Component {
  constructor(props){
    super(props)
    this.state = {
      completedQuestions: this.props.completedQuestions,
    }
  }

  componentWillReceiveProps(nextProps) {
      this.setState({completedQuestions: this.props.completedQuestions })
  }
    render() {
      const listOfAnswers = this.state.completedQuestions.map(function(answer, index){
        return(
            <div key={index}>
            {answer === 0 ? <div key={index} className="notAnswered"/> : null }
            {answer === 1 ? <div key={index} className="correct" /> : null }
            {answer === -1 ? <div key={index} className="wrong" /> : null }
            </div>
          )
        })
        return (
            <div className="completedQuestions">
            {listOfAnswers}
            </div>
        );
    }
}

export default CompletedQuestions;
