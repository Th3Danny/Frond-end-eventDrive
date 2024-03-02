import { useNotifications } from "./hooks/useNotifications";
import { postProduct } from "../src/services/services/postProduct";
import "./App.css";

function App() {
  const { data, loading } = useNotifications();

  
  const product = {
    title: "Nombre del Producto",
    price: 10.99,
    description: "Descripción del producto",
   
  };

  const handleClick = (e) => {
    e.preventDefault();
    postProduct(product); 
  };

  return (
    <>
      {data !== null && loading === false && <h1>{data?.title}</h1>}
      <div className="card">
        <button onClick={handleClick}>Agregar Producto</button>
        {loading && data === null && "Cargando..."}
      </div>
    </>
  );
}

export default App;
