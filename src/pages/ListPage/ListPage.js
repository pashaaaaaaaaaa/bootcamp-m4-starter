import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        title:''
    }
    componentDidMount() {
        // const id = this.props.match.params;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${this.props.newKey}`)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                title: data.title
            })
            data.movies.forEach((elem) => {
                fetch(`http://www.omdbapi.com/?i=${elem}&apikey=4615be4`)
                .then((res) => res.json())
                .then((data) => {
                    const copyState = [...this.state.movies]
                    copyState.push({title:data.Title, year: data.Year, imdbID: data.imdbID})
                    this.setState({movies: copyState})
                })
            })
        })
        .catch((rej) => console.log(rej))
        // TODO: запросы к серверу по всем imdbID
    }
    render() { 
        console.log(this.props)
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href="https://www.imdb.com/title/tt0068646/" target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;