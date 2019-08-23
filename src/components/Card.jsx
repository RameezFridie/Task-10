import React from 'react';
import './Card.css';


class Card extends React.Component {
    render() {
        return(
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                    {this.props.card.flipped?
                        this.props.card.key:''}
                    </div>
                </div>
            </div>
        )
    }
}


export default Card