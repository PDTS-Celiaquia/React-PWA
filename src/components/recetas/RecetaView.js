import React, { Component } from 'react';
import { withStyles, Container } from '@material-ui/core'
import { findRecetaById } from '../../services/receta.service';
import { findReceta } from '../../helpers/findReceta';
import { connect } from 'react-redux';
import { getRecetas } from '../../store/actions';

const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
    },
    container: {
        marginTop: theme.spacing(2)
    },
});


class RecetaView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            receta: null,
            loading: true,
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        const { recetas } = this.props 
        let recetaInit = null;

        if (recetas) {
            recetaInit = findReceta(recetas, id);
        } else {
            recetaInit = (await findRecetaById(id)).data;
        }
        this.setState = { receta: recetaInit, loading: false }
    }

    render () {
        const { classes } = this.props
        return (
            <Container className={classes.container} maxWidth="xs">
            </Container>
        )
    }

}

const mapStateToProps = state => ({
    fetching: state.fetchingRecetas,
    recetas: state.recetas
})

const mapDispatchToProps = dispatch => ({
    getRecetas: () => dispatch(getRecetas())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecetaView));