import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import github_icon from './icons/github-logo.svg';

const URL_API = 'https://api.icndb.com/jokes/';
const URL_API_RANDOM = 'https://api.icndb.com/jokes/random/';

class Jokes extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            jokeId: this.props.match.params.id,
            joke: null,
            value: window.location,
            copied: false
        };
    }
  
    componentDidMount() {
        const jokeId = this.state.jokeId;
        fetch(URL_API + jokeId)
            .then(response => response.json())
            .then(data => this.setState({ joke: data.value.joke }));
    }

    randomJoke = () => {
        fetch(URL_API_RANDOM)
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    joke: data.value.joke, 
                    jokeId: data.value.id 
                });
                this.props.history.push('/jokes/' + data.value.id);
            });
    }

    onCopy = () => {
        this.setState({copied: true});
    }
  
    render () {
        const { joke, jokeId } = this.state;
        return (
            <div className="wrapper">
                <div className="container">
                    <p className="container-title">joke #{jokeId}</p>
                    <p className="container-content">{ joke }</p>
                    <ul className="container-btns">
                        <li className="container-btn__random" onClick={this.randomJoke}>Get random joke</li>
                        <li>
                            <CopyToClipboard onCopy={this.onCopy} text={this.state.value}>
                            <span>Copy link to clipboard</span>
                            </CopyToClipboard>
                        </li>
                    </ul>
                </div>
                <footer>
                    <a href="https://github.com/yrguba/quotes" target="_blank">
                        <img src={github_icon}/>
                    </a>
                </footer>
            </div>
            
        );
    }
}
export default Jokes