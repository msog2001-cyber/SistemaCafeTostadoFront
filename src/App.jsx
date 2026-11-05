
import { useState } from 'react'
import './App.css'

function App() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Café tostado Huila', presentacion: '250 g', precio: 18000, stock: 15 },
    { id: 2, nombre: 'Café tostado Huila', presentacion: '500 g', precio: 34000, stock: 10 },
    { id: 3, nombre: 'Café tostado Huila', presentacion: '1 libra', precio: 32000, stock: 5 },
  ])

  const [nombre, setNombre] = useState('')
  const [presentacion, setPresentacion] = useState('250 g')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')

  const agregarProducto = (e) => {
    e.preventDefault()

    if (!nombre || !precio || !stock) {
      alert('Por favor, completa todos los campos.')
      return
    }

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      presentacion,
      precio: Number(precio),
      stock: Number(stock),
    }

    setProductos([...productos, nuevoProducto])

    setNombre('')
    setPresentacion('250 g')
    setPrecio('')
    setStock('')
  }

  const formatoCOP = (valor) =>
    valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    })

  return (
    <div className="app">
      <header className="encabezado">
        <div>
          <h1>☕ Un Cafecito Pa' Ti</h1>
          <p>Sistema de gestión de café tostado</p>
        </div>
        <span className="estado">● Sistema activo</span>
      </header>

      <main className="contenido">
        <section className="resumen">
          <div className="tarjeta">
            <h3>Total de productos</h3>
            <p>{productos.length}</p>
          </div>

          <div className="tarjeta">
            <h3>Unidades en inventario</h3>
            <p>{productos.reduce((total, p) => total + p.stock, 0)}</p>
          </div>

          <div className="tarjeta">
            <h3>Valor del inventario</h3>
            <p>
              {formatoCOP(
                productos.reduce((total, p) => total + p.precio * p.stock, 0)
              )}
            </p>
          </div>
        </section>

        <section className="panel">
          <h2>Registrar producto</h2>

          <form onSubmit={agregarProducto}>
            <label>
              Nombre del producto
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Café tostado Huila"
                required
              />
            </label>

            <label>
              Presentación
              <select
                value={presentacion}
                onChange={(e) => setPresentacion(e.target.value)}
              >
                <option>125 g</option>
                <option>250 g</option>
                <option>500 g</option>
                <option>1 libra</option>
              </select>
            </label>

            <label>
              Precio (COP)
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Ej. 18000"
                min="1"
                required
              />
            </label>

            <label>
              Cantidad disponible
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Ej. 15"
                min="0"
                required
              />
            </label>

            <button type="submit">+ Agregar producto</button>
          </form>
        </section>

        <section className="panel">
          <h2>Inventario de productos</h2>

          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Presentación</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.presentacion}</td>
                    <td>{formatoCOP(producto.precio)}</td>
                    <td>{producto.stock} unidades</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>
        Un Cafecito Pa' Ti | Sistema de inventario
      </footer>
    </div>
  )
}

export default App
