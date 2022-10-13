import { Component } from "react";
import css from "./Modal.module.css"

export class Modal extends Component {
    closeByEscape = (event) => {
        if(event.code === 'Escape') {
           this.props.closeModal();
        }
    }

    closeByBackdrop = (event) => {
        if(event.target === event.currentTarget) {
            this.props.closeModal();
        }
    }

    componentDidMount() {
       window.addEventListener('keydown', this.closeByEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeByEscape)
    }

    render () {
        const {image: {src, alt}, closeModal} = this.props;

        return (
            <div className={css.backdrop} onClick={this.closeByBackdrop}>
                <div className={css.modal}>
                    <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
                    <button className={css.modal__button} onClick={closeModal}>Close</button>
                </div>
            </div>
        )
    }
}