 class ValidationHelper{

    static isEmail(value){
        let EmailRegx = /\S+@\S+\.\S+/;
        return EmailRegx.test(value);
    }

    static isEmpty(value){
        return value.length===0;
    }
 }

 export default ValidationHelper;