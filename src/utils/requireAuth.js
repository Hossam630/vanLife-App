import { redirect } from "react-router";


export default function requireAuth(loggedIn, request) {
    const pathName = new URL(request.url).pathname;
    if (!loggedIn) {
      return redirect(
        `/login?message=you must login first&redirectTo=${pathName}`
      );
    }
    return null;
  }