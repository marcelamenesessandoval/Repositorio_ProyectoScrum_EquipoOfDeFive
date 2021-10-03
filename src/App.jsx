
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Index from 'pages/index';
import LoginPage from 'pages/login';
import RegistroPage from 'pages/registro';
import AdminSidebar from 'pages/admin/admin';
import NuevaVentapage from 'pages/nuevaventa'
import VentasPage from 'pages/ventas';
import ProductosPage from 'pages/admin/productos';
import UsuariosPage from 'pages/admin/usuarios';
import PublicLayout from 'layouts/PublicLayout';
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";
//import 'styles/stylesside.module.css';
import 'styles/stylesppal.css';
import 'styles/stylestable.css';








function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* PRIVATE */}
          <Route exact path={['/admin', '/nuevaventa', '/ventas', '/admin/productos', '/admin/usuarios']}>
            <PrivateLayout>
              <Switch>
              <Route exact path='/nuevaventa'>
                <NuevaVentapage />
                </Route>
                <Route exact path='/ventas'>
                <VentasPage />
                </Route>
                <Route exact path='/admin/productos'>
                <ProductosPage />
                </Route>
                <Route exact path='/admin/usuarios'>
                <UsuariosPage />
                </Route>
                <Route exact path='/admin'>
                <AdminSidebar />
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>
          
          {/* AUTHOLAY0UT */}
          <Route path={['/login','/registro']}>
            <AuthLayout>
              <Switch>
                <Route exact path='/login'>
                  <LoginPage />
                </Route>
                <Route exact path='/registro'>
                  <RegistroPage />
                </Route>
              </Switch>
            </AuthLayout>
          </Route>
          
          {/* PRUBLIC */}
          <Route exact path={['/']}>
            <PublicLayout>
              <Route>
              <Index />
              </Route>
            </PublicLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;

