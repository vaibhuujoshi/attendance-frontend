import { useEffect } from "react";

function Login() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      alert("Invalid login link");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/auth/telegram-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      })
      .catch(() => {
        alert("Login failed");
      });
  }, []);

  return <p>Logging you in via Telegram…</p>;
}

export default Login;
