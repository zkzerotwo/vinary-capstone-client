import React from 'react'
import config from '../config'

class DetailTrigger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summary: "",
            instructions: ""
        }
    }
    newlineText() {
        const text = this.props.summary;
        const newLine = text.split('\n').map(str => <p>{str}</p>);
        return newLine
    }
    componentDidMount() {
        console.log(this.props)
        this.mounted = true;
        const entryEndpoint = `${config.API_ENDPOINT_SAVE}`
        const entryUrl = `${entryEndpoint}/${this.props.entry.id}/information`
        const entryUrl2 = `${entryEndpoint}/${this.props.entry.recipe_id}/information`
        // const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/` + this.props.entry.id + `/information`
        // console.log(entryUrl, "urlcheck")
        if (!this.props.dash) {
            fetch(entryUrl, {
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
                        summary: this.props.entry.summary,
                        instructions: response.instructions
                    })
                )
                .catch(err => {
                    console.error(err);
                })
        } else {
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
                )
                .catch(err => {
                    console.error(err);
                })
        }
        


    }
    componentWillUnmount() {
            this.mounted = false;
        }
    render() {
        const text = this.state.instructions;
        const newLine = text.split('\n').map(str => <li>{str}</li>);
        console.log(newLine)
        return (
            <ul className="recipe-instruc">

                {newLine}

            </ul>

        )
    }
}

export default DetailTrigger;