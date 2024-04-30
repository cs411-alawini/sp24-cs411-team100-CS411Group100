import { Button, ClickAwayListener } from "@mui/material";
import React, { Component } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { filterQueriedData, searchNotifications } from "./Search";
import { SearchBarProps, SearchBarState } from "./Search.constants";
import SearchInputBar from "./SearchInputBar";
import "./styles.scss";

interface SearchBarWithTranslationProps extends WithTranslation { }
type Props = SearchBarWithTranslationProps & SearchBarProps;

class SearchBar extends Component<Props, SearchBarState>
{
    private requestId = 0;
    private controller: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            isSearchIconSelected: false,
            searchQuery: '',
            queriedDatas: null,
            filteredDatas: null,
            collections: [],
            types: [],
            selectedFilterType: ''
        }
    }

    componentDidMount = () => {
        this.getCollectionAndTypes();
    }

    resetSearchData = (resetQuery: boolean) => {
        this.setState({
            searchQuery: resetQuery ? '' : this.state.searchQuery,
            queriedDatas: resetQuery ? null : this.state.queriedDatas,
            filteredDatas: resetQuery ? null : this.state.filteredDatas
        })
    }

    componentDidUpdate = async (prevProps: Props, prevState: SearchBarState) => {
        if (prevState.searchQuery !== this.state.searchQuery) {
            if (this.state.searchQuery.trim() !== '') {
                if (this.controller)
                    this.controller.abort()
                this.controller = new AbortController();
                const response: any = await searchNotifications(this.state.searchQuery.toLowerCase(), this.requestId, this.controller.signal, this.props.searchCategory);
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

    setSelectedFilterType = (value: string) => {
        this.setState({ selectedFilterType: value });
    }

    setSearchQuery = (value: string) => {
        this.requestId++;
        this.setState({ searchQuery: value });
    }

    getCollectionAndTypes = () => {
        let collections: string[] = [];
        let types: any[] = [];
        if (this.props.searchCategory && this.props.searchCategory.length > 0) {
            this.props.searchCategory.forEach(category => {
                collections.push(category.name)
                if (category.subCategory !== null) {
                    category.subCategory.forEach(subCategory => {
                        types = types.concat(subCategory.value);
                    })
                }
                else {
                    types = types.concat([category.name]);
                }
            })
        }
        this.setState({ collections: collections, types: types });
    }

    setIsSearchIconSelected = (isSearchIconSelected: boolean) => {
        this.setState({ isSearchIconSelected });
        this.getCollectionAndTypes();
    }
    onClickSearch = () => {
        // Toggle sort selection
        this.setIsSearchIconSelected(!this.state.isSearchIconSelected);
    };

    onOutsideClickSearch = (event: any) => {
        if (!this.findElement(event, 'search-container')) {
            this.setIsSearchIconSelected(false);
        }
    };

    findElement = (event: any, component: string) => {
        let returnValue = false;
        event.composedPath().forEach((data: any) => {
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
                        setSearchQuery={this.setSearchQuery}
                        queriedDatas={filteredDatas}
                        collections={collections}
                        types={types}
                        placeholder={this.props.placeholder}
                        setSelectedFilterType={this.setSelectedFilterType}
                        resetSearchData={this.resetSearchData}
                        setSelectedOption={setSelectedOption}
                    />
                </>
                )}
            </div>
        )
    };
}

export default withTranslation()(SearchBar);
