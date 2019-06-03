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
            <div className="container">
                <p className="container-title">joke #{jokeId}</p>
                <p className="container-content">{ joke }</p>
                <p className="container-btn" onClick={this.randomJoke}>Get random joke</p>
            </div>
        );
    }
}
export default Jokes