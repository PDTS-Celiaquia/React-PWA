export function findReceta(recetas, id) {
    for (let receta of recetas) {
        if (receta.id === parseInt(id)) return receta
    }
    return null
}