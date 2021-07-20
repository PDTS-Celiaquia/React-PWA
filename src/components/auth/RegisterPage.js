import { Button, CircularProgress, Container, TextField, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { registerService } from '../../services/auth';

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

class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            passwordConfirm: "",
            passwordsNotMatch: false,
            error: null,
            loading: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value })
    }



    register(e) {
        e.preventDefault()
        const { nombre, apellido, email, password, passwordConfirm } = this.state
        if (password === passwordConfirm) {
            this.setState({ passwordsNotMatch: false, error: null, loading: true })
            registerService({ nombre, apellido, email, password })
                .then(
                    () => this.props.history.push("/cuestionario"),
                    error => this.setState({ error, loading: false })
                )
        } else {
            this.setState({ passwordsNotMatch: true })
        }
    }

    render() {
        const { nombre, apellido, email, password, passwordConfirm, passwordsNotMatch, error, loading } = this.state
        const { classes } = this.props
        return (
            <Container className={classes.container} maxWidth="xs">
                {error && (
                    <Typography color="error" variant="body1">
                        Ya existe un usuario con el email ingresado.
                    </Typography>
                )}
                <Typography className={classes.title} variant="h6">
                    Registro de Usuario
                </Typography>
                <form onSubmit={this.register}>
                    <TextField
                        className={classes.element}
                        id="nombre"
                        type="text"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="given-name"
                        value={nombre}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className={classes.element}
                        id="apellido"
                        type="text"
                        label="Apellido"
                        fullWidth
                        variant="outlined"
                        required
                        autoComplete="family-name"
                        value={apellido}
                        onChange={this.handleChange}
                    />
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
                            ACEPTAR
                        </Button>)
                    }
                    <div className={classes.linkContainer}>
                        <p className={classes.linkText}>¿Ya tenés cuenta?</p>
                        <Link to="/login" className={classes.link}>Ingresá acá</Link>
                    </div>
                </form>
            </Container>
        )
    }
}

export default withStyles(styles)(RegisterPage);
