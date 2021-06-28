import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 600
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: `10px`,
        height: "100%",
        width: "99%",
        marginTop: theme.spacing(7)
    }
}));

export default function SimpleTable() {
    const classes = useStyles();

    const [data, upDateData] = React.useState([]);
    const [firstLoad, setLoad] = React.useState(true);
    let isLoading = true;

    async function sampleFunc() {
        let response = await fetch("http://localhost:8080/branches");
        let body = await response.json();
        upDateData(body);
    }

    if (firstLoad) {
        sampleFunc();
        setLoad(false);
    }

    if (data.length > 0) isLoading = false;

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Branches
      </Typography>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <TableContainer
                    style={{ width: "80%", margin: "0 10px" }}
                    component={Paper}
                >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Branch ID</TableCell>
                                <TableCell align="center">Branch Name</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">City State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map(row => (
                                <TableRow key={row.branch_id}>
                                    <TableCell align="center">{row.branch_id}</TableCell>
                                    <TableCell align="center">{row.branch_name}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">{row.city_state}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}