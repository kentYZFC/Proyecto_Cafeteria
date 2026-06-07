"use client";

import {
  createContext,
  useContext,
  useState
} from "react";

import {
  productosIniciales
} from "@/data/productos";

const ProductosContext =
createContext();

export function ProductosProvider({
  children
}) {

  const [
    productos,
    setProductos
  ] = useState(
    productosIniciales
  );

  return (

    <ProductosContext.Provider
      value={{
        productos,
        setProductos
      }}
    >

      {children}

    </ProductosContext.Provider>

  );
}

export function useProductos(){

  return useContext(
    ProductosContext
  );
}