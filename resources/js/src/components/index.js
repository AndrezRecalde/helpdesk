/* Authenticacion */
import { AuthForm } from "./auth/AuthForm";

/* Usuario : Perfil */
import { CardProfile } from "./user/profile/CardProfile";
import { ProfileForm } from "./user/profile/ProfileForm";
import { UserBtnHeader } from "./user/menu/UserBtnHeader";

/* Usuario: Contraseña */
import { ChangePwdForm } from "./user/password/ChangePwdForm";

/* Elementos Gerencia */
    /* CHARTS */
import { ChartBarDesempAreas } from "./gerencia/dashboard/charts/ChartBarDesempAreas";
import { ChartBarSoportes } from "./gerencia/dashboard/charts/ChartBarSoportes";
import { ChartDesempTecnicos } from "./gerencia/dashboard/charts/ChartDesempTecnicos";
import { ChartPieEficiencia } from "./gerencia/dashboard/charts/ChartPieEficiencia";
import { ChartPieSoportes } from "./gerencia/dashboard/charts/ChartPieSoportes";
import { ChartSoportesMes } from "./gerencia/dashboard/charts/ChartSoportesMes";
    /* STATS */
import { DashInfoStats } from "./gerencia/dashboard/stats/DashInfoStats";
import { DashSoporteStats } from "./gerencia/dashboard/stats/DashSoporteStats";
    /* DIRECCION */
import { FilterFormDirecciones } from "./gerencia/direccion/filter/FilterFormDirecciones";
import { FormDirector } from "./gerencia/direccion/form/FormDirector";
import { ModalDireccion } from "./gerencia/direccion/modal/ModalDireccion";
import { DireccionesTable } from "./gerencia/direccion/table/DireccionesTable";
    /* PERMISO */
import { FilterPermisoAdmin } from "./gerencia/permiso/filter/FilterPermisoAdmin";
import { FormSolicitudPermiso } from "./gerencia/permiso/form/FormSolicitudPermiso";
    /* SOPORTE */
import { FilterFormSearchDates } from "./gerencia/soporte/filter/FilterFormSearchDates";
import { FilterFormSoportes } from "./gerencia/soporte/filter/FilterFormSoportes";
import { SolicitudesAnuladasTable } from "./gerencia/soporte/table/SolicitudesAnuladasTable";
import { SolicitudesTable } from "./gerencia/soporte/table/SolicitudesTable";
    /* TECNICO */
import { FormActivateTecnico } from "./gerencia/tecnico/form/FormActivateTecnico";
import { FormAddTecnico } from "./gerencia/tecnico/form/FormAddTecnico";
import { ModalActivateTecnico } from "./gerencia/tecnico/modal/ModalActivateTecnico";
import { ModalAddTecnico } from "./gerencia/tecnico/modal/ModalAddTecnico";
import { ModalDesempTecnicos } from "./gerencia/tecnico/modal/ModalDesempTecnicos";
import { TecnicosTable } from "./gerencia/tecnico/table/TecnicosTable";

    /* Usuario */
import { ActivateUserBtn } from "./gerencia/user/btn/ActivateUserBtn";
import { FilterFormUsers } from "./gerencia/user/filter/FilterFormUsers";
import { FormActiveUser } from "./gerencia/user/form/FormActiveUser";
import { FormInfoUser } from "./gerencia/user/form/FormInfoUser";
import { FormResetPwdUser } from "./gerencia/user/form/FormResetPwdUser";
import { FormTipoUser } from "./gerencia/user/form/FormTipoUser";
import { FormTrabajoUser } from "./gerencia/user/form/FormTrabajoUser";
import { ModalActivateUser } from "./gerencia/user/modal/ModalActivateUser";
import { ModalResetPwdUser } from "./gerencia/user/modal/ModalResetPwdUser";
import { ModalUser } from "./gerencia/user/modal/ModalUser";
import { StepperUser } from "./gerencia/user/stepper/StepperUser";
import { UsersTable } from "./gerencia/user/table/UsersTable";

/* Permisos */
import { FilterPermiso } from "./permiso/filter/FilterPermiso";
import { FormAnularPermiso } from "./permiso/form/FormAnularPermiso";
import { ModalAnularPermiso } from "./permiso/modal/ModalAnularPermiso";
import { PermisosTable } from "./permiso/table/PermisosTable";


/* Soportes */
import { CardIndicadores } from "./soportes/card/indicador/CardIndicadores";
import { ModalCierreSoportes } from "./soportes/drawer/ModalCierreSoportes";
import { FormAnularSoporte } from "./soportes/form/FormAnularSoporte";
import { FormAsignarSoporte } from "./soportes/form/FormAsignarSoporte";
import { FormCierreSoporte } from "./soportes/form/FormCierreSoporte";
import { FormCreateSoporte } from "./soportes/form/FormCreateSoporte";
import { FormDiagnosticar } from "./soportes/form/FormDiagnosticar";
import { FormSolicitudAdminSoporte } from "./soportes/form/FormSolicitudAdminSoporte";

import { ModalAnularSoporte } from "./soportes/modal/ModalAnularSoporte";
import { ModalAsignarSoporte } from "./soportes/modal/ModalAsignarSoporte";
import { ModalCreateSoporte } from "./soportes/modal/ModalCreateSoporte";
import { ModalDiagnostico } from "./soportes/modal/ModalDiagnostico";
import { ModalSolicitudAdminSoporte } from "./soportes/modal/ModalSolicitudAdminSoporte";

import { ResumenDesempenoArea } from "./soportes/section/ResumenDesempenoArea";
import { ResumenDesempenoEstados } from "./soportes/section/ResumenDesempenoEstados";
import { SectionUsersSoportesActuales } from "./soportes/section/SectionUsersSoportesActuales";
import { SectionUsersSoportesAnuales } from "./soportes/section/SectionUsersSoportesAnuales";

import { ContactIcon, ContactIconsList } from "./soportes/solicitudes/ContactIcons";

import { SoportesCalificacionTable } from "./soportes/table/SoportesCalificacionTable";
import { SoportesTable } from "./soportes/table/SoportesTable";
import { SoportesUsersTable } from "./soportes/table/SoportesUsersTable";

import { TableDesempenoAreas } from "./soportes/table/indicadores/TableDesempenoAreas";
import { TableDesempenoEstados } from "./soportes/table/indicadores/TableDesempenoEstados";
import { TableDesempenoTecnicos } from "./soportes/table/indicadores/TableDesempenoTecnicos";
import { TableEfectividadAreas } from "./soportes/table/indicadores/TableEfectividadAreas";
import { TableEfectividadTecnicos } from "./soportes/table/indicadores/TableEfectividadTecnicos";
import { TableIndicadorEficacia } from "./soportes/table/indicadores/TableIndicadorEficacia";

/* Actividades */
import { ActividadForm } from "./actividad/form/ActividadForm";
import { ModalActividad } from "./actividad/modal/ModalActividad";

/* Marcaciones */
import { FilterFormMarcaciones } from "./marcacion/form/FilterFormMarcaciones";
import { TableMarcacion } from "./marcacion/table/TableMarcacion";

/* Elementos */
import { Logo } from "./elements/application/Logo";
import { TitlePage } from "./elements/titles/TitlePage";
import { TextSection } from "./elements/titles/TextSection";
import { AlertSection } from "./elements/alert/AlertSection";
import {
    BtnSubmit,
    BtnSection,
    BtnAddActions,
    BtnSolicitarSoporte,
    BtnAdministracion
} from "./elements/buttons/BtnServices";
import { BtnDarkMode, ActionReportPDF, BtnSearchMenu } from "./elements/buttons/BtnActions";
import { InformationActividadList } from "./elements/lists/InformationActividadList";
import { MenuSeleccion } from "./elements/menu/MenuSeleccion";
import { FormRichText } from "./elements/rte/FormRichText";
import {
    MenuUsersTable,
    MenuTable_E,
    MenuTable_T,
    MenuSolicitudTable,
    MenuTable_Per,
} from "./elements/tables/MenuTable";
import { TableContent } from "./elements/tables/TableContent";


export {
    /* Authenticacion */
    AuthForm,

    /* Usuario: Perfil */
    ProfileForm,
    CardProfile,
    UserBtnHeader,

    /* Usuario: Contraseña */
    ChangePwdForm,

    /* Elementos Gerencia */
    /* CHARTS */
    ChartBarDesempAreas,
    ChartBarSoportes,
    ChartDesempTecnicos,
    ChartPieEficiencia,
    ChartPieSoportes,
    ChartSoportesMes,
    /* STATS */
    DashInfoStats,
    DashSoporteStats,
    /* DIRECCION */
    FilterFormDirecciones,
    FormDirector,
    ModalDireccion,
    DireccionesTable,
    /* PERMISO */
    FilterPermisoAdmin,
    FormSolicitudPermiso,
    /* SOPORTE */
    FilterFormSearchDates,
    FilterFormSoportes,
    SolicitudesAnuladasTable,
    SolicitudesTable,
    /* TECNICO */
    FormActivateTecnico,
    FormAddTecnico,
    ModalActivateTecnico,
    ModalAddTecnico,
    ModalDesempTecnicos,
    TecnicosTable,

    /* Usuario */
    ActivateUserBtn,
    FilterFormUsers,
    FormActiveUser,
    FormInfoUser,
    FormResetPwdUser,
    FormTipoUser,
    FormTrabajoUser,
    ModalActivateUser,
    ModalResetPwdUser,
    ModalUser,
    StepperUser,
    UsersTable,

    /* Permisos */
    FilterPermiso,
    FormAnularPermiso,
    ModalAnularPermiso,
    PermisosTable,

    /* Soportes */
    CardIndicadores,
    ModalCierreSoportes,
    FormAnularSoporte,
    FormAsignarSoporte,
    FormCierreSoporte,
    FormCreateSoporte,
    FormDiagnosticar,
    FormSolicitudAdminSoporte,

    ModalAnularSoporte,
    ModalAsignarSoporte,
    ModalCreateSoporte,
    ModalDiagnostico,
    ModalSolicitudAdminSoporte,

    ResumenDesempenoArea,
    ResumenDesempenoEstados,
    SectionUsersSoportesActuales,
    SectionUsersSoportesAnuales,

    ContactIcon,
    ContactIconsList,
    SoportesCalificacionTable,
    SoportesTable,
    SoportesUsersTable,

    TableDesempenoAreas,
    TableDesempenoEstados,
    TableDesempenoTecnicos,
    TableEfectividadAreas,
    TableEfectividadTecnicos,
    TableIndicadorEficacia,

    /* Actividades */
    ActividadForm,
    ModalActividad,

    /* Marcaciones */
    FilterFormMarcaciones,
    TableMarcacion,


    /* Elements */
    Logo,
    TitlePage,
    TextSection,
    AlertSection,
    BtnSubmit,
    BtnSection,
    BtnAddActions,
    BtnSolicitarSoporte,
    BtnAdministracion,
    BtnDarkMode,
    ActionReportPDF,
    BtnSearchMenu,
    InformationActividadList,
    MenuSeleccion,
    FormRichText,
    MenuUsersTable,
    MenuTable_E,
    MenuTable_T,
    MenuSolicitudTable,
    MenuTable_Per,
    TableContent
};
