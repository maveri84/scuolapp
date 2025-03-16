
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "404 Error: Utente ha tentato di accedere a una rotta inesistente:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Pagina non trovata</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Torna alla Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
