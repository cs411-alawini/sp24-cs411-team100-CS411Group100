import { Button, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import usericon from "../../assets/user.png";
import accounticon from "../../assets/account.png";
import districticon from "../../assets/district.png";
import loanicon from "../../assets/loan.png";

export const SearchResultDropDown = (props) => {
    const { t } = useTranslation();
    const defaultLastIndex = 4;
    const { queriedDatas, types, collections, setSelectedFilterType, setSelectedOption } = props;
    const [selectedType, setSelectedType] = useState();

    useEffect(() => {
        for (let item of collections) {
            if (queriedDatas[item] && queriedDatas[item].length > 0) {
                setSelectedType(item);
                break;
            }
        }
    }, [queriedDatas]);

    const toggleSelectedType = (type) => {
        if (type === selectedType) {
            setSelectedType(types[0]);
            setSelectedFilterType(types[0]);
        } else {
            setSelectedType(type);
            setSelectedFilterType(type);
        }
    };

    const getMenuItem = (collection, data) => {
        switch (collection) {
            case 'User':
                return (
                    <MenuItem key={`u_${data.UserID}`}>
                        <Grid container className="search-data-item">
                            <Grid item className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    {/* <i className="icons" aria-hidden="true">person</i> */}
                                    <img src={usericon} className="search-icon" alt="User"/>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.UserID}`}</div>
                                    <div className="member-row-email">{data.Gender}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                );
            case 'Account':
                return (
                    <MenuItem key={`a_${data.AccountID}`}>
                        <Grid container className="search-data-item">
                            <Grid item className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    {/* <i className="icons" aria-hidden="true">buildings</i> */}
                                    <img src={accounticon} className="search-icon" alt="Account"/>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.AccountID}`}</div>
                                    <div className="member-row-email">{data.Balance}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                );

            case 'District':
                return (
                    <MenuItem key={`d_${data.DistrictID}`}>
                        <Grid container className="search-data-item">
                            <Grid item className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    {/* <i className="icons" aria-hidden="true">buildings</i> */}
                                    <img src={districticon} className="search-icon" alt="District"/>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.DistrictName}`}</div>
                                    <div className="member-row-email">{data.Region}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                );
            case 'Loan':
                return (
                    <MenuItem key={`l_${data.LoanID}`}>
                        <Grid container className="search-data-item">
                            <Grid item className="member-data">
                                <div style={{ marginRight: '8px' }}>
                                    {/* <i className="icons" aria-hidden="true">buildings</i> */}
                                    <img src={loanicon} className="search-icon" alt="Loan"/>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div className="member-row-name">{`${data.LoanID}`}</div>
                                    <div className="member-row-email">{`${data.Amount}`}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </MenuItem>
                );

            default:
                return null;
        }
    };

    return (
        <Grid item>
            <div className="search-filter-container">
                {types.map((item, i) => (
                    <Button
                        key={`${item}_${i}`}
                        value={item}
                        className={`filter-chip ${item === selectedType ? 'selected' : 'available'}`}
                        onClick={() => {
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
                    // queriedDatas[item] && item == selectedType &&
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
                                {queriedDatas[item].map((data, i) => (
                                    getMenuItem(item, data)
                                ))}
                            </div>
                        }
                    </div>
                    )
                ))}
            </div>
        </Grid >
    );
};