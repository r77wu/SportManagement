import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import TableFooter from "@material-ui/core/TableFooter";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { TableSortLabel } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";

import * as actions from "../../../store/actions/index";

const headCells = [
  {
    id: "name",
    label: "Name",
    numeric: false,
  },
  {
    id: "gender",
    label: "Gender",
    numeric: false,
  },
  {
    id: "age",
    label: "Age",
    numeric: true,
  },

  {
    id: "points",
    label: "Points",
    numeric: true,
  },
  {
    id: "wins",
    label: "Wins",
    numeric: true,
  },
  {
    id: "loses",
    label: "Loses",
    numeric: true,
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80%",
    height: "100%",
    marginTop: "5em",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
  },
  toolbar: {
    padding: "1em",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  searchField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "5px",
    borderRadius: "5px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: "1em",
    },
  },
  rows: {
    "&:hover": {
      backgroundColor: "#EEEEEE",
      cursor: "pointer",
    },
  },
}));

const Result = ({ players, onFetchPlayers }) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = React.useState("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [noResult, setNoResults] = useState(false);
  useEffect(() => {
    onFetchPlayers();
  }, []);

  const handleRequestSort = (event, property) => {
    if (property === "name") {
      property = "firstName";
    }
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchInput = (event) => {
    event.preventDefault();
    const input =
      event.target.value.charAt(0).toUpperCase() +
      event.target.value.slice(1).toLowerCase();
    setSearchValue(input);
  };

  const handleSearchResult = (event) => {
    event.preventDefault();
    if (onSearch === false) {
      setOnSearch(true);
      const selectedPlayers = players.filter((player) => {
        return (
          player.firstName.includes(searchValue) ||
          player.lastName.includes(searchValue)
        );
      });
      if (selectedPlayers.length === 0) {
        setNoResults(true);
      }
      setSelectedPlayers([...selectedPlayers]);
    } else {
      setOnSearch(false);
      setSearchValue("");
      setNoResults(false);
      setSelectedPlayers([]);
    }
  };

  let tableContent = null;
  if (players.length !== 0) {
    let renderData;
    if (selectedPlayers.length === 0) {
      renderData = players;
    } else {
      renderData = selectedPlayers;
    }
    tableContent = (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(renderData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((player, idx) => (
                <TableRow key={idx} className={classes.rows}>
                  <TableCell align="left">{`${player.firstName} ${player.lastName}`}</TableCell>
                  <TableCell align="left">{player.gender}</TableCell>
                  <TableCell align="right">{player.age}</TableCell>

                  <TableCell align="right">{player.points}</TableCell>
                  <TableCell align="right">{player.wins}</TableCell>
                  <TableCell align="right">{player.loses}</TableCell>
                </TableRow>
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                count={players.length}
                onChangePage={handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Box>
          <Typography variant="h4">Players List</Typography>
        </Box>
        <form onSubmit={handleSearchResult}>
          <Box className={classes.searchField}>
            <InputBase
              type="text"
              value={searchValue}
              placeholder="Search By Name.."
              required
              onChange={(event) => handleSearchInput(event)}
            />
            <Button type="submit">
              {onSearch ? (
                <CancelIcon fontSize="small" />
              ) : (
                <SearchIcon fontSize="small" />
              )}
            </Button>
          </Box>
        </form>
      </Toolbar>
      {noResult === true ? (
        <Box style={{ color: "red" }}>No Matched Player</Box>
      ) : null}
      {tableContent}
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPlayers: () => {
      dispatch(actions.fetchPlayers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
