import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import { SpinnerCircular } from 'spinners-react';
import Error from '../error/error';

import './charList.scss';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newCharLoading: false,
        offset: 210,
        charEnded: false
    }

    refItems = []

    addRefItems = (elem) => {
        this.refItems.push(elem)
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    focusItem = (event) => {       
        if (this.refItems) {
            this.refItems.forEach(item => {
                item.className = item === event.target ? 'char__item char__item_selected' : 'char__item'
            })
        }
       
    }

    updateChars = (offset) => {
        this.onCharLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
    }

    onCharLoading = () => {
        this.setState({
            newCharLoading: true
        })
    }

    onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars < 9) {
            ended = true;
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newCharLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onRenderChars(chars) {
        const charList = chars.map((char) => {
            const imgStyle = char.thumbnail.includes('image_not_available') ? {'objectFit' : 'fill'} : {'objectFit' : 'cover'};
                        
            return (
                <li className="char__item"
                    ref={this.addRefItems}
                    key={char.id}
                    tabIndex={0}
                    onFocus={this.focusItem}                 
                    onClick={() => this.props.onCharSelected(char.id)}>
                      <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                      <div className="char__name">{char.name}</div>
                </li>
            )
        })
        
        return (
            <ul className="char__grid">
                {charList}
            </ul>
        )
    }

    render() {
        const {chars, loading, error, newCharLoading, offset, charEnded} = this.state;
        const viewChars = this.onRenderChars(chars)

        const spinner = loading ? <div className='randomchar__spinner'><SpinnerCircular style={{margin: 'auto'}} size={200} color={'#9F0013'}/></div> : null;
        const errorMessage = error ? <Error/> : null;
        const content = !(spinner || errorMessage) ? viewChars : null;
        
        return (
            <div className="char__list">
                { spinner }
                { errorMessage }
                { content }
                
                <button className="button button__main button__long"
                        disabled={newCharLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.updateChars(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;