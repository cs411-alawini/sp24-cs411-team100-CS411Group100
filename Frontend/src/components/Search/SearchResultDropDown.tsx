import { Button, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type SearchResultDropDownProps = {
    queriedDatas: any;
    collections: string[];
    types: string[];
    setSelectedFilterType: (value: string) => void;
    setSelectedOption: (value: any) => void;
}

export const SearchResultDropDown = (props: SearchResultDropDownProps) => {
    const { t } = useTranslation();
    const defaultLastIndex = 4
    const { queriedDatas, types, collections, setSelectedFilterType, setSelectedOption } = props;
    const [selectedType, setSelectedType] = useState<string>();


    useEffect(() => {
        for (let item of collections) {
            if (queriedDatas[item] && queriedDatas[item].length > 0) {
                setSelectedType(item);
                break;
            }
        }
    }, [queriedDatas]);

    const toggleSelectedType = (type: string) => {
        if (type === selectedType) {
            setSelectedType(types[0]);
            setSelectedFilterType(types[0])
        }
        else {
            setSelectedType(type);
            setSelectedFilterType(type)
        }
    }

    const getMenuItem = (collection: any, data: any) => {
        switch (collection) {
            case 'employees':
                return (
                    <MenuItem
                        key={`${data.id}`}
                        // onClick={(e: any) => {
                        //     window.location.pathname = `/members/${data.id}`
                        //     data.category = collection;
                        //     setSelectedOption(data);
                        // }}
                    >
                        <Grid container className="search-data-item">
                            <Grid item={true} className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    <i className="icons" aria-hidden="true">person</i>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.name}`}</div>
                                    <div className="member-row-email">{data.email}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                )
            case 'sectors':
                return (
                    <MenuItem
                        key={`${data.id}`}
                        // onClick={(e: any) => {
                        //     window.location.pathname = `/divisions/${data.id}`
                        //     data.category = collection;
                        //     setSelectedOption(data);
                        // }}
                    >
                        <Grid container className="search-data-item">
                            <Grid item={true} className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    <i className="icons" aria-hidden="true">buildings</i>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.name}`}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                )

            case 'divisions':
                return (
                    <MenuItem
                        key={`${data.id}`}
                        // onClick={(e: any) => {
                        //     window.location.pathname = `/divisions/${data.sector}/${data.id}`
                        //     data.category = collection;
                        //     setSelectedOption(data);
                        // }}
                    >
                        <Grid container className="search-data-item">
                            <Grid item={true} className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    <i className="icons" aria-hidden="true">buildings</i>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.name}`}</div>
                                    <div className="member-row-email">{data.sectors[0].name}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                )
            case 'projects':
                return (
                    <MenuItem
                        key={`${data.id}`}
                        // onClick={(e: any) => {
                        //     window.location.pathname = `/divisions/${data.ownedSector}/${data.ownedBy}/${data.id}`
                        //     data.category = collection;
                        //     setSelectedOption(data);
                        // }}
                    >
                        <Grid container className="search-data-item">
                            <Grid item={true} className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    <i className="icons" aria-hidden="true">buildings</i>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.name}`}</div>
                                    <div className="member-row-email">{`${data.divisions[0].name}(${data.sectors[0].name})`}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                )

        }
    }


    return (
        <Grid item>
            <div className="search-filter-container">
                {types.map((item, i) => (
                    <Button
                        key={`${item}_${i}`}
                        value={item}
                        className={`filter-chip ${item === selectedType ? 'selected' : 'available'}`}
                        onClick={(e: any) => {
                            toggleSelectedType(item);
                        }}
                    >
                        {item === selectedType && (
                            <div className="checkmark">
                                <i className="icons" aria-hidden="true">check</i>
                            </div>
                        )}
                        {t(`${item}`)}
                    </Button>
                ))}
            </div>
            <div className="search-data-container">
                {collections.map((item, i) => (
                    queriedDatas[item] && item == selectedType &&
                    (<div style={{ margin: '4px 0' }} key={`${item}_${i}`} >
                        <Typography variant="h6" className="search-data-header">
                            {t(`${item}`)}
                        </Typography>

                        {!queriedDatas[item].length &&
                            <Typography
                                style={{ color: '#8c8b96', fontSize: '12px', padding: '0 16px' }}
                            >{t(`Search.No Search Data.${item}`)}</Typography>
                        }
                        {queriedDatas[item].length > 0 &&
                            <div
                                className="search-data-content"
                                style={{
                                    height: (queriedDatas[item].length > defaultLastIndex) ? `${defaultLastIndex * 48}px` : `${queriedDatas[item].length * 48}px`
                                }}
                            >
                                {queriedDatas[item].map((data: any, i: any) => (
                                    getMenuItem(item, data)
                                ))}
                            </div>
                        }
                    </div>
                    )
                ))}
            </div>
        </Grid >

    )

}