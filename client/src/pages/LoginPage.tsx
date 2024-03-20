import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Handle login success

      setIsLoggingIn(false);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/app");
    } catch (error) {
      setIsLoggingIn(false);
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[#0b1218]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/logo.png" alt="aizoon logo" width={100} />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">Interview Project - Task Management</p>
            <footer className="text-sm">
              <a href="https://www.aizoongroup.com/">
                made by <b>aizoOn</b>
              </a>
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter username and password
            </p>
          </div>
          <div style={{ padding: "2rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <Button
              className="w-full"
              variant="default"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
