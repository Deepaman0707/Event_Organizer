import React from "react";
import { connect } from "react-redux";
import {
  setTextFilter,
  sortByDate,
  sortByLikes,
} from "./../../actions/filters";
import { faHeart, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from '@material-ui/icons/Star';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const EventFilters = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Paper component="form" className={classes.root}>
        {/* <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          disabled
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search Events"
          inputProps={{ "aria-label": "search events" }}
          onChange={(e) => {
            props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          style={{
            color:`${props.filters.sortBy === "likes"? 'yellow' : 'grey'}`
          }}
          className={classes.iconButton}
          aria-label="directions"
          onClick={() => {
            if(props.filters.sortBy != "likes")
              return props.dispatch(sortByLikes());
          }}
        >
          <StarIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          style={{
            color:`${props.filters.sortBy === "date"? 'red' : 'grey'}`
          }}
          className={classes.iconButton}
          aria-label="directions"
          onClick={() => {
            if(props.filters.sortBy != "date")
              return props.dispatch(sortByDate());
          }}
        >
          <CalendarTodayIcon />
        </IconButton>
      </Paper>
      {/* <div className="input-group">
        <div className="input-group__item">
          <input
            type="text"
            placeholder="Search events"
            value={props.filters.text}
            onChange={(e) => {
              props.dispatch(setTextFilter(e.target.value));
            }}
          />
        </div>
        <div className="input-group__item">
          <div className="inner">
            <div className="item">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={props.filters.sortBy === "likes"}
                onChange={() => {
                  props.dispatch(sortByLikes());
                }}
              />
              <label title="Sort by Likes" htmlFor="male">
                <FontAwesomeIcon icon={faHeart} />
              </label>
            </div>
            <div className="item">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={props.filters.sortBy === "date"}
                onChange={() => {
                  props.dispatch(sortByDate());
                }}
              />
              <label title="Recent" htmlFor="female">
                <FontAwesomeIcon icon={faTable} />
              </label>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

export default connect(mapStateToProps)(EventFilters);