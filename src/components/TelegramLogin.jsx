import { useEffect } from "react";

export default function TelegramLogin() {
  useEffect(() => {
    window.onTelegramAuth = async (user) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/telegram`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        }
      );

      const data = await res.json();
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      window.location.reload();
    };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute(
      "data-telegram-login",
      "Attendance009bot"
    );
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");

    document.getElementById("telegram-login").appendChild(script);
  }, []);

  return <div id="telegram-login"></div>;
}
