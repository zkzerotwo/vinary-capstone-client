import React from 'react'
import config from '../config'
import TokenService from '../services/token-service'
// import ValidationError from '../ValidationError'

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
            // malId: '',
            // pairType: '',
            beverageTitle: {
                value: '',
                touched: false
            },
            // referenceUrl: '',
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
            flightId: {
                value: flightId,
                touched: true
            }
        })
        // console.log(flightId)
    }
    // updateMalId = (select) => {
    //     this.setState({
    //         malId: {
    //             value: select,
    //             touched: true
    //         }
    //     })
    // console.log(select)
    // }

    updateBeverageDescription = (description) => {
        this.setState({
            beverageDescription: {
                value: description,
                touched: true
            }
        })
    }
    // updateSumamry = (name) => {
    //     this.setState({
    //         summary: {
    //             value: name,
    //             touched: true
    //         }
    //     })
    //     // console.log(name)
    // }
    // updateInstructions = (type) => {
    //     this.setState({
    //         instructions: {
    //             value: type,
    //             touched: true
    //         }
    //     })
    //     // console.log(type)
    // }
    updateBeverageTitle = (url) => {
        this.setState({
            referenceUrl: {
                value: url,
                touched: true
            }
        })
        // console.log(url)
    }
    // updateImageUrl = (imageUrl) => {
    //     this.setState({
    //         imageUrl: {
    //             value: imageUrl,
    //             touched: true
    //         }
    //     })
    // console.log(imageUrl)
    // }
    componentDidMount() {
        //get user id and load flights
        let currentUser = TokenService.getUserId();
        let getUserFlightsUrl = `${config.AUTH_ENDPOINT}/users/${currentUser}/flights`
        console.log(getUserFlightsUrl)
        fetch(getUserFlightsUrl)
            .then((flights) => {
                if (!flights.ok)
                    return flights.json().then(e => Promise.reject(e));
                return flights.json()
            })
            .then((flights) => {
                console.log(flights, "flight list")
                this.setState({
                    flights: flights
                })
            })
            .catch(
                (error => this.setState({ error }))
            )
    }

    handleSubmit = (e) => {
        //add pairs to selected flight
        e.preventDefault();
        // console.log(this.props.entryId)
        const entryEndpoint = `${config.API_ENDPOINT_SAVE}`
        const { id, servings, sourceUrl, title } = this.props.entry
        // const recipeId = this.props.entry.id
        // const entryType = this.props.entryType
        const entryUrl = `${entryEndpoint}/${id}/information`
        // console.log(entryUrl)
        const bevTitle = this.state.beverageTitle.value
        const bevDescription = this.state.beverageDescription.value
        // const flightId = this.state.flightId.value
        // Fetch data from recipe ID
        fetch(entryUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d36a838384mshc96686c738af0aap11fd78jsnf972d810e8ef",
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
                // console.log(entryData, "entry data")
                this.setState({
                    summary: entryData.summary,
                    instructions: entryData.instructions
                })
                const imageUrl = this.props.imageUrl
                let payload = {
                    beverage_title: bevTitle,
                    title: title,
                    servings: servings,
                    recipe_description: this.state.summary,
                    instructions: this.state.instructions,
                    flight_id: this.state.flightId,
                    beverage_description: bevDescription,
                    url: sourceUrl,
                    recipe_image_url: imageUrl
                }
                // console.log(payload, "payload")
                fetch(`${config.AUTH_ENDPOINT}/pairs`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `${config.APP_API_TOKEN}`
                    },
                    body: JSON.stringify(payload),
                })
                    .then((pairPost) => {
                        // console.log(pairPost)
                        if (!pairPost.ok) {
                            return pairPost.json().then(e => Promise.reject(e));
                        }
                        return pairPost.json()
                    })
                    // .then((newFlight) => {
                    //     console.log(newFlight)
                    // })
                    .catch(error => this.setState({ error }))
            })
            .catch(err => {
                console.error(err);
            })


    }

    //TODO: add submission validation
    render() {
        // console.log(this.state.flights, "data check")
        // console.log(this.props.entry, "entry check")
        const flightList = this.state.flights.map(flight => {
            // console.log(flight.title)
            return (
                <option
                    key={flight.id}
                    value={flight.id}>
                    {flight.title}
                </option>
            )
        })
        console.log(flightList, "list of flights")
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    {/* <h4>{this.props.entryId}</h4> */}
                    <div className="pair_setup">
                        <label htmlFor='beverage_title'>
                            Bev Pairing
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
                        // && (<ValidationError message={this.validateDropName()} />)
                    }
                    <label htmlFor="description">
                        Flavor Profile
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
                        Save in *
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
                    // disabled={
                    // this.validateTitle() || 
                    // this.validateFlightSelect()}
                    >
                        Save
    </button>
                </form>
            </div>
        )
    }
}