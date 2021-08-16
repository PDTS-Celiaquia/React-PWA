import {
    Button, Container, IconButton, InputAdornment, TextField, Typography, withStyles
} from '@material-ui/core'
import { connect } from 'react-redux'
import { getRecetas } from '../../store/actions'
import React, { Component } from 'react';
import Loader from '../common/Loader';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
    },
    container: {
        marginTop: theme.spacing(2)
    },
    header: {
        margin: theme.spacing(1)
    },
    refresh: {
        float: 'right',
        color: theme.palette.text.primary,
    },
    element: {
        marginTop: theme.spacing(2),
        margin: "auto"
    }
})

class ListaRecetas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: "",
        }

        this.onFilterChange = this.onFilterChange.bind(this)
    }

    componentDidMount() {
        this.props.getRecetas()
    }
    
    onFilterChange(e) {
        const { value } = e.target
        this.setState({ filter: value })
    }
    
    render() {
        const { filter } = this.state
        const { recetas, fetching, classes } = this.props
        if (!recetas && !fetching) {
            return <p>Error</p>
        }
        const re = filter ? new RegExp(filter, 'ig') : null
        const filteredList = re != null ? recetas.filter(receta => receta.nombre.match(re)) : recetas
        return (
            <Container className={classes.container} maxWidth="xs">
                <div className={classes.header} maxWidth="xs">
                    <TextField
                        value={filter}
                        onChange={this.onFilterChange}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton
                        className={classes.refresh}
                        onClick={this.refresh}
                    >
                        <RefreshIcon />
                    </IconButton>
                </div>
                
                {fetching ? <Loader /> :
                    <>
                        {filteredList.map(receta => (
                            <Typography>{receta.nombre}</Typography>
                        ))}
                    </>
                }

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