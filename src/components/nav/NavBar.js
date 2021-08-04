import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { getUser } from '../../services/auth'
import TemporaryDrawer from './TemporaryDrawer'

const styles = theme => ({
    bar: {
        // background: 'transparent',
        boxShadow: 'none'
    },
    backIcon: {
        color: theme.palette.primary.contrastText
    },
    homeIcon: {
        color: theme.palette.primary.contrastText
    },
    title: {
        color: theme.palette.primary.contrastText
    }
})


function NavBar({ children, location, classes }) {
    // const homeButton = location.pathname !== "/"
    const user = getUser();
    const role = user ? user.role : null;
    console.log(role)
    const history = useHistory()
    return (
        <AppBar position="static" className={classes.bar}>
            <Toolbar>
                {role && <TemporaryDrawer/>}
                <IconButton
                    className={classes.backIcon}
                    edge="start"
                    onClick={history.goBack}
                    aria-label="back"
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Celiaquia
                </Typography>
                {children}
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(NavBar)