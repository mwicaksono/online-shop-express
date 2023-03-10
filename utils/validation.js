const isEmpty = (value) => {
    return !value && !value.trim() == '';
}

const userCredentialsAreValid = (email, password) => {
    return (
        email &&
        email.includes('@') &&
        password &&
        password.trim().length >= 6
    );
}

const userDetailsAreValid = (email, password, fullName, street, postal, city) => {
    return (
        userCredentialsAreValid(email, password) &&
        !isEmpty(fullName) &&
        !isEmpty(street) &&
        !isEmpty(postal) &&
        !isEmpty(city)
    );
}

const emailIsConfirmed = (email, confirmEmail) => {
    return email === confirmEmail
}

// Product validations
const productArevalid = (product, description, price) => {
    return(
        product && description && price
    );
}

module.exports = {
    userDetailsAreValid,
    emailIsConfirmed,
    productArevalid
}



