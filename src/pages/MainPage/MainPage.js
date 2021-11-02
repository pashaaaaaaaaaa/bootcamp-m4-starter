import React from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

class MainPage extends React.Component {
    state= {
        title:"",
        arrFilm:[],
        movies:[],
        searchLine: ''

    }
    // ======функция для отрисовки ( fatch zapros )======///
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e });

    }

    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=4615be4`)
        .then(res => res.json())
        .then(data => {
            if(data.Search){
                this.setState({
                    movies: data.Search
                })
            } else{
                alert('THIS NOT FILM')
            }
        })
    }
    

    // =======post zapros=====//


    functionPost = () =>{
       const obj = {
            title:this.state.title,
            movies: this.state.arrFilm.map(item => item.imdbID)
        }

        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        // fetch('https://acb-api.algoritmika.org/api/movies/list/id')
        .then(res => res.json())
        .then(data=>{
            this.props.functionCallBack(data.id)
            // console.log(data)
        })   
        .catch(() => {
            alert('такого фильм не существует ')
        } )
    }   
        

    //=========addional==========//
    
    addFilm = (film) =>{
        console.log(this.state.arrFilm)
        const copyArrfilm = [...this.state.arrFilm]
        const newFind = copyArrfilm.findIndex(element =>{
            return element.imdbID == film.imdbID
        })
        console.log("это тут",newFind)
        if(newFind === -1){
            console.log(1)
             copyArrfilm.push(film)
        }
        console.log(film)
        console.log(newFind)
        this.setState({arrFilm:copyArrfilm})
    } 

    //==========deleted==========//
    
    removeFilm = (index) =>{
        const{arrFilm}= this.state
        const copyArrfilm = [...arrFilm]
        copyArrfilm.splice(index, 1);
        this.setState({arrFilm:copyArrfilm})
    }
    changeInput= (value)=>{
        this.setState({title: value})
    }

    //=========================================================

    render() { 
        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox searchBoxSubmitHandler={this.searchBoxSubmitHandler} searchLineChangeHandler={this.searchLineChangeHandler} value={this.state.searchLine} />
                        </div>
                        <div className="main-page__movies">
                            <Movies addFilm={this.addFilm} movies={this.state.movies}/>
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites  saveFilm={this.state.arrFilm} removeClick={this.removeFilm} funcPost={this.functionPost} changeInput={this.changeInput}/>
                    </aside>
                </main>
            </div>
        );
    }
}
 
export default MainPage;