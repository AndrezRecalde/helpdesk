import { useTitlePage } from "./title/useTitlePage";
import { useErrorException } from "./error/useErrorException";

/* Authenticacion */
import { useAuthStore } from "./auth/useAuthStore";

/* Usuarios */
import { useUsersStore } from "./user/useUsersStore";
import { useUiUser } from "./user/useUiUser";

/* Tecnicos */
import { useTecnicoStore } from "./tecnico/useTecnicoStore";
import { useUiTecnico } from "./tecnico/useUiTecnico";

/* Empresas */
import { useEmpresaStore } from "./empresa/useEmpresaStore";

/* Direcciones */
import { useDireccionStore } from "./direccion/useDireccionStore";

/* Directores */
import { useDirectorStore } from "./director/useDirectorStore";
import { useUiDirector } from "./director/useUiDirector";

/* Tipo Sexo */
import { useSexoStore } from "./sexo/useSexoStore";

/* Departamentos */
import { useDepartamentoStore } from "./departamento/useDepartamentoStore";

/* Cargos */
import { useCargoStore } from "./cargo/useCargoStore";

/* Tipos de usuario */
import { useTipoUsuarioStore } from "./tipoUsuario/useTipoUsuarioStore";

/* Tipos Contratos */
import { useTipoContratoStore } from "./tipoContrato/useTipoContratoStore";

/* Tipos Solicitudes */
import { useTipoSolicitudStore } from "./tipoSolicitud/useTipoSolicitudStore";

/* Tipos Diagnosticos */
import { useDiagnosticoStore } from "./diagnostico/useDiagnosticoStore";

/* Equipos */
import { useEquipoStore } from "./equipo/useEquipoStore";

/* Estados Soportes */
import { useEstadoStore } from "./estado/useEstadoStore";

/* Soportes */
import { useSoporteStore } from "./soporte/useSoporteStore";
import { useUiSoporte } from "./soporte/useUiSoporte";

/* Indicadores */
import { useIndicadorStore } from "./indicador/useIndicadorStore";
import { useUiIndicador } from "./indicador/useUiIndicador";

/* Dashboard Gerencia */
import { useDashGerenciaStore } from "./dashboard/useDashGerenciaStore";

/* Actividades */
import { useActividadStore } from "./actividad/useActividadStore";
import { useUiActividad } from "./actividad/useUiActividad";

/* Permisos */
import { usePermisoStore } from "./permiso/usePermisoStore";
import { useUiPermiso } from "./permiso/useUiPermiso";

export {
    useTitlePage,
    useErrorException,

    useAuthStore,

    useUsersStore,
    useUiUser,

    useTecnicoStore,
    useUiTecnico,

    useEmpresaStore,

    useDireccionStore,

    useDirectorStore,
    useUiDirector,

    useSexoStore,

    useDepartamentoStore,

    useCargoStore,

    useTipoUsuarioStore,

    useTipoContratoStore,

    useTipoSolicitudStore,

    useDiagnosticoStore,

    useEquipoStore,

    useEstadoStore,

    useSoporteStore,
    useUiSoporte,

    useIndicadorStore,
    useUiIndicador,

    useDashGerenciaStore,

    useActividadStore,
    useUiActividad,

    usePermisoStore,
    useUiPermiso
}
