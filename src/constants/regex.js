const EMAIL_REGEX = /^([\w]{5,30})+@([\w])+.([a-z]){2,4}$/;
const NAME_REGEX = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
const PHONE_NUMBER_REGEX = /\+\d{2}-\d{3}-\d{7}$/;

export {EMAIL_REGEX, NAME_REGEX, PHONE_NUMBER_REGEX};