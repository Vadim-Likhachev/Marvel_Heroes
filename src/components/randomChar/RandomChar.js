import { Component } from 'react';

import { SpinnerCircular } from 'spinners-react';
import MarvelService from '../../services/MarvelService';
import Error from '../error/error'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

        const spinner = loading ? <div className='randomchar__spinner'><SpinnerCircular style={{margin: 'auto'}} size={200} color={'#9F0013'}/></div> : null;
        const errorMessage = error ? <Error/> : null;
        const content = !(spinner || errorMessage) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                { spinner }
                { errorMessage }
                { content }
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
        
    const {name, description, thumbnail, homepage, wiki} = char;
    
    const notAvailable = thumbnail.includes('image_not_available') ? '_not-available' : '';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={`randomchar__img${notAvailable}`}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
         </div>
    )
}

export default RandomChar;