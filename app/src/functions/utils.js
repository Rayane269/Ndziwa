
/**
 * Vérifie si un objet est vide ou pas
 * 
 * @param {Object} object 
 * @returns {boolean}
 */
export const objectIsEmpty = (object) => {
    return Object.keys(object).length === 0 ? true : false
}

/**
 * Remplacer un segment d'une chaine par une autre
 * 
 * @param {string} value
 * @param {string} replaceValue 
 * @param {int} length longueur à ne pas depasser
 * @returns {string}
 */
export const substrReplace = (value, replaceValue, length) => {
    return value.length > length
        ? value.replace(value.substring(length), replaceValue)
        : value
}