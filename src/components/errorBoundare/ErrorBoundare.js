import { Component } from "react";

import Error from '../error/error';

class ErrorBoundare extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return (
                <Error/>
            )
        }

        return(
            this.props.children
        )
    }
}

export default ErrorBoundare;