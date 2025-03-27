import { useTitlePage } from "./title/useTitlePage";
import { useErrorException } from "./error/useErrorException";

/* Authenticacion */
import { useAuthStore } from "./auth/useAuthStore";

/* Header Menu */
import { useUiHeaderMenu } from "./layout/useUiHeaderMenu";

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

/* Marcaciones */
import { useMarcacionStore } from "./marcacion/useMarcacionStore";

/* Inventario: Tipos categorias */
import { useInvTipocategoriaStore } from "./inventario/tipocategoria/useInvTipocategoriaStore";
import { useInvUiTipocategoria } from "./inventario/tipocategoria/useInvUiTipocategoria";

/* Inventario: Categorias */
import { useInvCategoriaStore } from "./inventario/categoria/useInvCategoriaStore";
import { useInvUiCategoria } from "./inventario/categoria/useInvUiCategoria";

/* Inventario: Marcas */
import { useInvMarcaStore } from "./inventario/marca/useInvMarcaStore";
import { useInvUiMarca } from "./inventario/marca/useInvUiMarca";


/* Inventario: Estados */
import { useInvEstadoStore } from "./inventario/estado/useInvEstadoStore";
import { useInvUiEstado } from "./inventario/estado/useInvUiEstado";

/* Inventario: Conceptos */
import { useInvConceptoStore } from "./inventario/concepto/useInvConceptoStore";
import { useInvUiConcepto } from "./inventario/concepto/useInvUiConcepto";


/* Inventario: Equipos */
import { useInvEquipoStore } from "./inventario/equipo/useInvEquipoStore";
import { useInvUiEquipo } from "./inventario/equipo/useInvUiEquipo";

/* Inventario: Ubicaciones */
import { useInvUbicacionStore } from "./inventario/ubicacion/useInvUbicacionStore";
import { useInvUiUbicacion } from "./inventario/ubicacion/useInvUiUbicacion";

/* Inventario: Consumibles */
import { useInvConsumibleStore } from "./inventario/consumible/useInvConsumibleStore";
import { useUiInvConsumible } from "./inventario/consumible/useUiInvConsumible";

/* Inventario: UI Custodio */
import { useUiInvCustodio } from "./inventario/custodio/useUiInvCustodio";

/* Storage */
import { useStorageField } from "./storage/useStorageField";

export {
    useTitlePage,
    useErrorException,

    useAuthStore,

    useUiHeaderMenu,

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
    useUiPermiso,

    useMarcacionStore,


    useInvTipocategoriaStore,
    useInvUiTipocategoria,

    useInvCategoriaStore,
    useInvUiCategoria,

    useInvMarcaStore,
    useInvUiMarca,

    useInvEstadoStore,
    useInvUiEstado,

    useInvConceptoStore,
    useInvUiConcepto,

    useInvEquipoStore,
    useInvUiEquipo,

    useInvUbicacionStore,
    useInvUiUbicacion,

    useInvConsumibleStore,
    useUiInvConsumible,

    useUiInvCustodio,

    useStorageField
}
