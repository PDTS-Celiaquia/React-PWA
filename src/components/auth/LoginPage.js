import { Button, CircularProgress, Container, TextField, Typography, withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { loginService } from '../../services/auth';

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
    },
    circularProgress: {
        marginTop: theme.spacing(2),
        margin: "auto",
        display: "flex"
    },

    linkContainer: {
        marginTop: theme.spacing(2),
        justifyContent: "space-between"
    },

    linkText: {
        justifyContent: "space-between",
        marginRight: theme.spacing(1),
        float: "left",
        margin: "auto"
    },

    link: {
        color: "blue",
    }

})

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            error: null,
            loading: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value })
    }

    login(e) {
        e.preventDefault()
        this.setState({ error: null, loading: true })
        const { email, password } = this.state
        loginService({email, password})
            .then(
                () => this.props.history.push("/"),
                error => this.setState({ error, loading: false })
            )
    }

    render() {
        const { email, password, error, loading } = this.state
        const { classes } = this.props
        return (
            <Container className={classes.container} maxWidth="xs">
                {error && (
                    <Typography color="error" variant="body1">
                        Email o contraseña incorrectos
                    </Typography>
                )}
                <Typography className={classes.title} variant="h6">
                    Iniciar sesión
                </Typography>
                <form onSubmit={this.login}>
                    <TextField
                        className={classes.element}
                        id="email"
                        type="email"
                        label="Correo electrónico"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className={classes.element}
                        id="password"
                        type="password"
                        label="Contraseña"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    {loading ?
                        <CircularProgress
                            className={classes.circularProgress}
                            color="primary"
                        />
                        : (<Button
                            className={classes.element}
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained"
                        >
                            INGRESAR
                        </Button>)
                    }
                    <div className={classes.linkContainer}>
                        <p className={classes.linkText}>¿No tenés cuenta?</p>
                        <Link to="/register" className={classes.link}>Registrate acá</Link>
                    </div>
                </form>
            </Container>
        )
    }
}

export default withStyles(styles)(LoginPage);
