import React, { Component } from 'react';
import { Button, Container, Snackbar, TextField, Typography, withStyles } from '@material-ui/core';
import Loader from '../common/Loader';
import { modifyPasswordService } from '../../services/auth';
import MuiAlert from '@material-ui/lab/Alert'

const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
    },
    container: {
        marginTop: theme.spacing(2)
    },
    element: {
        marginTop: theme.spacing(2),
        margin: "auto"
    }
})

class ModifyPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            passwordConfirm: "",
            passwordsNotMatch: false,
            successToastOpen: false,
            error: null,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleToastClose = this.handleToastClose.bind(this);
        this.modifyPassword = this.modifyPassword.bind(this);
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({[id]: value })
    }

    handleToastClose(e, reason){
        if (reason === 'clickaway') {
          return;
        }
        this.setState({successToastOpen: false});
    };

    modifyPassword(e) {
        e.preventDefault();
        const { password, passwordConfirm} = this.state
        if (password === passwordConfirm) {
            this.setState({ passwordsNotMatch: false, error: null, loading: true })
            modifyPasswordService({ password })
                .then(
                    () => this.setState({ password:"", passwordConfirm:"", successToastOpen: true, loading: false }),
                    error => this.setState({ error, loading: false })
                )
        } else {
            this.setState({ passwordsNotMatch: true })
        }
    }

    render(){
        const { password, passwordConfirm, passwordsNotMatch, successToastOpen, error, loading } = this.state
        const { classes } = this.props
        return (
            <Container className={classes.container} maxWidth="xs">
                    {error && (
                        <Typography color="error" variant="body1">
                            Ha ocurrido un error
                        </Typography>
                    )}
                    <Typography className={classes.title} variant="h6">
                        Cambio de contraseña
                    </Typography>
                    <form onSubmit={this.modifyPassword}>    
                        <TextField
                            className={classes.element}
                            id="password"
                            type="password"
                            label="Nueva contraseña"
                            fullWidth
                            variant="outlined"
                            required
                            autoComplete="new-password"
                            value={password}
                            onChange={this.handleChange}
                        />
                        <TextField
                            className={classes.element}
                            id="passwordConfirm"
                            type="password"
                            label="Confirmar contraseña"
                            fullWidth
                            variant="outlined"
                            required
                            error={passwordsNotMatch}
                            helperText={passwordsNotMatch && "Las contraseñas no coinciden"}
                            autoComplete="new-password"
                            value={passwordConfirm}
                            onChange={this.handleChange}
                        />

                        <Snackbar 
                            open={successToastOpen} 
                            autoHideDuration={2000} 
                            onClose={this.handleToastClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <MuiAlert variant="filled" onClose={this.handleToastClose} severity="success">
                                Contraseña modificada correctamente
                            </MuiAlert>
                        </Snackbar>

                        {loading ? <Loader /> : (
                            <Button
                                className={classes.element}
                                type="submit"
                                fullWidth
                                color="primary"
                                variant="contained"
                            >
                                CAMBIAR
                            </Button>
                        )}
                    </form>
                </Container>
        );
    }
}

export default withStyles(styles)(ModifyPasswordPage);