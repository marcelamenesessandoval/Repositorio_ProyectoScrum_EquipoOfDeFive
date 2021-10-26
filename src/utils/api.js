
import axios from "axios";

export const obtenerProductos = async (succesCallback, errorCallback) => {
    const options = { method: 'GET', url: 'http://localhost:5000/productos' };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


export const crearProducto = async (data, succesCallback, errorCallback) => {
    const options = {
        method: 'POST',
        url: 'http://localhost:5000/productos',
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


export const editarProducto = async (id, data, succesCallback, errorCallback) => {
    const options = {
        method: 'PATCH',
        url: 'http://localhost:5000/productos/' + id + '/',
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


export const eliminarProducto = async (id, succesCallback, errorCallback) => {
    const options = {
        method: 'DELETE',
        url: 'http://localhost:5000/productos/' + id + '/',
        headers: { 'Content-Type': 'application/json' }
    };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


