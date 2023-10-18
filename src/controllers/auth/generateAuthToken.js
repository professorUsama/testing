// import ENV from "../../config/keys.js";
// import jwt from "jsonwebtoken";
// import {userSchema } from "../../models/users.js";

// userSchema.methods.generateAuthToken = async function(){
//     console.log("in the token generate section");
//     try{
//         const token = jwt.sign({
//             _id: this._id,
//             email: this.email
//         },
//         ENV.JWT_SECRET_KEY,
//         );
//         console.log(token);
//         return token;
//     } catch(err){
//         console.log(`something wroing ${err}`);
//     }
// }

