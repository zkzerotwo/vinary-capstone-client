import React from 'react'
import config from '../config'
import DetailTrigger from '../DetailTrigger/DetailTrigger'

export default class Pairs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dash: false,
            stepToggle: false
        }
    }
    handleClickDelete = e => {
        e.preventDefault()
        const pairId = this.props.pair.id
        // console.log(pairId, "delete id")
        fetch(`${config.AUTH_ENDPOINT}/pairs/${pairId}`, {
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
    componentDidMount() {
        this.windowCheck()
    }
    windowCheck() {
        if (!this.props.search) {
            this.setState({
                dash: true
            })
        }
    }

    toggleRecipe = () => {
        this.setState({
            stepToggle: !this.state.stepToggle
        })
    }
    lootSearchPair() {
        const pair = this.props.pair
        return (
            <>
                <div className="recipe-poster">
                    <h3>
                        {pair.recipe_title}
                    </h3>
                    <img id="flight_image" onClick={() => this.toggleRecipe()}alt={pair.recipe_title} src={pair.recipe_image_url} />
                </div>

                {/* { this.state.stepToggle === false ? <></> : <DetailTrigger dash={this.state.dash}
                        entry={pair}
                    /> } */}
                <div className="recipe-holder">
                    <DetailTrigger dash={this.state.dash}
                        entry={pair}
                    />
                    <div className="bev_pair">
                        <h3>Bev Pairing</h3>
                        <p>
                            {pair.beverage_title}
                        </p>
                        <p>
                            {pair.beverage_description}
                        </p>
                        <a href={pair.url}>
                            Learn More About the Dish
                    </a>
                    </div>
                    <button
                        className='pair_delete'
                        type='button'
                        onClick={this.handleClickDelete}>
                        {' '}
                         Delete Pair
                </button>
                </div>

            </>
        )
    }

    render() {
        // console.log(this.props.pair, "pair props")
        // console.log(this.state.dash, "dash check")
        // console.log(this.props.location)
        const check = this.state.dash
        const pair = this.props.pair
        // console.log(this.props.search, "check check")
        return (
            <div className="pair_list">
                {check ? this.lootSearchPair() :
                    <>
                        <h3>
                            {pair.pair_name}
                        </h3>

                        <img alt={pair.pair_name} src={pair.recipe_image_url} />
                        <p>
                            {pair.pair_description}
                        </p>
                        <a href={pair.url}>
                            Learn More
                            </a>
                    </>
                }
            </div>
        )
    }
}