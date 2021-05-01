import React from 'react'
import Pairs from '../Pairs/Pairs'
// import TokenService from '../services/token-service'
import config from '../config'

export default class Flight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pairs: []
        }
    }
    static defautProps = {
        match: {
            params: {}
        }
    }
    //Get pairs inside flights
    componentDidMount() {
        // console.log(this.props, "prop check")
        // let currentUser = TokenService.getUserId();
        let getPairsInFlights = `${config.AUTH_ENDPOINT}/flights/${this.props.flight.id}/saved`
        // let getUserFlightsUrl = `${config.AUTH_ENDPOINT}/users/${currentUser}/flights`
        // console.log(getPairsInFlights, "pair list url")
        fetch(getPairsInFlights)
            .then(pairs => {
                if (!pairs.ok)
                    return pairs.json().then(e => Promise.reject(e));
                return pairs.json()
            })
            .then(pairs => {
                // console.log(pairs, "fetch check 1")
                this.setState({
                    pairs: pairs.pairs
                })
            })
            .catch(error => this.setState({
                error
            }))

        // console.log(this.state, "fetch check")
    }
    //delete flight
    handleClickDelete = e => {
        e.preventDefault()
        const flightId = this.props.flight.id
        // console.log(flightId, "delete id")
        fetch(`${config.AUTH_ENDPOINT}/flights/${flightId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${config.APP_API_TOKEN}`
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
                window.location = '/dashboard'
            })
            .catch(error => {
                console.error({ error })
            })
    }
    render() {
        // console.log(this.state.pairs, "pair check")
        // console.log(this.props, "prop check")
        const flightPairs = this.state.pairs
        const pairRender = flightPairs.map(pair => {
            return <li
                className="flight_pair box"
                key={pair.id}>
                <Pairs
                    pair={pair}
                    search={this.props.search}
                />
            </li>
        })
        // console.log(flightPairs, "Second check")
        return (
            <section className="flight_container">
                <div className="flight_header">
                    <h1>{this.props.flight.title}</h1>
                    <h4>{this.props.flight.description}</h4>
                </div>
                <ul id="flight_pairs">
                    {pairRender}
                </ul>
                <button
                    className='delete_flight'
                    type='button'
                    onClick={this.handleClickDelete}>
                    {' '}
        Delete Flight
      </button>

            </section>
        )
    }
}