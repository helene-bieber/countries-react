import React, { Component } from "react";
import "./App.css";
import Country from "./country.js";

/**
 * @author [Helene Bieber]
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      search: "",
      searchTag: ""
    };
    this.addTag = this.addTag.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateSearchTag = this.updateSearchTag.bind(this);
  }

  /**
   * When the application starts, fetch the data from the API and save them
   * into an array. For each data, add a key/value where the tags will be
   * saved.
   */
  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(data => {
        const newCountryArray = data.map(country => ({
          ...country,
          tag: []
        }));

        this.setState({ countries: newCountryArray });
      })
      .catch(console.log);
  }

  /**
   * Update the state of the search element when the user searches for a name.
   * @param {SyntheticEvent} event
   */
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  /**
   * Update the state of the search element when the user searches for a tag.
   * @param {SyntheticEvent} event
   */
  updateSearchTag(event) {
    this.setState({ searchTag: event.target.value });
  }

  /**
   * Push a tag into the element of index and change the state of
   * the countries array to save the new tag.
   * @param {String} newTag
   * @param {number} idx
   */
  addTag(newTag, idx) {
    const arr = this.state.countries;
    arr[idx].tag.push(newTag);
    this.setState({ countries: arr });
  }

  render() {
    // Filter the search and see if the search and searchTag match each
    // country and return an array of countries that match.
    let filteredSearch = this.state.countries.filter(country => {
      return (
        (country.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 ||
          country.capital
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1) &&
        (this.state.searchTag === "" ||
          country.tag
            .map(
              eachTag =>
                eachTag
                  .toLowerCase()
                  .indexOf(this.state.searchTag.toLowerCase()) !== -1
            )
            .includes(true))
      );
    });

    return (
      <div className="board">
        <input
          type="text"
          id="name-input"
          placeholder="Search by country or capital"
          onChange={this.updateSearch}
        />
        <input
          type="text"
          id="tag-input"
          placeholder="Search by tag"
          onChange={this.updateSearchTag}
        />
        {/* For each country in the array of filteredSearch, call the country
        child component passing country informations, its index/key and the function addTag. */}
        {filteredSearch.map((country, idx) => (
          <Country
            key={idx}
            index={idx}
            country={country}
            addTagText={this.addTag}
          />
        ))}
      </div>
    );
  }
}

export default App;
