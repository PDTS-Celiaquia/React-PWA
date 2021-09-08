import React, { Component } from 'react';
import { 
    withStyles, Container, Typography, CardMedia, Divider
} from '@material-ui/core'
import { findRecetaById } from '../../services/receta.service';
import { findReceta } from '../../helpers/findReceta';
import { connect } from 'react-redux';
import { getRecetas } from '../../store/actions';
import Loader from '../common/Loader';
import sanitizeHtml from 'sanitize-html';

const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
    },
    container: {
        marginTop: theme.spacing(2)
    },
    media: {
        height: 200,
    },
    element: {
        margin: theme.spacing(1.5)
    },
    ingredientesList: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)

    }
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
        let recetaInit;
        console.log(id)
        if (recetas) {
            recetaInit = findReceta(recetas, id);
        } else {
            recetaInit = (await findRecetaById(id)).data;
        }
        this.setState({ receta: recetaInit, loading: false })
    }

    render () {
        const { classes, fetching } = this.props
        const { receta, loading } = this.state
        if (loading || fetching) {
            return <Loader />
        }
        const { nombre, descripcion, instrucciones, ingredientes, image } = receta
        
        return (
            <>
                <CardMedia
                    className={classes.media}
                    image={image ? image: "/default_receta.jpg"}
                    title={nombre}
                />
                <div className={classes.element}>
                    <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="h2"
                        >
                            {nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {descripcion}
                    </Typography>
                </div>
                
                <Divider light />

                <Container className={classes.container} maxWidth="xs">
                    <div className={classes.element} >
                        <Typography variant="h6" color="textSecondary" component="p">
                            Ingredientes que necesitás:
                        </Typography>
                        <div className={classes.ingredientesList}>
                            {ingredientes.map(ingrediente => (
                                <Typography variant="body2" component="p" key={ingrediente.id}>
                                    • {ingrediente.cantidad} {ingrediente.unidadDeMedida.nombre}{(ingrediente.cantidad > 1) ? 's':''} de {ingrediente.alimento.nombre} 
                                </Typography>
                            ))}
                        </div>
                        <Typography variant="h6" color="textSecondary" component="p">
                            Instrucciones:
                        </Typography>
                        <div margin='0' dangerouslySetInnerHTML={{ __html: sanitizeHtml(instrucciones.toString("html")) }} />

                    </div>
                </Container>
            </>
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