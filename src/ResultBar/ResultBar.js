import React from 'react'
import DetailTrigger from '../DetailTrigger/DetailTrigger'
// import LootBox from '../LootBox/LootBox'
// import LootboxContext from '../LootboxContext'
import ExtendFlight from '../ExtendFlight/ExtendFlight'
import TokenService from '../services/token-service'
// import AddToLootbox from '../AddToLootbox/AddToLootbox'

export default class ResultBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: ""
        }
    }
    // static contextType = LootboxContext

    // recipeDeetSearch = (recipeId) => {
    //     const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/` + recipeId + `/information`
    //     // console.log(url, "urlcheck")
    //     fetch(url, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-key": "d36a838384mshc96686c738af0aap11fd78jsnf972d810e8ef",
    //             "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    //         }
    //     })
    //         .then(response => response.json()

    //         )
    //         .then(response =>

    //             this.setState({
    //                 summary: response.summary
    //             })
    //         )
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }

    render() {
        const base = this.props.imgBaseUrl
        // console.log(this.state.summary, "results props")
        const entries = this.props.results.map(entry => {
            const imgUrl = base + entry.image
            // this.recipeDeetSearch(entry.id)
            // console.log(imgUrl, "image check")
            return (
                <li className="search_card" key={entry.id}>
                    <img alt={entry.title} src={imgUrl} />
                    <div>
                        <p>{entry.title}</p>
                        <p>{entry.synopsis}</p>
                        <DetailTrigger recipeId={entry.id}/>
                        <a href={entry.url}>Learn More</a>
                        {TokenService.hasAuthToken() ? <ExtendFlight entryType={this.props.seriesType} entryId={entry.mal_id} /> : ''}
                    </div>
                </li>
            )
        })
        return (
            <section className="search-results">
                <h3>RESULTS</h3>
                <hr />
                <ul className="entries">
                    {entries}
                </ul>

            </section>
        )
    }
}
