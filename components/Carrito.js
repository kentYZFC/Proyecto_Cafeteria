export default function Carrito({
  carrito,
  eliminarDelCarrito,
  pagar
}) {

  const total = carrito.reduce(
    (acum, producto) =>
      acum + producto.precio,
    0
  );

  return (

    <div className="carrito">

      <h2>🛒 Carrito</h2>

      {
        carrito.length === 0 &&
        <p>No hay productos.</p>
      }

      {
        carrito.map((producto,index)=>(
          <div
            key={index}
            className="item-carrito"
          >

            <span>
              {producto.nombre}
              -
              ${producto.precio}
            </span>

            <button
              onClick={() =>
                eliminarDelCarrito(index)
              }
            >
              Eliminar
            </button>

          </div>
        ))
      }

      <h3>Total: ${total}</h3>

      {
        carrito.length > 0 &&
        <button
          onClick={pagar}
        >
          Pagar
        </button>
      }

    </div>

  );
}