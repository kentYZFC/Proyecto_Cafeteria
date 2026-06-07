export default function MenuCard({
  producto,
  agregarAlCarrito
}) {

  return (
    <div className="card">

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="producto-img"
      />

      <h3>{producto.nombre}</h3>

      <p>${producto.precio}</p>

      <button
        onClick={() =>
          agregarAlCarrito(producto)
        }
      >
        Agregar al carrito
      </button>

    </div>
  );
}