/* Auth */
import { authSlice } from "./auth/authSlice";

/* Usuarios */
import { usersSlice } from "./user/usersSlice";

/* Direcciones */
import { direccionSlice } from "./direccion/direccionSlice";

import { store } from "./store";



export {
    store,


    /* Auth */
    authSlice,

    /*User */
    usersSlice,

    /* Direccion */
    direccionSlice,
 };
