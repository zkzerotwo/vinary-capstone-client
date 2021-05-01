import React from 'react'
import DetailTrigger from '../DetailTrigger/DetailTrigger'
import ExtendFlight from '../ExtendFlight/ExtendFlight'
import TokenService from '../services/token-service'

export default class ResultBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: ""
        }
    }
    render() {
        const base = this.props.imgBaseUrl
        const entries = this.props.results.map(entry => {
            const imgUrl = base + entry.image
            return (
                <li className="search_card box" key={entry.id}>
                    <div className="search-wrap">
                        <div className="search_poster">
                            <h2>{entry.title}</h2>
                            <img id="flight_image" alt={entry.title} src={imgUrl} />
                        </div>
                        <div className="search-deets">
                            {/*If logged in, show flight submission form*/}
                            <DetailTrigger entry={entry} />
                            {TokenService.hasAuthToken() ? <ExtendFlight imageUrl={imgUrl} entry={entry} /> : ''}
                        </div>
                    </div>
                </li>
            )
        })
        return (
            <section className="search-results">
                <hr />
                <ul className="entries">
                    {entries}
                </ul>

            </section>
        )
    }
}
