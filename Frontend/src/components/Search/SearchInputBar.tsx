import { Grid } from '@mui/material';
import React, { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { SearchResultDropDown } from './SearchResultDropDown';
import './styles.scss';

export type SearchInputBarProps = {
  setSearchQuery: (value: string) => void;
  queriedDatas: any | null;
  collections: string[];
  types: string[];
  placeholder: string;
  setSelectedFilterType: (value: string) => void;
  resetSearchData: (resetQuery: boolean) => void;
  setSelectedOption: (value: any) => void;
};

export type SearchInputBarState = {
  searchInputValue: string;
};

interface SearchInputBarWithTranslationProps extends WithTranslation { }
type Props = SearchInputBarWithTranslationProps & SearchInputBarProps;

class SearchInputBar extends Component<Props, SearchInputBarState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchInputValue: '',
    };
  }
  componentWillUnmount = () => {
    this.props.resetSearchData(true);
  };
  setSelectedOption = (value: any) => {
    this.props.setSelectedOption(value);
    this.props.resetSearchData(false);
  };

  handleSearchInputValue = (value: string) => {
    if (value.trim() !== '') {
      this.setState({ searchInputValue: value });
      this.props.setSearchQuery(value);
    } else {
      this.setState({ searchInputValue: '' });
      this.props.setSearchQuery(value);
    }
  };

  clearSearchInputValue = () => {
    this.setState({ searchInputValue: '' });
    this.props.resetSearchData(true);
  };

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
                <i className="icons" aria-hidden="true">search</i>
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
                  >cancel_circle</i>
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
                setSelectedOption={this.setSelectedOption}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(SearchInputBar);
