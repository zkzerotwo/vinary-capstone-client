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
    render() {
        // console.log(this.props, "prop check")
        const base = this.props.imgBaseUrl
        // console.log(this.state.summary, "results props")
        const entries = this.props.results.map(entry => {
            const imgUrl = base + entry.image
            // console.log(entry)
            // console.log(imgUrl, "image check")
            return (
                <li className="search_card box" key={entry.id}>
                    <div className="search-wrap">
                        <div className="search_poster">
                            <h2>{entry.title}</h2>
                            <img id="flight_image" alt={entry.title} src={imgUrl} />
                        </div>
                        <div className="search-deets">
                            <DetailTrigger entry={entry} />
                            {/* <a href={entry.sourceUrl}>Learn More</a> */}
                            {TokenService.hasAuthToken() ? <ExtendFlight imageUrl={imgUrl} entry={entry} /> : ''}
                        </div>
                    </div>
                </li>
            )
        })
        return (
            <section className="search-results">
                {/* <h3>RESULTS</h3> */}
                <hr />
                <ul className="entries">
                    {entries}
                </ul>

            </section>
        )
    }
}
