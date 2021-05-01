import React from 'react'
import config from '../config';
import ResultBar from '../ResultBar/ResultBar'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryParams: {
                query: "",
                diet: "",
                exclude: "",
                allergies: "",
                number: 20,
                offset: 0,
                type: ""
            },
            dietOptions: [
                "pescetarian",
                "vegan",
                "vegetarian",
                "ovo vegetarian"
            ],
            allergies: [
                "dairy",
                "egg",
                "gluten",
                "peanut",
                "sesame",
                "seafood",
                "shellfish",
                "soy",
                "sulfite",
                "tree nut",
                "wheat"
            ],
            dietConfig: 'vegetarian',
            allergyConfig: null,
            searchResults: [],
            imageUrlBase: ""
        }
    }
    static defaultProps = {
    }

    // formatQueryParams(params) {
    //     let searchParams = []
    //     searchParams = params
    //     console.log(params, "queryczech")
    //     const queryItems = Object.keys(params)
    //         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    //     return queryItems.join('&');
    // }
    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.state, "submit state check")
        this.setState({
            searchResults: []
        })
        // console.log(this.state.queryParams, "new check")
        // const queryOptions = this.formatQueryParams(this.state.queryParams)
        const endpoint = `${config.SEARCH_ENDPOINT}`
        const pass = `${config.SEARCH_TOKEN}`
        const query = this.formatQueryParams(this.state.queryParams)
        // console.log(query, "submitqueryCheck")
        // this.state.search
        const options = {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": pass,
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        }
        const fullUrl = endpoint + "?" + query
        // console.log(fullUrl, "url check")
        fetch(fullUrl,
            options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong, please try again later.');
                }
                return response
            })
            .then(response => response.json())
            .then(response => {
                // console.log(response.results, response.baseUri, "response")
                this.setState({
                    searchResults: response.results,
                    imageUrlBase: response.baseUri
                })
            })
            .catch(err => {
                console.error(err);
            });
    }
    updateDietType(type) {
        // console.log(type, "dropdown")
        this.setState({
            queryParams: {
                query: this.state.queryParams.query,
                diet: this.state.queryParams.diet,
                exclude: this.state.queryParams.exclude,
                allergies: this.state.queryParams.allergies,
                number: this.state.queryParams.number,
                offset: this.state.queryParams.offset,
                type: type
            },

        })
    }
    updateAllergyType(allergen) {
        // console.log(allergen, "selected")
        this.setState({
            queryParams: {
                query: this.state.queryParams.query,
                diet: this.state.queryParams.diet,
                exclude: this.state.queryParams.exclude,
                allergies: allergen,
                number: this.state.queryParams.number,
                offset: this.state.queryParams.offset,
                type: this.state.queryParams.type
            },


        })
    }
    updateSearchQuery(find) {
        // console.log(find, "burger")
        this.setState({
            queryParams: {
                query: find,
                diet: this.state.queryParams.diet,
                exclude: this.state.queryParams.exclude,
                allergies: this.state.queryParams.allergies,
                number: this.state.queryParams.number,
                offset: this.state.queryParams.offset,
                type: this.state.queryParams.type
            },

        })
    }
    render() {
        // console.log(this.state.queryParams, "context check")
        // console.log(this.state.imageUrlBase, "image")
        const imageBase = this.state.imageUrlBase
        const resultsList = this.state.searchResults
        // const seriesType = this.state.searchConfig
        const dietType = this.state.dietOptions
            .map(select => {
                return (
                    <option key={select.toString()} value={select}>{select}</option>
                )
            })
        const allergyType = this.state.allergies
            .map(select => {
                return (
                    <option key={select.toString()} value={select}>{select}</option>
                )
            })
        // console.log(dietType, "checking search type")
        // console.log(this.state, "state check")
        return (
            <section className='search-bar'>
                <form className="recipe_search" onSubmit={e => this.handleSubmit(e)}>

                    <label>
                        <input type='text'
                            id='recipe_search'
                            className="recipe_search"
                            name='recipe_search'
                            placeholder='Search by dish or cuisine'
                            onChange={e => this.updateSearchQuery(e.target.value)}
                            required
                        ></input>
                    </label>
                    <div className="search-params">
                        <label
                            htmlFor="search-type"
                        >Special Diet?
                        <select
                                id="search-type"
                                name="search-type"
                                defaultValue={this.state.dietConfig}
                                onChange={e => this.updateDietType(e.target.value)}>
                                {dietType}
                            </select>
                        </label>
                        <label
                            htmlFor="allergy-type"
                        > Allergies?
                        <select
                                id="allergy-type"
                                name="allergy-type"
                                defaultValue={this.state.allergyConfig}
                                onLoad={e => this.updateAllergyType(e.target.value)}
                                onChange={e => this.updateAllergyType(e.target.value)}>
                                {allergyType}
                            </select>
                        </label>
                        <button>
                            Submit!
                    </button>
                    </div>
                </form>
                <ResultBar
                    imgBaseUrl={imageBase}
                    results={resultsList} />
            </section>
        )
    }
}