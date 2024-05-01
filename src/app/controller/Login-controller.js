import VerifyLoginDetails from '../model/Login-model';

export default async function CheckLoginDetails(username,password){
    try {
        const result = await VerifyLoginDetails(username,password);
        if (result === "error"){
            return("error");
        } else{
            console.log(`in the controller, the value is ${result.message}`)
            return result;
        }
    } catch(error){
        return "error";
    }
}