import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
// import Footer from '../Footer/Footer'
import NavBar from '../NavBar'
// import LootboxSearchBar from '../LootboxSearchBar/LootboxSearchBar'


export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barToggle: false
        }
    }
    toggleSearchBar = () => {
        const barSwitch = !this.state.barToggle
        this.setState({
            barToggle: barSwitch
        })
    }
    render() {
        return (
            <section className="landing foot">
                <header className="App-header">
                    <NavBar />
                </header>
                <h1 className="welcome box">Vinary</h1>
                <div className="intro-card box">
                    <p>Curate your own superstar food and beverage pairings on the fly! Search the database for delicious recipes and save them to your account with a beverage pairing of your choice. Wine? A cocktail? A tall glass of water? Youru call, but every pairing is a Vinary Pair.</p>
                </div>
                <SearchBar />
            </section>
        )
    }
}