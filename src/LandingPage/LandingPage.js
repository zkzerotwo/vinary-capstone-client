import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import NavBar from '../NavBar'


export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barToggle: false
        }
    }
    render() {
        return (
            <section className="landing foot">
                <header className="App-header">
                    <NavBar />
                </header>
                <h1 className="welcome ">Vinary</h1>
                <div className="intro-card">
                    <p>
                        Curate your own superstar food and beverage pairings on the fly! Search the database for delicious recipes and save them to your account with a beverage pairing of your choice. Wine? A cocktail? Create world's next great Vinary Pairing.
                    </p>
                </div>
                <SearchBar />
            </section>
        )
    }
}