"use client";

import { useState } from "react";
import { Alert, Box, Button, Heading, Input } from "@chakra-ui/react";

import { loginAction } from "./actions/index";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await loginAction({ email, password });
    } catch (error) {
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{"Your credentials are invalid"}</Alert.Title>
          <Alert.Description>
            Your form has some errors. Please fix them and try again.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>;
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="20">
      <Heading as="h1" size="xl" mb="4">
        Iniciar sesión
      </Heading>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb="2"
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb="4"
      />
      <Button colorScheme="blue" width="100%" onClick={login}>
        Entrar
      </Button>
    </Box>
  );
}
