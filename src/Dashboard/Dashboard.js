import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import NewFlight from '../NewFlight/NewFlight'
import Flight from '../Flight/Flight'
import Navbar from '../NavBar'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            youSure: false
        }
    }
    static defautProps = {
        match: {
            params: {}
        }
    }
    deleteWarning = (e) => {
        const justChecking = this.state.youSure
        if (justChecking === false) {
            this.setState({
                youSure: true
            })
        }
        this.setState({
            youSure: false
        })
    }
    handleDeleteUser = (e) => {
        //User login
        let currentUser = TokenService.getUserId();
        TokenService.clearAuthToken()
        window.location = '/'

        const deleteEndpoint = `${config.AUTH_ENDPOINT}/users/${currentUser}`
        fetch(deleteEndpoint, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${config.APP_API_TOKEN}`

            }
        })
            .then((user) => {
                if (!user.ok)
                    return user.json().then(e => Promise.reject(e));
                return user.json()
            })
            .catch(
                (error => this.setState({ error }))
            )
    }
    componentDidMount() {
        let currentUser = TokenService.getUserId();

        //if the user is not logged in, send him to landing page
        if (!TokenService.hasAuthToken()) {
            window.location = '/'
        }
        let getUserFlightsUrl = `${config.AUTH_ENDPOINT}/users/${currentUser}/flights`
        fetch(getUserFlightsUrl)
            .then((flights) => {
                if (!flights.ok)
                    return flights.json().then(e => Promise.reject(e));
                return flights.json()
            })
            .then((flights) => {
                this.setState({
                    flights: flights.flights
                })
            })
            .catch(
                (error => this.setState({ error }))
            )
    }
    render() {
        // Flights mappepd to component
        const pulledFlights = this.state.flights
        const userFlights = pulledFlights.map(flight => {
            return (
                <li key={flight.id} className="flight_display box">
                    <Flight flight={flight} />
                </li>
            )
        })
        return (
            <section className="users_flights foot">
                <div className='_deflightte'>
                    <Navbar />
                    <h2>Cache Board</h2>
                    <div className="create_flight"></div>
                    <NewFlight />
                    <ul className="flights_list">
                        {userFlights}
                    </ul>
                    <button
                        type='button'
                        onClick={(e) => { 
                            if (window.confirm('Are you sure you want to delete your account?')) { this.handleDeleteUser(e) }; }}>
                        {' '}
        Delete User
      </button>
                </div>
            </section>
        )
    }
}