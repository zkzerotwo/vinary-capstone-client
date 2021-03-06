import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'

export default class ExtendFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            summary: {
                value: '',
                touched: false
            },
            instructions: {
                value: '',
                touched: false
            },
            beverageDescription: {
                value: '',
                touched: false
            },
            flight_id: {
                value: 0,
                touched: true
            },
            beverageTitle: {
                value: '',
                touched: false
            },
            imageUrl: '',
            isAdded: false
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
    updateFlightId = (flightId) => {
        this.setState({
            flight_id: {
                value: flightId,
                touched: true
            }
        })
    }

    updateBeverageDescription = (description) => {
        this.setState({
            beverageDescription: {
                value: description,
                touched: true
            }
        })
    }
    updateBeverageTitle = (title) => {
        this.setState({
            beverageTitle: {
                value: title,
                touched: true
            }
        })
    }
    componentDidMount() {
        //get user id and load flights
        let currentUser = TokenService.getUserId();
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

    handleSubmit = (e) => {
        //add pairs to selected flight
        e.preventDefault();
        const entryEndpoint = `${config.API_ENDPOINT_SAVE}`
        const { id, servings, sourceUrl, title } = this.props.entry
        const entryUrl = `${entryEndpoint}/${id}/information`
        const bevTitle = this.state.beverageTitle.value
        const bevDescription = this.state.beverageDescription.value
        const flightId = parseInt(this.state.flight_id.value)
        // Fetch data from recipe ID
        fetch(entryUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${config.SEARCH_TOKEN}`,
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
            .then(entryData => {
                if (!entryData.ok) {
                    throw new Error('Something went wrong, please try again later.');
                }
                return entryData.json()
            })
            .then(entryData => {
                this.setState({
                    summary: entryData.summary,
                    instructions: entryData.instructions
                })
                const imageUrl = this.props.imageUrl
                let payload = {
                    beverage_title: bevTitle,
                    recipe_title: title,
                    recipe_id: id,
                    servings: servings,
                    flight_id: flightId,
                    beverage_description: bevDescription,
                    url: sourceUrl,
                    recipe_image_url: imageUrl
                }
                fetch(`${config.AUTH_ENDPOINT}/pairs`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `${config.APP_API_TOKEN}`
                    },
                    body: JSON.stringify(payload),
                })
                    .then((pairPost) => {
                        if (!pairPost.ok) {
                            return pairPost.json().then(e => Promise.reject(e));
                        }
                        window.location = '/dashboard'
                        return pairPost.json()
                    })
                    .catch(error => this.setState({ error }))
            })
            .catch(err => {
                console.error(err);
            })


    }

    //TODO: add submission validation
    render() {
        const flightList = this.state.flights.map(flight => {
            return (
                <option
                    key={flight.id}
                    value={flight.id}>
                    {flight.title}
                </option>
            )
        })
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="pair_setup">
                        <label htmlFor='beverage_title'>
                            <h2>Bev Pairing</h2>
      {' '}
                        </label>
                        <input
                            type='text'
                            title='beverage_title'
                            id='beverage_title'
                            placeholder="What's a good drink to pair?"
                            onChange={e => this.updateBeverageTitle(e.target.value)}
                            required
                        />
                    </div>
                    {this.state.beverageTitle.touched
                    }
                    <label htmlFor="description">
                       <h2>Flavor Profile</h2>
                </label>
                    <textarea
                        id="description"
                        title="description"
                        placeholder="What makes that pairing magical?"
                        onChange={e => this.updateBeverageDescription(e.target.value)}
                    >
                    </textarea>
                    <label
                        htmlFor="flights"
                    >
                        Save in 
                    <select
                            id="flights"
                            name="flights"
                            onChange={e => this.updateFlightId(e.target.value)}
                            defaultValue="Select Flight"
                        >
                            <option
                                disabled
                            >
                                Select Flight
                            </option>
                            {flightList}
                        </select>
                    </label>
                    <button
                        type='submit'
                    >
                        Save
    </button>
                </form>
            </div>
        )
    }
}