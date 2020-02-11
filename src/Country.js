import React, { Component } from "react";
import "./App.css";

class Country extends Component {
  constructor() {
    super();
    this.state = {
      button: "+",
      expandBlock: "none"
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  /**
   * Change the state of the button and expandBlock when the button is clicked.
   */
  handleExpand() {
    if (this.state.button === "+") {
      this.setState({ button: "-", expandBlock: "block" });
    } else {
      this.setState({ button: "+", expandBlock: "none" });
    }
  }

  /**
   * When the user enters a new tag, the tag is added by calling the
   * function addTag in the parent component. Empty the search
   * bar in order to allow typing a new tag.
   * @param {SyntheticEvent} event
   */
  addTag(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      var val = this.refs.newTag.value;
      this.props.addTagText(val, this.props.index);
      this.refs.newTag.value = "";
    }
  }

  render() {
    return (
      <div className="countryBox">
        <img src={this.props.country.flag} alt="Flag" />
        <div className="countryInfo">
          <p className="countryName">{this.props.country.name}</p>
          <p>Capital : {this.props.country.capital}</p>
          <p>Region : {this.props.country.region}</p>
          <p>Subregion : {this.props.country.subregion}</p>

          <div style={{ display: this.state.expandBlock }}>
            <ul>
              Languages{" "}
              {this.props.country.languages.map((language, idx) => (
                <li key={idx}>{language.name}</li>
              ))}
            </ul>
            <ul>
              Currencies{" "}
              {this.props.country.currencies.map((currency, idx) => (
                <li key={idx}>
                  {currency.name} ({currency.symbol})
                </li>
              ))}
            </ul>
            <ul>
              {this.props.country.tag.map((eachTag, idx) => (
                <li key={idx} className="tag">
                  {eachTag}
                </li>
              ))}
            </ul>
            <input
              ref="newTag"
              className="add-tag-input"
              type="text"
              placeholder="Add a tag"
              onKeyPress={this.addTag}
            />
          </div>
        </div>
        <button className="expand-btn" onClick={this.handleExpand}>
          {this.state.button}
        </button>
      </div>
    );
  }
}

export default Country;
