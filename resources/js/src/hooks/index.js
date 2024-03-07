import { useErrorException } from "./error/useErrorException";

/* Authenticacion */
import { useAuthStore } from "./auth/useAuthStore";

/* Usuarios */
import { useUsersStore } from "./user/useUsersStore";
import { useUiUser } from "./user/useUiUser";

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

/* Soportes */
import { useSoporteStore } from "./soporte/useSoporteStore";
import { useUiSoporte } from "./soporte/useUiSoporte";

export {
    useErrorException,

    useAuthStore,

    useUsersStore,
    useUiUser,

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

    useSoporteStore,
    useUiSoporte
}
