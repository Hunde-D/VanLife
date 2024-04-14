import { useState } from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../API";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await loginUser({ email, password });
    localStorage.setItem("loggedIn", true);

    const redirectPath =
      new URL(request.url).searchParams.get("redirectTo") || "/";
    const response = redirect(redirectPath);
    response.body = true;
    return response;
  } catch (error) {
    return error.message;
  }
}

export default function Login() {
  const navigation = useNavigation();
  const errorMessage = useActionData();
  const message = useLoaderData();

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(loginFormData)
      .then((data) => {
        navigate("/host", { replace: true });
      })
      .finally(() => setStatus("idle"));
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
