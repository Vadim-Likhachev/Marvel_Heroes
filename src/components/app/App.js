import {Component} from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundare from '../errorBoundare/ErrorBoundare';

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundare>
                        <RandomChar/>
                    </ErrorBoundare>  

                    <div className="char__content">
                        <ErrorBoundare>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundare>
                        
                        <ErrorBoundare>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundare>                       
                    </div>
                    
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }

}

export default App;