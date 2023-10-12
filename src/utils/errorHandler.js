import { HttpStatusCode } from "../constants/index.js";

const errorHandler = (error, req, res, next)=>{
    // in this variable 
    const statusCode = res.statusCode? res.statusCode: 500;
    switch(statusCode){
        case HttpStatusCode.BAD_REQUEST:
            res.json({
                title: error.cause,
                message: error.message,
                stackMessage: error.stack,
            });
    }
};

export default errorHandler;