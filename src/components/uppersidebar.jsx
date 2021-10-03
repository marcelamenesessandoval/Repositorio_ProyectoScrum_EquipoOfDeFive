
import React from 'react'

const UpperSidebar = () => {
    return (
      <div>
        <div className="upperbar">
          <form>
            <input
              type="search"
              placeholder="   Que producto deseas..."
              className="busqueda"
            />
            <button type="sunmit" className="button2">
              <span />
              Buscar
            </button>
          </form>
          <div className="profile">
            <img
              src="media/rostro3.jpeg"
              className="profile_photo"
              alt="foto_perfil"
            />
            <div className="profile_txt">
              <p className="txt_perfil">Sergio Perez</p>
              <h3>Admin</h3>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UpperSidebar;
