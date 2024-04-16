'use client'
import { useRef } from "react";
import Popup from 'reactjs-popup';

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const blueButton = {
    border:"solid",
    borderRadius:"20px",
    borderColor:"blue",
    padding:"10px",
    color:"white",
    background:"blue",
    display:"block",
    marginRight:"auto",
    marginLeft:"auto",
    cursor:"pointer"
  }

  async function LoginUserWithDetails(){
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(
          {
            Username:usernameRef.current.value,
            Password:passwordRef.current.value
          }),
      });
  
      const result = await response.json();
      console.log("Success:", result);
      alert(result.message);
    } catch (error) {
      alert("Login attempt failed");
      console.error("Error:", error);
    }
  }

  function SendRecoveryEmail(){
    alert(`Email: ${emailRef.current.value}`);
  }

  function LoginForms(){
    return (
      <>
        <form style={{textAlign:"center"}}>
          <label for="usernameBox">Username</label><br></br>
          <input type="text" id="usernameBox" name="username" ref={usernameRef}></input><br></br>
          <label for="passwordBox">Password</label><br></br>
          <input type="password" id="usernameBox" name="username" ref={passwordRef}></input>
        </form>
        <br></br>
      </>
    );
  }

  function ForgotPasswordForm(){
    return (
      <>
        <form style={{textAlign:"center",border:"solid",borderRadius:"20px",borderColor:"white",
        padding:"20px",background:"white"}}>
          <label for="emailBox">Enter the email for your account</label>
          <br></br>
          <input type="email" id="emailBox" name="email" ref={emailRef}></input><br></br>
        </form>
        <br></br>
      </>
    );

  }


  return (
    <>
      <p style={{textAlign:"center",fontSize:"50px"}}>Welcome to Easypark</p>
      <p style={{textAlign:"center",fontSize:"30px"}}>Login</p>
      <br></br>
      <LoginForms/>
      <Popup trigger={
      <button style={{display:"block",marginRight:"auto",marginLeft:"auto",cursor:"pointer"}}>
      Forgot password?
      </button>}>
        <ForgotPasswordForm/>
        <button style={blueButton} onClick={SendRecoveryEmail}>Send recovery email</button>
      </Popup>
      <br></br>
      <button style={blueButton} onClick={LoginUserWithDetails}>Login</button>
    </>
  );
}