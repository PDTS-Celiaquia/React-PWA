import {
    TextField, Button, Divider, FormControl, FormLabel, FormControlLabel, Container, RadioGroup,
    Radio, Typography, withStyles
} from '@material-ui/core';
import React, { Component } from 'react'
import { sendCuestionario } from '../services/cuestionario.service';
import Loader from './common/Loader';

const StyledCheckbox = (props) => {
    return (
        <RadioGroup {...props} row>
            <FormControlLabel
                value={true}
                control={<Radio />}
                label="Si"
            />
            <FormControlLabel
                value={false}
                control={<Radio />}
                label="No"
            />
        </RadioGroup>
    )
}

const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2)
    },
    container: {
        marginTop: theme.spacing(2)
    },
    element: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        margin: "auto"
    }
})

class Cuestionario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            celiaco: true,
            diagnostico: "",
            tratamiento: true,
            dietaSinTACC: true,
            frecuenciaTACC: "0",
            verduras: true,
            frutas: "",
            carne: true,
            error: null,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleChangeRadioButton = this.handleChangeRadioButton.bind(this);
        this.enviarCuestionario = this.enviarCuestionario.bind(this);

    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value })
    }

    handleChangeCheckbox(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value === 'true' })
    }

    handleChangeRadioButton(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    enviarCuestionario(e) {
        e.preventDefault()
        const {
            celiaco, diagnostico, tratamiento, dietaSinTACC,
            frecuenciaTACC, verduras, frutas, carne
        } = this.state;
        this.setState({ loading: true })
        sendCuestionario({
            celiaco, diagnostico, tratamiento, dietaSinTACC,
            frecuenciaTACC, verduras, frutas, carne
        }).then(
            response => {
                console.log(response)
                this.props.history.push("/")
            },
            error => {
                console.log(error)
                this.setState({ error, loading: false })
            }
        )
    }

    render() {
        const {
            celiaco, diagnostico, tratamiento, dietaSinTACC,
            frecuenciaTACC, verduras, frutas, carne, error, loading
        } = this.state;
        const { classes } = this.props;
        return (
            <Container className={classes.container} maxWidth="xs">
                {error && (
                    <Typography color="error" variant="body1">
                        Ha ocurrido un error
                    </Typography>
                )}
                <Typography className={classes.title} variant="h6">
                    Cuestionario
                </Typography>

                <form onSubmit={this.enviarCuestionario}>

                    <FormControl component="fieldset" >
                        <FormLabel component="legend">??Es usted cel??aco?</FormLabel>
                        <StyledCheckbox
                            id="celiaco"
                            aria-label="celiaco"
                            name="celiaco"
                            value={celiaco}
                            onChange={this.handleChangeCheckbox}
                        />
                    </FormControl>

                    <Divider light />

                    <FormControl component="fieldset" className={classes.element}>
                        <FormLabel component="legend">
                            ??Hace cuantos a??os aproximadamente fue diagnosticado?
                        </FormLabel>
                        <TextField
                            id="diagnostico"
                            value={diagnostico}
                            onChange={this.handleChange}
                            type="number"
                            inputProps={{ min: 0, max: 100 }}
                            required
                        />
                    </FormControl>

                    <Divider light />

                    <FormControl component="fieldset" className={classes.element}>
                        <FormLabel component="legend">
                            ??Concurre a un hospital p??blico para ser tratado por su celiaqu??a?
                        </FormLabel>
                        <StyledCheckbox
                            id="tratamiento"
                            aria-label="tratamiento"
                            name="tratamiento"
                            value={tratamiento}
                            onChange={this.handleChangeCheckbox}
                        />
                    </FormControl>

                    <Divider light />

                    <FormControl component="fieldset" className={classes.element}>
                        <FormLabel component="legend">
                            ??Usted considera que adhiere correctamente a la dieta libre de gluten?
                        </FormLabel>
                        <StyledCheckbox
                            id="dietaSinTACC"
                            aria-label="dietaSinTACC"
                            name="dietaSinTACC"
                            value={dietaSinTACC}
                            onChange={this.handleChangeCheckbox}
                        />
                    </FormControl>

                    <Divider light />

                    <FormControl component="fieldset" className={classes.element}>
                        <FormLabel component="legend">
                        ??Con qu?? frecuencia usted cree que ingiere gluten ya sea voluntaria o involuntariamente?
                        </FormLabel>
                        <RadioGroup
                            aria-label="frecuenciaTACC"
                            name="frecuenciaTACC"
                            value={frecuenciaTACC}
                            onChange={this.handleChangeRadioButton}
                        >
                            <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="Menos de una vez al a??o"
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="Algunas veces en el a??o"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="Una vez al mes"
                            />
                            <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="Alguna vez al mes"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio />}
                                label="Una vez a la semana"
                            />
                            <FormControlLabel
                                value="5"
                                control={<Radio />}
                                label="Varias veces en la semana"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Divider light />

                    <FormControl component="fieldset" className={classes.element}>
                        <FormLabel component="legend">
                            ??Usted incluye verduras tanto en almuerzo como en cena?
                        </FormLabel>
                        <StyledCheckbox
                            id="verduras"
                            aria-label="verduras"
                            name="verduras"
                            value={verduras}
                            onChange={this.handleChangeCheckbox}
                        />
                    </FormControl>

                    <Divider light />

                    <FormControl component="fieldset" className={classes.element}>
                        <FormLabel component="legend"> ??Cu??ntas frutas consume a diario?</FormLabel>
                        <TextField
                            id="frutas"
                            value={frutas}
                            onChange={this.handleChange}
                            type="number"
                            inputProps={{ min: 0, max: 20 }}
                            required />
                    </FormControl>

                    <Divider light />

                    <FormControl component="fieldset" className={classes.element}>
                        <FormLabel component="legend">
                            ??Usted consume carnes (pollo, vaca, pescado) a diario?
                        </FormLabel>
                        <StyledCheckbox
                            id="carne"
                            aria-label="carne"
                            name="carne"
                            value={carne}
                            onChange={this.handleChangeCheckbox}
                        />
                    </FormControl>

                    {loading ? <Loader /> : (
                        <Button
                            className={classes.element}
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained"
                        >
                            ENVIAR
                        </Button>
                    )}
                </form>
            </Container>
        )
    }
}

export default withStyles(styles)(Cuestionario);;