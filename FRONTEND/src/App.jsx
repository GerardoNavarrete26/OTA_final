import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BarraLateral from "./components/BarraLateral";
import Login from "./pages/Login/Login";
import CrearUsuario from "./pages/Usuario/CrearUsuario";
import ModificarUsuario from "./pages/Usuario/ModificarUsuario";
import EliminarUsuario from "./pages/Usuario/EliminarUsuario";
import EstadoCabañas from "./pages/Cabañas/EstadoCabañas";
import ListaCabañas from "./pages/Cabañas/ListaCabañas";
import AñadirReservas from "./pages/Reservas/AñadirReservas";
import ListaReservas from "./pages/Reservas/ListaReservas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reportes from "./pages/Reportes/Reportes";
import CalendarioReservas from "./pages/Calendario/CalendarioReservas";

// Componente para rutas protegidas
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken'); // Obtén el token de localStorage

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Si no está autenticado, redirige al login
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('authToken');
    setIsAuthenticated(false); // Cambiar el estado de autenticación
    // Redirigir a la página de inicio de sesión inmediatamente
    window.location.href = '/'; // Redirige al login
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Rutas protegidas */}
        
        <Route path="/crear-usuario" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <CrearUsuario />
            <Footer />
          </ProtectedRoute>
        } />
        
        <Route path="/modificar-usuario" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <ModificarUsuario />
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/eliminar-usuario" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <EliminarUsuario />
            <Footer />
          </ProtectedRoute>
        } />
        
        <Route path="/reportes" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <Reportes />
            <Footer />
          </ProtectedRoute>
        } />
        
        <Route path="/estado-cabañas" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <EstadoCabañas />
            <Footer />
          </ProtectedRoute>
        } />
        
        <Route path="/lista-cabañas" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <ListaCabañas />
            <Footer />
          </ProtectedRoute>
        } />
        
        <Route path="/añadir-reservas" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <AñadirReservas />
            <Footer />
          </ProtectedRoute>
        } />
        
        <Route path="/lista-reservas" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <ListaReservas />
            <Footer />
          </ProtectedRoute>
        } />
          <Route path="/calendario-reservas" element={
          <ProtectedRoute>
       
            <BarraLateral />
            <CalendarioReservas />
            <Footer />
          </ProtectedRoute>
        } />
        
        {/* Ruta para cerrar sesión */}
        <Route path="/cerrar-sesion" element={
          <ProtectedRoute>
            <button onClick={handleLogout} className="btn btn-danger">
              Cerrar sesión
            </button>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
