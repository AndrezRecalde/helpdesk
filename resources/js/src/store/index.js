/* Auth */
import { authSlice } from "./auth/authSlice";

/* Usuarios */
import { usersSlice } from "./user/usersSlice";
import { uiUserSlice } from "./user/uiUserSlice";

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

    /* Direccion */
    direccionSlice,
 };
