import "./globals.css";

import {
  ProductosProvider
}
from "@/context/ProductosContext";

export const metadata = {
  title: "Cafetería Xpresso",
  description: "La mejor cafetería"
};

export default function RootLayout({
  children
}) {

  return (

    <html lang="es">

      <body>

        <ProductosProvider>

          {children}

        </ProductosProvider>

      </body>

    </html>

  );
}