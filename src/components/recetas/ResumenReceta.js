import React from 'react';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { Link, Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core'
import TypographyRe from '../common/TypographyRe';

const theme = createTheme({
    spacing: 4,
});

const useStyles = makeStyles({
    card: {
        margin: theme.spacing(2)
    },
    media: {
        height: 140,
    },
});

export default function ResumenReceta(props){
    const classes = useStyles();
    const { receta, re } = props
    const defaultImageUrl = "https://918230.smushcdn.com/2283449/wp-content/uploads/2020/05/celiaquia.jpg?lossy=1&strip=1&webp=1"
    return (
        <Link underline='none' component={RouterLink} to={location => `${location.pathname}/${receta.id}`}>
            <Card 
                className={classes.card} 
            >
                <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={receta.image ? receta.image: defaultImageUrl}
                    title={receta.nombre}
                />
                <CardContent>
                    <TypographyRe 
                        gutterBottom 
                        variant="h5" 
                        component="h2"
                        title={receta.nombre}
                        re={re}
                    >
                    </TypographyRe>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {receta.descripcion}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}

