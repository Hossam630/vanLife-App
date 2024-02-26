import React from "react";
import "./styles/Login.css";
import {
  useSearchParams,
  Form,
  useActionData,
  redirect,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const Email = formData.get("Email").toLowerCase();
  const Password = formData.get("Password");
  const url = new URL(request.url)
  const destination = url.searchParams.get("redirectTo") || "/host"
  try {
   const userID = await loginUser({ Email, Password });
    localStorage.setItem("loggedIn",true);
    localStorage.setItem("userID",userID);
    return redirect(destination);
  } catch (error) {
    return error.message
  }
}

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");
  const {state} = useNavigation();
  const actionData = useActionData();
  

  return (
    <main className="login-main" style={{ justifyContent: "center" }}>
      {message && <h2>{message}</h2>}
      <h1>Sign in to your account.</h1>
      <Form className="form-container" method="post" replace>
        <input name="Email" placeholder="Email address"></input>
        <input name="Password" placeholder="Password" type="password"></input>
        <button type="submit" disabled={state=="submitting"}>{state=="submitting"?"Logging in...":"log in"}</button>
      </Form>
      {actionData && <p style={{ color: "red" }}>{actionData}</p>}
    </main>
  );
}
