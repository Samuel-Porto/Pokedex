/**
 * Get all parent of a element.
 * @param {Element} field 
 * @returns All parents list.
 */
function getAllParentsOfDiv(field) {
    let currentField = field;    
    let parents = [];

    while(currentField) {
        currentField = currentField.parentNode;
        currentField && parents.push(currentField);
    }

    return parents;
}

export { getAllParentsOfDiv };