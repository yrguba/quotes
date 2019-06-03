import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
        fetch('https://api.icndb.com/jokes/' + jokeId)
            .then(response => response.json())
            .then(data => this.setState({ joke: data.value.joke }));
    }

    randomJoke = () => {
        fetch('https://api.icndb.com/jokes/random/')
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
                    <a href="https://github.com/yrguba/quotes">github</a>
                </footer>
            </div>
            
        );
    }
}
export default Jokes