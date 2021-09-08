import { getAllAlimentos } from '../services/alimento.service';
import axiosInstance from '../services/axiosInstance';
import { getAllRecetas } from "../services/receta.service";

export const typeDefs = {
    requestUnidades: "REQUEST_UNIDADES",
    successUnidades: "SUCCESS_UNIDADES",
    errorUnidades: "ERROR_UNIDADES",

    requestAlimentos: "REQUEST_ALIMENTOS",
    successAlimentos: "SUCCESS_ALIMENTOS",
    errorAlimentos: "ERROR_ALIMENTOS",

    requestRecetas: "REQUEST_RECETAS",
    successRecetas: "SUCCESS_RECETAS",
    errorRecetas: "ERROR_RECETAS",

}

const {
    requestUnidades, successUnidades, errorUnidades,
    requestAlimentos, successAlimentos, errorAlimentos,
    requestRecetas, successRecetas, errorRecetas,
} = typeDefs


export function getUnidades() {
    return dispatch => {
        dispatch({ type: requestUnidades })
        axiosInstance.get('/api/unidades').then(
            response => dispatch({ type: successUnidades, payload: response.data }),
            error => dispatch({ type: errorUnidades, error })
        )
    }
}

export function getAlimentos() {
    return dispatch => {
        dispatch({ type: requestAlimentos })
        getAllAlimentos().then(
            response => dispatch({ type: successAlimentos, payload: response.data }),
            error => dispatch({ type: errorAlimentos, error })
        )
    }
}

export function getRecetas() {
    return dispatch => {
        dispatch({ type: requestRecetas })
        getAllRecetas().then(
            response => dispatch({ type: successRecetas, payload: response.data }),
            error => dispatch({ type: errorRecetas, error })
        )
    }
}

