/* Authenticacion */
import { AuthForm } from "./auth/AuthForm";

/* Usuario : Perfil */
import { CardProfile } from "./user/profile/CardProfile";
import { ProfileForm } from "./user/profile/ProfileForm";
import { CardInfoStatsUser } from "./user/profile/CardInfoStatsUser";
import { TableMarcacionRelojOnline } from "./user/profile/TableMarcacionRelojOnline";
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
import { FilterDatesPermiso } from "./permiso/filter/FilterDatesPermiso";
import { PermisosConsolidadosTable } from "./permiso/table/PermisosConsolidadosTable";



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

import {
    ContactIcon,
    ContactIconsList,
} from "./soportes/solicitudes/ContactIcons";

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
import { TableMarcacion } from "./marcacion/table/TableMarcacion";

/* Inventario: Tipos Categorias */
import { InvTipocategoriaTable } from "./inventario/tipocategoria/table/InvTipocategoriaTable";
import { InvTipocategoriaModal } from "./inventario/tipocategoria/modal/InvTipocategoriaModal";
import { InvTipocategoriaForm } from "./inventario/tipocategoria/form/InvTipocategoriaForm";

/* Inventario: Categorias */
import { InvCategoriaTable } from "./inventario/categoria/table/InvCategoriaTable";
import { InvCategoriaForm } from "./inventario/categoria/form/InvCategoriaForm";
import { InvStockCategoriaForm } from "./inventario/categoria/form/InvStockCategoriaForm";
import { InvCategoriaModal } from "./inventario/categoria/modal/InvCategoriaModal";
import { InvStockCategoriaModal } from "./inventario/categoria/modal/InvStockCategoriaModal";


/* Inventario: Marca */
import { InvMarcaTable } from "./inventario/marca/table/InvMarcaTable";
import { InvMarcaModal } from "./inventario/marca/modal/InvMarcaModal";
import { InvMarcaForm } from "./inventario/marca/form/InvMarcaForm";

/* Inventario: Estado */
import { InvEstadoTable } from "./inventario/estado/table/InvEstadoTable";
import { InvEstadoModal } from "./inventario/estado/modal/InvEstadoModal";
import { InvEstadoForm } from "./inventario/estado/form/InvEstadoForm";

/* Inventario: Conceptos de Estados */
import { InvConceptoTable } from "./inventario/concepto/table/InvConceptoTable";
import { InvConceptoModal } from "./inventario/concepto/modal/InvConceptoModal";
import { InvConceptoForm } from "./inventario/concepto/form/InvConceptoForm";


/* Inventario: Ubicacion */
import { InvUbicacionTable } from "./inventario/ubicacion/table/InvUbicacionTable";
import { InvUbicacionModal } from "./inventario/ubicacion/modal/InvUbicacionModal";
import { InvUbicacionForm } from "./inventario/ubicacion/form/InvUbicacionForm";

/* Inventario: Equipos */
import { FilterFormEquipos } from "./inventario/equipo/filter/FilterFormEquipos";
import { InvEquipoTable } from "./inventario/equipo/table/InvEquipoTable";
import { InvEquipoResponsablesTable } from "./inventario/equipo/table/InvEquipoResponsablesTable";
import { InvEquipoModal } from "./inventario/equipo/modal/InvEquipoModal";
import { InvShowEquipoModal } from "./inventario/equipo/modal/InvShowEquipoModal";
import { InvEquipoAsignacionModal } from "./inventario/equipo/modal/InvEquipoAsignacionModal";
import { InvEquipoForm } from "./inventario/equipo/form/InvEquipoForm";
import { InvEquipoAsignacionForm } from "./inventario/equipo/form/InvEquipoAsignacionForm";
import { InvAsignacionForm } from "./inventario/equipo/form/InvAsignacionForm";
import { InvEquipoGeneralForm } from "./inventario/equipo/form/stepper/InvEquipoGeneralForm";
import { InvEquipoComplementaria } from "./inventario/equipo/form/stepper/InvEquipoComplementaria";
import { InvInfoGeneralEquipo } from "./inventario/equipo/form/elements/InvInfoGeneralEquipo";
import { InvTabsDetalleEquipo } from "./inventario/equipo/form/elements/tabs/InvTabsDetalleEquipo";
import { InvTabGeneralEquipo } from "./inventario/equipo/form/elements/tabs/InvTabGeneralEquipo";
import { InvTabUbicacionEquipo } from "./inventario/equipo/form/elements/tabs/InvTabUbicacionEquipo";
import { InvTabDocumentoEquipo } from "./inventario/equipo/form/elements/tabs/InvTabDocumentoEquipo";
import { InvDeleteEquipoModal } from "./inventario/equipo/modal/InvDeleteEquipoModal";
import { InvDeleteEquipoForm } from "./inventario/equipo/form/InvDeleteEquipoForm";
import { InvBajaEquipoModal } from "./inventario/equipo/modal/InvBajaEquipoModal";
import { InvBajaEquipoForm } from "./inventario/equipo/form/InvBajaEquipoForm";
import { InvTabComponentesEquipos } from "./inventario/equipo/form/elements/tabs/InvTabComponentesEquipos";
import { InvTabResponsableEquipo } from "./inventario/equipo/form/elements/tabs/InvTabResponsableEquipo";
import { InvEquipoComponentesTable } from "./inventario/equipo/table/InvEquipoComponentesTable";
import { InvEquipoComponenteForm } from "./inventario/equipo/form/InvEquipoComponenteForm";
import { InvEquipoAssignComponente } from "./inventario/equipo/modal/InvEquipoAssignComponente";
import { InvEquipoDocumentosTable } from "./inventario/equipo/table/InvEquipoDocumentosTable";
import { InvEquipoDocumentoModal } from "./inventario/equipo/modal/InvEquipoDocumentoModal";
import { InvEquipoDocumentoForm } from "./inventario/equipo/form/InvEquipoDocumentoForm";
import { BtnDownloadDocumento } from "./inventario/equipo/form/elements/btn/BtnDownloadDocumento";

/* Perifericos */
import { InvTransferirPerifericoModal } from "./inventario/periferico/modal/InvTransferirPerifericoModal";
import { InvTransferirPerifericoForm } from "./inventario/periferico/form/InvTransferirPerifericoForm";
import { InvPerifericoTable } from "./inventario/periferico/table/InvPerifericoTable";
import { InvPerifericoModal } from "./inventario/periferico/modal/InvPerifericoModal";
import { InvPerifericoForm } from "./inventario/periferico/form/InvPerifericoForm";
import { FilterFormPeriferico } from "./inventario/periferico/filter/FilterFormPeriferico";
import { InvPerifericoAsignarEquipoModal } from "./inventario/periferico/modal/InvPerifericoAsignarEquipoModal";
import { InvPerifericoAsignarEquipoForm } from "./inventario/periferico/form/InvPerifericoAsignarEquipoForm";


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
    BtnAdministracion,
    BtnServicesApps,
} from "./elements/buttons/BtnServices";
import { BtnActivateElement } from "./elements/buttons/BtnActivateElement";
import {
    BtnDarkMode,
    ActionReportPDF,
    BtnSearchMenu,
} from "./elements/buttons/BtnActions";
import { ModalActivateElement } from "./elements/modal/ModalActivateElement";
import { InformationActividadList } from "./elements/lists/InformationActividadList";
import { MenuSeleccion } from "./elements/menu/MenuSeleccion";
import { FormRichText } from "./elements/rte/FormRichText";
import {
    MenuUsersTable,
    MenuTable_E,
    MenuTable_D,
    MenuTable_VE,
    MenuTable_T,
    MenuSolicitudTable,
    MenuTable_Per,
    MenuTable_Perif,
    MenuTable_Periferico
} from "./elements/tables/MenuTable";
import { TableContent } from "./elements/tables/TableContent";

export {
    /* Authenticacion */
    AuthForm,

    /* Usuario: Perfil */
    ProfileForm,
    CardProfile,
    CardInfoStatsUser,
    TableMarcacionRelojOnline,
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
    FilterDatesPermiso,
    PermisosConsolidadosTable,

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
    TableMarcacion,

    /* Inventario: Tipos de categorias */
    InvTipocategoriaTable,
    InvTipocategoriaModal,
    InvTipocategoriaForm,

    /* Inventario: Categorias */
    InvCategoriaTable,
    InvCategoriaForm,
    InvStockCategoriaForm,
    InvCategoriaModal,
    InvStockCategoriaModal,

    /* Inventario: Marca */
    InvMarcaTable,
    InvMarcaModal,
    InvMarcaForm,

    /* Inventario: Estado */
    InvEstadoTable,
    InvEstadoModal,
    InvEstadoForm,

    /* Inventario: Conceptos de Estados */
    InvConceptoTable,
    InvConceptoModal,
    InvConceptoForm,

    /* Inventario: Ubicacion */
    InvUbicacionTable,
    InvUbicacionModal,
    InvUbicacionForm,

    /* Inventario: Equipos */
    FilterFormEquipos,
    InvEquipoTable,
    InvEquipoResponsablesTable,
    InvEquipoModal,
    InvShowEquipoModal,
    InvEquipoAsignacionModal,
    InvEquipoForm,
    InvAsignacionForm,
    InvEquipoAsignacionForm,
    InvEquipoGeneralForm,
    InvEquipoComplementaria,
    InvInfoGeneralEquipo,
    InvTabsDetalleEquipo,
    InvTabGeneralEquipo,
    InvTabUbicacionEquipo,
    InvTabDocumentoEquipo,
    InvDeleteEquipoModal,
    InvDeleteEquipoForm,
    InvBajaEquipoModal,
    InvBajaEquipoForm,
    InvTabComponentesEquipos,
    InvTabResponsableEquipo,
    InvEquipoComponentesTable,
    InvEquipoComponenteForm,
    InvEquipoAssignComponente,
    InvEquipoDocumentosTable,
    InvEquipoDocumentoModal,
    InvEquipoDocumentoForm,
    BtnDownloadDocumento,

    /* Perifericos */
    InvTransferirPerifericoModal,
    InvTransferirPerifericoForm,
    InvPerifericoTable,
    InvPerifericoModal,
    InvPerifericoForm,
    FilterFormPeriferico,
    InvPerifericoAsignarEquipoModal,
    InvPerifericoAsignarEquipoForm,

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
    BtnServicesApps,
    BtnActivateElement,
    BtnDarkMode,
    ActionReportPDF,
    BtnSearchMenu,
    ModalActivateElement,
    InformationActividadList,
    MenuSeleccion,
    FormRichText,
    MenuUsersTable,
    MenuTable_E,
    MenuTable_D,
    MenuTable_VE,
    MenuTable_T,
    MenuSolicitudTable,
    MenuTable_Per,
    MenuTable_Perif,
    MenuTable_Periferico,
    TableContent,
};
