import React, { Component } from 'react';

class Jokes extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            jokeId: this.props.match.params.id,
            joke: null,
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
  
    render () {
        const { joke, jokeId } = this.state;
        return (
            <div className="wrapper">
                <div className="container">
                    <p className="container-title">joke #{jokeId}</p>
                    <p className="container-content">{ joke }</p>
                    <ul className="container-btns">
                        <li className="container-btn__random" onClick={this.randomJoke}>Get random joke</li>
                        <li>Copy link to clipboard</li>
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