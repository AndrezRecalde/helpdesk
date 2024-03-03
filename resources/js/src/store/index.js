/* Auth */
import { authSlice } from "./auth/authSlice";

/* Usuarios */
import { usersSlice } from "./user/usersSlice";
import { uiUserSlice } from "./user/uiUserSlice";

/* Empresas */
import { empresaSlice } from "./empresa/empresaSlice";

/* Direcciones */
import { direccionSlice } from "./direccion/direccionSlice";

import { store } from "./store";



export {
    store,


    /* Auth */
    authSlice,

    /*User */
    usersSlice,
    uiUserSlice,

    /* Empresas */
    empresaSlice,

    /* Direccion */
    direccionSlice,
 };
