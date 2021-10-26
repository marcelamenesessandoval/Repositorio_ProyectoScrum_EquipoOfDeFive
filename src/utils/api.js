
import axios from "axios";

export const obtenerProductos = async (succesCallback, errorCallback) => {
    const options = { method: 'GET', url: 'https://sleepy-peak-71602.herokuapp.com/' };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};


export const crearProducto = async (data, succesCallback, errorCallback) => {
    const options = {
        method: 'POST',
        url: 'https://sleepy-peak-71602.herokuapp.com/',
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
        url: 'https://sleepy-peak-71602.herokuapp.com/productos/' + id + '/',
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
        url: 'https://sleepy-peak-71602.herokuapp.com/productos/' + id + '/',
        headers: { 'Content-Type': 'application/json' }
    };
    await axios
        .request(options)
        .then(succesCallback)
        .catch(errorCallback);
};



