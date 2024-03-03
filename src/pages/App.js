import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

function useNotifications() {
  // Define la función notify aquí
  const notify = (message) => {
    alert(message);
  };

  return { notify };
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setProducto] = useState("");
  const [price, setPrecio] = useState("");

  const { notify } = useNotifications(); // Utiliza el hook useNotifications para obtener la función notify

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("receiveData", (orden) => {
      console.log(orden);
      notify("Pago realizado: " + JSON.stringify(orden));
    });

    return () => {
      socket.disconnect();
    };
  }, [notify]);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:15672/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price
        }),
      });
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {data !== null && loading === false && <h1>{data.title}</h1>}
      <div className="card">
        <input
          type="text"
          placeholder="Producto"
          value={name}
          onChange={(e) => setProducto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button onClick={handleClick}>Agregar Producto</button>
        {loading && data === null && "Cargando..."}
      </div>
    </>
  );
}

export default App;
