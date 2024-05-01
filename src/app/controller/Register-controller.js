import VerifyRegisterDetails from '../model/Register-model';

export default async function CheckRegisterDetails(firstname, lastname, username, password, email) {
    try {
        const result = await VerifyRegisterDetails(firstname, lastname, username, password, email);
        if (result === "error") {
            return "error";
        } else {
            console.log(`in the controller, the value is ${result.message}`);
            return result;
        }
    } catch (error) {
        return "error";
    }
}