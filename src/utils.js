import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("loggedIn");

  const path = new URL(request.url).pathname;

  if (!isLoggedIn) {
    // throw redirect("/login");
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${path}`
    );
    response.body = true;
    throw response;
  }
  return null;
}
