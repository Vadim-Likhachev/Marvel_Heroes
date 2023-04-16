import { Component } from 'react';

import { SpinnerCircular } from 'spinners-react';
import MarvelService from '../../services/MarvelService';
import Error from '../error/error';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const {char, loading, error} = this.state;

        
        const spinner = loading ? <div className='randomchar__spinner'><SpinnerCircular style={{margin: 'auto'}} size={200} color={'#9F0013'}/></div> : null;
        const errorMessage = error ? <Error/> : null;
        const content = !(spinner || errorMessage || !char) ? <View char={char}/> : null;
        const skeleton = spinner || errorMessage || content ? null : <Skeleton/>
        

        return (
            <div className="char__info">
                { spinner }
                { errorMessage }
                { content }
                { skeleton }
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const imgStyle = char.thumbnail.includes('image_not_available') ? {'objectFit' : 'fill'} : {'objectFit' : 'cover'};

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            
            { comics.length === 0 ? 'List of comics coming soon!' : null } 

            <ul className="char__comics-list">
                {
                    comics.map((item, index) => {
                        if (index >= 10) return null;

                        return (
                            <li className="char__comics-item"
                                key={index}>
                                    {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;