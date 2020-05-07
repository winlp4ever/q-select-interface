// react imports
import React, { Component, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './_app.scss';

// import other cpns


// third party imports
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ViewHeadlineRoundedIcon from '@material-ui/icons/ViewHeadlineRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import Cookies from 'js-cookie';

export default class App extends Component {
    
    state = {
        range: 0,
        questions: []
    }

    async componentDidMount() {
        let response = await fetch('/post-questions', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                range: this.state.range
            })
        })
        let data = await response.json();
        this.setState({questions: data.questions});
    }

    componentWillUnmount = () => {

    };

    nextQuestions = async () => {
        let response = await fetch('/post-questions', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                range: this.state.range+1
            })
        })
        let data = await response.json();
        this.setState({
            range: this.state.range+1,
            questions: data.questions
        });
    }
    previousQuestions = async () => {
        if (this.state.range > 0) {
            let response = await fetch('/post-questions', {
                method: 'post', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    range: this.state.range-1
                })
            })
            let data = await response.json();
            this.setState({
                range: this.state.range-1,
                questions: data.questions
            });
        }
    }

    isInvalid = async (ix, qid) => {
        let response = await fetch('/invalidate-question', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                qid: qid
            })
        })
        let data = await response.json();
        if (data.status == 'ok') {
            let qs = this.state.questions.slice();
            qs[ix].question_fuzzy = 1;
            this.setState({questions: qs});
        }
        
    }

    isValid = async (ix, qid) => {
        let response = await fetch('/validate-question', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                qid: qid
            })
        })
        let data = await response.json();
        if (data.status == 'ok') {
            let qs = this.state.questions.slice();
            qs[ix].question_fuzzy=0;
            this.setState({questions: qs})
        }
    }

    render() {
        return (
            <div className='q-select'>
                {this.state.questions.map((q, ix) => {
                    return <div className={'question' + (q.question_fuzzy==0? '': ' invalid')} key={q.id}>
                        <span>{q.question_text}</span>
                        {!q.question_fuzzy? <button onClick={_ => this.isInvalid(ix, q.id)}>
                            <i className="fas fa-thumbs-up"></i>
                        </button>
                        : <button onClick={_ => this.isValid(ix, q.id)}>
                            <i className="fas fa-thumbs-down"></i>
                        </button>}
                    </div>
                })}
                <div className='forward-backward'>
                    <button onClick={this.previousQuestions}>&lt;</button>
                    <span>{this.state.range}</span>
                    <button onClick={this.nextQuestions}>&gt;</button>  
                </div>
            </div>
        )
    }
}