import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import useNotifications from "./notificacion";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setProducto] = useState("");
  const [price, setPrecio] = useState("");

  const { notify } = useNotifications(); 

  useEffect(() => {
    const socket = io("http://34.234.26.214:5000");
    
    socket.on("connect", () => {
      console.log("Conexión establecida");
    });
  
    socket.on("disconnect", () => {
      console.log("Conexión perdida, intentando reconectar...");
      // Intenta reconectar después de un breve retraso
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });
  
    socket.on("receiveData", (orden) => {
      console.log(orden);
      alert("Se realizó el pago: " + JSON.stringify(orden));
    });
  
    // Manejo de errores
    socket.on("error", (error) => {
      console.error("Error en la conexión WebSocket:", error);
    });
  
    return () => {
      console.log("Desconectando socket");
      socket.disconnect();
    };
  }, []);
  

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://54.211.244.76:3000/api/order", {
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
