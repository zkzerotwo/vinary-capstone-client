import React from 'react'
import config from '../config'

class DetailTrigger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summary: "",
            instructions: "Instructions \n and stuff",
            stepToggle: false,
            newLine: []
        }
    }
    static defaultProps = {
        dash: false,
        
    }
    //Check if instructions are parsed with \n
    splitCheck = check => {
        // console.log(check, "datacheck", this.state)
        const split = check
        if (!split.includes('\n')) {
            this.setState({
                instructions: check
            })
        } else {
            this.setState({
                instructions: check
            })
        }
    }
    componentDidMount() {
        // console.log(this.props)
        this.mounted = true;
        const entryEndpoint = `${config.API_ENDPOINT_SAVE}`
        const entryUrl = `${entryEndpoint}/${this.props.entry.id}/information`
        const entryUrl2 = `${entryEndpoint}/${this.props.entry.recipe_id}/information`
        //IDs stored in either id or recipe_id, depending on location
        //if not in dashboard, load id
        if (this.props.dash === false) {
            // console.log(entryUrl)
            fetch(entryUrl, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": `${config.SEARCH_TOKEN}`,
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
                }
            })
                .then(response => response.json()
                )
                .then(response =>

                    this.setState({
                        summary: this.props.entry.summary,
                        instructions: response.instructions
                    })
                )
                .catch(err => {
                    console.error(err);
                })
                //else load recipe_id
        } else {
            // console.log(entryUrl2)
            fetch(entryUrl2, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "d36a838384mshc96686c738af0aap11fd78jsnf972d810e8ef",
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
                }
            })
                .then(response => response.json()

                )
                .then(response =>

                    this.setState({
                        summary: response.summary,
                        instructions: response.instructions
                    })
                    // console.log(response)
                )
                .catch(err => {
                    console.error(err);
                })
        }
    }
    componentWillUnmount() {
        this.mounted = false;
        // console.log(this.state)
    }
    render() {
        const text = this.state.instructions;
        console.log(this.props.entry)
        console.log(text, "line check")
        return (
            <ul className="recipe-instruc">
                <li>{text}</li>
                <li><a href={this.props.entry.sourceUrl}>Learn More</a></li>

            </ul>

        )
    }
}

export default DetailTrigger;