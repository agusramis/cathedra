import { AuthProvider } from "./context/auth-context";
import Navbar from "./components/Navbar";
import { ReactNode } from "react";
import { Providers } from "./chakra-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Navbar />

          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
