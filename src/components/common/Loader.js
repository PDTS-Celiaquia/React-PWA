import { CircularProgress, withStyles } from '@material-ui/core'
import React from 'react'

const style = theme => ({
    circularProgress: {
        marginTop: theme.spacing(2),
        margin: "auto",
        display: "flex",
        color: theme.palette.primary.main
    },
})

function Loader({ classes }) {
    return (
        <CircularProgress
            className={classes.circularProgress}
        />
    )
}


export default withStyles(style)(Loader)
