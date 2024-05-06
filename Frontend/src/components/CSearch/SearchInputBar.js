import { Grid } from '@mui/material';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { SearchResultDropDown } from './SearchResultDropDown';
import searchicon from '../../assets/search-icon.png';
import clearicon from '../../assets/clear-icon.png';
import './styles.scss';

class SearchInputBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: '',
    };
  }
  componentWillUnmount() {
    this.props.resetSearchData(true);
  }
  setSelectedOption(value) {
    this.props.setSelectedOption(value);
    this.props.resetSearchData(false);
  }

  handleSearchInputValue(value) {
    if (value.trim() !== '') {
      this.setState({ searchInputValue: value });
      this.props.setSearchQuery(value);
    } else {
      this.setState({ searchInputValue: '' });
      this.props.setSearchQuery(value);
    }
  }

  clearSearchInputValue() {
    this.setState({ searchInputValue: '' });
    this.props.resetSearchData(true);
  }

  render() {
    const { searchInputValue } = this.state;
    const { placeholder } = this.props;
    const { queriedDatas, types, collections, setSelectedFilterType } =
      this.props;
    return (
      <Grid container className="search-container">
        <Grid item className="search-input-item">
          <Grid container className="search-input-container">
            <Grid item className="search-input">
              <Grid item className="search-icon">
                <img src={searchicon} className="search-icon" alt="Search"/>
              </Grid>

              <input
                type="text"
                value={searchInputValue}
                placeholder={placeholder}
                onChange={(event) =>
                  this.handleSearchInputValue(event.target.value)
                }
                autoFocus={true}
              />
              {searchInputValue && searchInputValue.length > 0 && (
                <Grid item className="close-icon">
                  <i
                    className="icons"
                    aria-hidden="true"
                    onClick={() => this.clearSearchInputValue()}
                  ><img src={clearicon} className="search-icon" alt="Clear"/></i>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="search-dropDown">
          {queriedDatas && (
            <Grid item className="search-dropDownList">
              <SearchResultDropDown
                queriedDatas={queriedDatas}
                collections={collections}
                types={types}
                setSelectedFilterType={setSelectedFilterType}
                setSelectedOption={(value) => this.setSelectedOption(value)}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(SearchInputBar);
