import { useEffect } from "react";

export default function TelegramLogin() {
  useEffect(() => {
    window.onTelegramAuth = (user) => {
      console.log("Telegram auth user:", user);

      fetch(`${import.meta.env.VITE_API_URL}/auth/telegram`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("token", data.token);
          window.location.reload(); // 🔑 THIS IS IMPORTANT
        })
        .catch(err => {
          console.error("Login failed", err);
        });
    };
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="Attendance009bot"
        data-size="large"
        data-userpic="false"
        data-request-access="write"
        data-onauth="onTelegramAuth(user)"
      />
    </div>
  );            
}
