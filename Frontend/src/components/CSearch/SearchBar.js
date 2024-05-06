import { Button, ClickAwayListener } from "@mui/material";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { filterQueriedData, searchNotifications } from "./Search";
import SearchInputBar from "./SearchInputBar";
import "./styles.scss";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchIconSelected: true,
            searchQuery: '',
            queriedDatas: null,
            filteredDatas: null,
            collections: [],
            types: [],
            selectedFilterType: ''
        }
        this.requestId = 0;
        this.controller = null;
        // Bind your method to the class instance
        this.onOutsideClickSearch = this.onOutsideClickSearch.bind(this);
    }

    componentDidMount() {
        this.getCollectionAndTypes();
    }

    resetSearchData(resetQuery) {
        this.setState({
            searchQuery: resetQuery ? '' : this.state.searchQuery,
            queriedDatas: resetQuery ? null : this.state.queriedDatas,
            filteredDatas: resetQuery ? null : this.state.filteredDatas
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            if (this.state.searchQuery.trim() !== '') {
                if (this.controller)
                    this.controller.abort()
                this.controller = new AbortController();
                const response = await searchNotifications(this.state.searchQuery.toLowerCase(), this.requestId, this.controller.signal, this.props.searchCategory);
                if (response.isSuccess && response.requestId === this.requestId) {
                    this.setState({ queriedDatas: response.response, filteredDatas: response.response })
                }
            }
            else {
                this.setState({ queriedDatas: null, filteredDatas: null })
            }
        }

        if (prevState.selectedFilterType !== this.state.selectedFilterType) {
            if (this.state.selectedFilterType !== '') {
                let filteredDatas = filterQueriedData(this.state.selectedFilterType, this.state.queriedDatas);
                this.setState({ filteredDatas: filteredDatas })
            } else {
                this.setState({ filteredDatas: this.state.queriedDatas })
            }
        }
    }

    setSelectedFilterType(value) {
        this.setState({ selectedFilterType: value });
    }

    setSearchQuery(value) {
        this.requestId++;
        this.setState({ searchQuery: value });
    }

    getCollectionAndTypes() {
        let collections = [];
        let types = [];
        if (this.props.searchCategory && this.props.searchCategory.length > 0) {
            this.props.searchCategory.forEach(category => {
                collections.push(category)
                // types.push(category)

                // if (category.subCategory !== null) {
                //     category.subCategory.forEach(subCategory => {
                //         types = types.concat(subCategory.value);
                //     })
                // }
                // else {
                //     types = types.concat([category.name]);
                // }
            })
            
        }
        this.setState({ collections: collections, types: types });
    }

    setIsSearchIconSelected(isSearchIconSelected) {
        this.setState({ isSearchIconSelected });
        this.getCollectionAndTypes();
    }
    onClickSearch() {
        // Toggle sort selection
        // this.setIsSearchIconSelected(!this.state.isSearchIconSelected);
    }

    onOutsideClickSearch(event) {
        // if (!this.findElement(event, 'search-container')) {
        //     this.setIsSearchIconSelected(false);
        // }
    }

    findElement(event, component) {
        let returnValue = false;
        event.composedPath().forEach((data) => {
            if (data.classList && data.classList.contains(component)) {
                returnValue = true;
            }
        });

        return returnValue;
    }
    render() {
        const { isSearchIconSelected, filteredDatas, collections, types } = this.state;
        const { setSelectedOption } = this.props;
        return (
            <div>
                <ClickAwayListener onClickAway={this.onOutsideClickSearch}>
                    <Button
                        // variant="icon-only"
                        className={`search-button ${isSearchIconSelected ? 'selected' : 'available'}`}
                        onClick={() => this.onClickSearch()}
                    >
                        <i className="search-icon" aria-hidden="true">search</i>
                    </Button>
                </ClickAwayListener>
                {isSearchIconSelected && (<>
                    <SearchInputBar
                        setSearchQuery={(value) => this.setSearchQuery(value)}
                        queriedDatas={filteredDatas}
                        collections={collections}
                        types={types}
                        placeholder={this.props.placeholder}
                        setSelectedFilterType={(value) => this.setSelectedFilterType(value)}
                        resetSearchData={(resetQuery) => this.resetSearchData(resetQuery)}
                        setSelectedOption={setSelectedOption}
                    />
                </>
                )}
            </div>
        )
    };
}

export default withTranslation()(SearchBar);