import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import { SpinnerCircular } from 'spinners-react';
import Error from '../error/error';

import './charList.scss';

class CharList  extends Component {

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

    render() {
        const {chars, loading, error} = this.state;

        const spinner = loading ? <div className='randomchar__spinner'><SpinnerCircular style={{margin: 'auto'}} size={200} color={'#9F0013'}/></div> : null;
        const errorMessage = error ? <Error/> : null;
        const content = !(spinner || errorMessage) ? <View chars={chars}/> : null;
        
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

const View = ({chars}) => {

    return (
        <ul className="char__grid">
            {
                chars.map((char, index) => {
                    return (
                        <li key={index} className="char__item">
                            <img src={char.thumbnail} alt={char.name}/>
                            <div className="char__name">{char.name}</div>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default CharList;