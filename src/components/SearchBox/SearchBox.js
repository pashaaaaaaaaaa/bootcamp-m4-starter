import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {
   
    // searchBoxSubmitHandler = (e) => {
    //     e.preventDefault();
    //     fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=4615be4`)
    //     .then(res => res.json())
    //     .then(data => {
    //     console.log(data);
    //     return data
    // })
    // }
    render() {

         return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.props.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={this.props.value}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={(event)=>this.props.searchLineChangeHandler(event.target.value)}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!this.props.value}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;