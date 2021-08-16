import { Container, withStyles } from "@material-ui/core";
import { connect } from 'react-redux'
import { getRecetas } from '../../store/actions'
import React, { Component } from 'react';

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

class ListaRecetas extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { classes } = this.props;
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListaRecetas));