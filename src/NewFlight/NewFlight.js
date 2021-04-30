import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'
// import { flightsByOwner } from '../flight-handlers'
import ValidationError from '../ValidationError'

export default class NewFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            title: {
                value: '',
                touched: false
            },
            description: {
                value: '',
                touched: false
            },
            owner: {
                value: '',
                touched: false
            },
        }
    }
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    updateTitle = (title) => {
        this.setState({
            title: {
                value: title,
                touched: true
            }
        })
    }

    updateDescription = (description) => {
        this.setState({
            description: {
                value: description,
                touched: true
            }
        })
    }
    setOwner = (owner) => {
        this.setState({
            owner: {
                value: owner,
                touched: true
            }
        })
    }
    componentDidMount() {
        let currentUser = TokenService.getUserId();
        console.log(currentUser, "user id")
        let getUserFlightsUrl = `${config.AUTH_ENDPOINT}/users/${currentUser}/flights`
        fetch(getUserFlightsUrl)
            .then((flights) => {
                if (!flights.ok)
                    return flights.json().then(e => Promise.reject(e));
                return flights.json()
            })
            .then((flights) => {
                console.log(flights, "flight list")
                this.setOwner(currentUser)
                this.setState({
                    // flights: flightsByOwner(flights, currentUser),

                })
            })
            .catch(
                (error => this.setState({ error }))
            )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const description = this.state.description.value
        const title = this.state.title.value
        const owner = this.state.owner.value
        console.log(description, title, owner, "data check")
        let payload = {
            title: title,
            description: description,
            flight_owner: owner
        }
        // console.log(payload)
        this.setState({
            error: null
        })
        fetch(`${config.AUTH_ENDPOINT}/flights`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${config.APP_API_TOKEN}`
            },
            body: JSON.stringify(payload),
        })
            .then((flightsRes) => {
                console.log(flightsRes)
                if (!flightsRes.ok) {
                    return flightsRes.json().then(e => Promise.reject(e));
                }
                window.location = '/dashboard'
                return flightsRes.json()

            })
            .then((newFlight) => {
                console.log(newFlight)
            })

            .catch(error => this.setState({ error }))
    }
    validateFlightSelect() {
        const flightIsSelected = this.state.flight.value;
        return !flightIsSelected;
    }
    validateTitle() {
        const title = this.state.title.value.trim();
        if (title.length === 0) {
            return 'Title is required'
        }
    }

    render() {
        // console.log(this.state.flights, this.state.owner.value, "Create loot check")
        return (
            <section>
                <form className="create_flight box" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='flightTitle'>
                            Create a New Flight
              {' '}

                        </label>
                        <input
                            type='text'
                            title='flightTitle'
                            id='flightTitle'
                            placeholder='Flight Title'
                            onChange={e => this.updateTitle(e.target.value)}
                            required
                        />
                    </div>
                    {this.state.title.touched && (<ValidationError message={this.validateTitle()} />)}
                    <label htmlFor="description">
                        Flight Description
                        </label>
                    <textarea
                        id="description"
                        title="description"
                        placeholder="What makes this collection special?"
                        onChange={e => this.updateDescription(e.target.value)}
                    ></textarea>
                    <button
                        type='submit'
                    // disabled={this.validateTitle() || this.validateFlightSelect()}
                    >
                        Save
            </button>
                </form>
            </section>

        )
    }
}