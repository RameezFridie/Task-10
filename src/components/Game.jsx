/* eslint-disable default-case */
/* eslint-disable no-self-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-cond-assign */
/* eslint-disable react/no-direct-mutation-state */

// Import react
import React from 'react';
// Import card
import Card from './Card';
// Import style sheet
import './Game.css'

// Initial game states
const game_states_init = {
    FC: "Waiting for the 1st card",
    SC: "Waiting for the 2nd card",
    W: "Wrong",
    DONE: "You Won"
};

// Helper function that creates an array
function create_array(x, y) {
    return Array.apply(null, Array(x)).map(function(e) {
        return Array(y);
    });
};

// Helper function that randomizes the numbers
function shuffle_array(a) {
    var j, x, i;
    for (i = a.length; i; i --) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    };
};


class Game extends React.Component {
    // Constructor to set initial state and array
    constructor(props) {
        super(props);
        // create array
        const card_flip = create_array(this.props.height, this.props.width)
        // Randomize array and push into new array
        const random_numbers = [];
        for (var random_index = 0; random_index < this.props.height * this.props.width; random_index ++) {
            random_numbers.push(Math.floor(random_index / 2) + 1);
        };
        shuffle_array(random_numbers);
        // For loop that assigns value row
        for(var row_of_index= 0; row_of_index < this.props.height; row_of_index ++) {
            // For loop that assigns values to column
            for(var col_of_index= 0; col_of_index < this.props.width; col_of_index ++) {
                // Each card gets a value from array
                card_flip[row_of_index][col_of_index] = {
                    key: random_numbers[row_of_index * this.props.width + col_of_index],
                    flipped: false,
                    row_index: row_of_index,
                    col_index: col_of_index
                }
            }
        // Set initial state
        this.state= {
            card: card_flip,
            current_state: game_states_init.FC,
            first_card: null,
            second_card: null,
            count: 0,
            check: 7
            }
        }
    }

    // Function that restarts game
    restart_game() {
        window.location = window.location
    }
    // function for what happens when a card is clicked
    card_click(card) {
        // If card is not clicked
        if(!card.flipped){
            // var count = 0
            // eslint-disable-next-line default-case
            // switch statement that updates the state
            switch(this.state.current_state) {
                // First state when waiting for the first card
                case game_states_init.FC:
                // eslint-disable-next-line react/no-direct-mutation-state
                    // Sets the state of card to true
                    this.state.card[card.row_index][card.col_index].flipped = true;
                    // Set state to waiting for the second card 
                    this.setState({
                        card: this.state.card,
                        first_card: card,
                        current_state: game_states_init.SC,
                        check: this.state.check,
                        count: this.state.count
                    })
                    break
                // Second state or case that waits for the next card
                case game_states_init.SC:
                    this.state.card[card.row_index][card.col_index].flipped = true;
                    // If the card count is equal to the card check of 7 the game is finished and the gam will have been won so move to the last case
                    if (this.state.count === this.state.check) {
                        this.setState({
                            current_state: game_states_init.DONE,
                            // card: this.state.card,
                            // count: this.state.count,
                            // check: this.state.check
                        })
                        // console.log("counter" + this.state.count)
                    }
                    // If the card value of the 2nd card matches the value of the first card keep both cards as flipped and move back to the first state or first case
                    else if(this.state.first_card.key === card.key) {
                        // count ++
                        this.setState({
                            current_state: game_states_init.FC,
                            card: this.state.card,
                            count: this.state.count + 1,
                            check: this.state.check
                        })
                        // console.log("card state" + this.state.count)
                    }
                    // If the cards do not match then set the state to case wrong
                    else{
                        this.setState({
                            current_state: game_states_init.W,
                            card: this.state.card,
                            second_card: card
                        })
                        // console.log("wrong card" + this.state.count)
                    }
                    break
                    // When the  case is wrong set both cards from flipped true to false
                case game_states_init.W:
                    this.state.card[this.state.first_card.row_index][this.state.first_card.col_index].flipped = false;
                    this.state.card[this.state.second_card.row_index][this.state.second_card.col_index].flipped = false;
                    this.state.card[card.row_index][card.col_index].flipped = true;
                    this.setState({
                        current_state: game_states_init.SC,
                        card: this.state.card,
                        first_card: card

                    })

                    break

            }
        }
    }

    render() {
        // Push cards into a table with the td being the cards that have the array data
        const cards_rendered = this.state.card.map(
            (row_of_cards, row_of_index)=> <tr>
                {row_of_cards.map((card, index_of_row)=> <td onClick={() =>this.card_click(card)}>
                    <Card card={card}/>
                </td>)}
            </tr>)
        return (
            <div className="game">
                {/* Display the state */}
                <div className="the_state">
                    {this.state.current_state}
                </div>
                <table className="main_table">
                    <tbody className="main_body">
                        {/* Render the array cards */}
                    {cards_rendered}
                    </tbody>
                </table>
                <div className="button">
                    {/* Restart button */}
                    <button className="restart_button" onClick={this.restart_game.bind(this)}>Restart</button>
                </div>
            </div>
        );
    }
}

export default Game;