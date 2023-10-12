import { passwordStrength } from "check-password-strength";

export default {
    length: (password) =>{
        if(password.length < 9){
            return {status: 400, error: "Password must be at least 9 characters"};
        }
        return true;
    },

    match: (password, confirmPassword) =>{
        if(password !== confirmPassword){
            return {status: 400, error: "Password did'nt match..."};
        }
        return true
    },
    strength: (password) =>{
        if(passwordStrength(password).id < 2){
            return {status: 400, error: "Password is too weak..."};
        }
        return true;
    }
};