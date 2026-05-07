import { router } from "expo-router";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setError(tree.properties?.email?.errors?.[0] ?? tree.properties?.password?.errors?.[0] ?? "Datos inválidos");
      return;
    }

    if (result.data.password !== "1234") {
      setError("Contraseña incorrecta");
      return;
    }

    setError("");
    router.push({
      pathname: "/(tabs)",
      params: { email: result.data.email },
    });
  };

  return {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
}
