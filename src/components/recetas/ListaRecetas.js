import {
    Container, InputAdornment, TextField, withStyles,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { getRecetas } from '../../store/actions'
import React, { Component } from 'react';
import Loader from '../common/Loader';
import SearchIcon from '@material-ui/icons/Search';
import PullToRefresh from 'react-simple-pull-to-refresh';
import ResumenReceta from './ResumenReceta';



const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
    },
    container: {
        marginTop: theme.spacing(2)
    },
    inputComponent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    element: {
        marginTop: theme.spacing(2),
        margin: "auto"
    },
})

class ListaRecetas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: "",
        }

        this.onFilterChange = this.onFilterChange.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.getRecetas()
    }
    
    onFilterChange(e) {
        const { value } = e.target
        this.setState({ filter: value })
    }

    onRefresh() {
        return new Promise(this.props.getRecetas);
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
                <TextField 
                    value={filter}
                    className={classes.inputComponent}
                    onChange={this.onFilterChange}
                    variant="outlined"                    
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                        }}
                    
                />
                
                {fetching ? <Loader /> :
                    <PullToRefresh onRefresh={this.onRefresh}>
                        {filteredList.map(receta => (
                            <ResumenReceta 
                                receta={receta}
                                key={receta.id}
                                re={re}/>                            
                        ))}
                    </PullToRefresh>
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