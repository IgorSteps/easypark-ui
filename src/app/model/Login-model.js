export default async function VerifyLoginDetails(username,password){
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(
          {
            Username:username,
            Password:password
          }),
      });

      let result = await response.json();
      return result;
    } catch (error) {
      return "error";
    }
  }
