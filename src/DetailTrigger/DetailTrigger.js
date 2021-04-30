import React from 'react'

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
        
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/` + this.props.recipeId + `/information`
        // console.log(url, "urlcheck")
        fetch(url, {
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
            });
    }
    render() {
        const text = this.state.instructions;
        const newLine = text.split('\n').map(str => <p>{str}</p>);
        console.log(newLine)
        return (
            <div>
                
                {newLine}
                
                {/* {this.newlineText()} */}
            </div>

        )
    }
}

export default DetailTrigger;