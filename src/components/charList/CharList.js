import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import { SpinnerCircular } from 'spinners-react';
import Error from '../error/error';

import './charList.scss';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false

    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars()
    }

    updateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
    }

    onCharsLoaded = (chars) => {
        this.setState({
            chars: [...chars],
            loading: false
        })
    }

    onRenderChars(chars) {
        const charList = chars.map((char) => {
            const imgStyle = char.thumbnail.includes('image_not_available') ? {'objectFit' : 'fill'} : {'objectFit' : 'cover'};
                        
            return (
                <li className="char__item"
                    key={char.id}                 
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
        const {chars, loading, error} = this.state;
        const viewChars = this.onRenderChars(chars)

        const spinner = loading ? <div className='randomchar__spinner'><SpinnerCircular style={{margin: 'auto'}} size={200} color={'#9F0013'}/></div> : null;
        const errorMessage = error ? <Error/> : null;
        const content = !(spinner || errorMessage) ? viewChars : null;
        
        return (
            <div className="char__list">
                { spinner }
                { errorMessage }
                { content }
                
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;