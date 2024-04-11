/* Auth */
import { authSlice } from "./auth/authSlice";

/* Usuarios */
import { usersSlice } from "./user/usersSlice";
import { uiUserSlice } from "./user/uiUserSlice";

/* Tecnicos */
import { tecnicoSlice } from "./tecnico/tecnicoSlice";
import { uiTecnicoSlice } from "./tecnico/uiTecnicoSlice";

/* Empresas */
import { empresaSlice } from "./empresa/empresaSlice";

/* Direcciones */
import { direccionSlice } from "./direccion/direccionSlice";

/* Directores */
import { directorSlice } from "./directores/directorSlice";
import { uiDirectorSlice } from "./directores/uiDirectorSlice";

/* Tipo Sexo */
import { sexoSlice } from "./sexo/sexoSlice";

/* Departamentos */
import { departamentoSlice } from "./departamento/departamentoSlice";

/* Cargos */
import { cargoSlice } from "./cargo/cargoSlice";

/* Tipos Usuarios */
import { tiposUsuariosSlice } from "./tiposUsuarios/tiposUsuariosSlice";

/* Tipos Contratos */
import { tipoContratoSlice } from "./tiposContratos/tipoContratoSlice";

/* Tipos Solicitudes */
import { tipoSolicitudSlice } from "./tiposSolicitudes/tipoSolicitudSlice";

/* Tipos Diagnosticos */
import { diagnosticoSlice } from "./diagnostico/diagnosticoSlice";

/* Equipos */
import { equipoSlice } from "./equipo/equipoSlice";

/* Estados */
import { estadoSlice } from "./estado/estadoSlice";

/* Soportes */
import { soporteSlice } from "./soporte/soporteSlice";
import { uiSoporteSlice } from "./soporte/uiSoporteSlice";

/* Indicadores */
import { indicadorSlice } from "./indicador/indicadorSlice";
import { uiIndicadorSlice } from "./indicador/uiIndicadorSlice";

/* Dashboards */
import { dashGerenciaSlice } from "./dashboard/dashGerenciaSlice";

/* Actividades */
import { actividadSlice } from "./actividad/actividadSlice";
import { uiActividadSlice } from "./actividad/uiActividadSlice";

/* Permisos */
import { permisoSlice } from "./permiso/permisoSlice";
import { uiPermisoSlice } from "./permiso/uiPermisoSlice";

/* Storage Fields */
import { storageFieldsSlice } from "./fields/storageFieldsSlice";

import { store } from "./store";



export {
    store,


    /* Auth */
    authSlice,

    /*User */
    usersSlice,
    uiUserSlice,

    /* Tecnico */
    tecnicoSlice,
    uiTecnicoSlice,

    /* Empresas */
    empresaSlice,

    /* Direccion */
    direccionSlice,

    /* Directores */
    directorSlice,
    uiDirectorSlice,

    /* Tipo de sexo */
    sexoSlice,

    /* Departamentos */
    departamentoSlice,

    /* Cargo */
    cargoSlice,

    /* Tipos Usuarios */
    tiposUsuariosSlice,

    /* Tipos Contratos */
    tipoContratoSlice,

    /* Tipos Solicitudes */
    tipoSolicitudSlice,

    /* Tipos Diagnosticos */
    diagnosticoSlice,

    /*Equipos */
    equipoSlice,

    /* Estados */
    estadoSlice,

    /* Soportes */
    soporteSlice,
    uiSoporteSlice,

    /* Indicadores */
    indicadorSlice,
    uiIndicadorSlice,

    /* Dashboard */
    dashGerenciaSlice,

    /* Actividades */
    actividadSlice,
    uiActividadSlice,

    /* Permisos */
    permisoSlice,
    uiPermisoSlice,

    /* Storage */
    storageFieldsSlice
 };
