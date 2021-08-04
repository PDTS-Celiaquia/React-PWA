import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    List, ListItem, ListItemText, IconButton, Divider, ListItemIcon} from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../services/auth';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
    
    const styles = theme => ({
    list: {
        width: 250,
    },
    menuIcon: {
        color: theme.palette.primary.contrastText
    }
});

class TemporaryDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }

        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.list = this.list.bind(this)
        this.logout = this.logout.bind(this)
    }

    toggleDrawer(open) {
        return (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({ open });
        }
    };

    logout() {
        deleteUser()
        this.props.history.push('/')
    }

    list() {
        const { classes } = this.props
        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
            >
                <List>
                    <ListItem button component={Link} to="/receta">
                        <ListItemText primary="Recetas" />
                    </ListItem>
                    <ListItem button component={Link} to="/alimento">
                        <ListItemText primary="Alimentos" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/modifyPassword">
                        <ListItemIcon><VpnKeyOutlinedIcon/></ListItemIcon>
                        <ListItemText primary="Cambiar contraseña" />
                    </ListItem>
                    <ListItem button onClick={this.logout}>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItem>
                    {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
                </List>
            </div>
        );
    }

    render() {
        const { open } = this.state
        const { classes } = this.props
        return (
            <>
                <IconButton
                    className={classes.menuIcon}
                    onClick={this.toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer anchor="left" open={open} onOpen={console.log} onClose={this.toggleDrawer(false)}>
                    {this.list()}
                </SwipeableDrawer>
            </>
        );
    }
}


export default withRouter(withStyles(styles)(TemporaryDrawer))
