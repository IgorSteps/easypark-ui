export default async function VerifyRegisterDetails(firstname,lastname,username,password,email){
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: JSON.stringify(
          {
            Firstname:firstname,
            Lastname:lastname,
            Username:username,
            Password:password,
            Email:email
          }),
      });

      let result = await response.json();
      return result;
    } catch (error) {
      return "error";
    }
  }