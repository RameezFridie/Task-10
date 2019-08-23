import React from 'react';
import './Rules.css'
class Rules extends React.Component {
    render() {
        return (
            // Rules of the game
            <div className="rules">
                <h2>THE RULES FOR PLAYING "MEMORY"</h2>
                <ol>
                    <li className="rule-1">Mix up the cards (Each card will have a number behind it).</li>
                    <li className="rule-2">Cards will be faced down.</li>
                    <li className="rule-3">Turn over any two cards.</li>
                    <li className="rule-4">If the two cards match, keep them.</li>
                    <li className="rule-5">If they don't match, turn them back over.</li>
                    <li className="rule-6">Remember what was on each card and where it was.</li>
                    <li className="rule-7">Watch and remember during the other player's turn.</li>
                    <li className="rule-8">The game is over when all the cards have been matched.</li>
                    <li className="rule-9">The player with the most matches wins.</li>

                </ol>
            </div>
        )
    }
}

export default Rules