const checkEmptyFields = (fieldsData) =>{
    if(Object.keys(fieldsData).length <= 0){
        return false;
    }
    return Object.keys(fieldsData).every((fieldName) => !["", undefined, null].includes(fieldsData[fieldName]));
}


export default checkEmptyFields;