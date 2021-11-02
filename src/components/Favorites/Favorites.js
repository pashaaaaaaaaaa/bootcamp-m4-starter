import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Favorites.css';


class Favorites extends  Component {
    state = {
        title: 'Новый список',
        text: 'удалить',
        textOne: true
    }
    clickRemove = (index) =>{
        this.props.removeClick(index)
    }

    clickTextOne=()=>{
        this.state.textOne = !this.state.textOne
    }

    queryPost = () =>{
        this.setState({textOne: !this.state.textOne})
        this.props.funcPost()
    }

    changeInput = (e) => {
        this.setState({
            title: e.target.value
        })
        this.props.changeInput(e.target.value);
    }

    // componentDidUpdate(){
    //     const save = this.props.saveFilm
    //     const{movies}=this.state
    //     const copyMovies = [...movies, this.props.saveFilm]
    //     console.log(this.setState)
    //     this.setState({
    //         movies: copyMovies
    //     })
    // }
    
    render() { 
        const {title} = this.state;
        return (
            <div className="favorites">
                <input onChange={this.changeInput} className="favorites__name" />
                  <ul className="favorites__list">
                    {this.props.saveFilm.map((item) => {
                       return <p key={item.id}>{item.Title} {item.Year} <button className="X" onClick={this.clickRemove}>{this.state.text}</button></p>
                     }
                    )}
                </ul>
                {this.state.textOne ?
                <button
                    type="button"
                    className={`favorites__save ${title === 'Новый список' || title === '' ? 'disable':''}`}
                    onClick={this.queryPost}
                >
                    Сохранить список
                </button>
                :
                  <Link className="nav-link" to="/list" onClick={this.props.funcPost}>
                      Перейти в список
                 </Link>
                }
            </div>
        );
    }
}
 
export default Favorites;