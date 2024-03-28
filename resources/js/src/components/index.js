/* ELEMENTOS */
import { TitlePage } from "./elements/titles/TitlePage";
import { TextSection } from "./elements/titles/TextSection";
import { Logo } from "./elements/application/Logo";
import { AlertSection } from "./elements/alert/AlertSection";
import {
    BtnSubmit,
    BtnSection,
    BtnAddActions,
} from "./elements/buttons/BtnServices";
import { BtnDarkMode } from "./elements/buttons/BtnDarkMode";
import { TableContent } from "./elements/tables/TableContent";
import {
    MenuUsersTable,
    MenuTable_E,
    MenuTable_T,
    MenuSolicitudTable,
    MenuTable_Per
} from "./elements/tables/MenuTable";
import { MenuSeleccion } from "./elements/menu/MenuSeleccion";

/* Authentication */
import { AuthForm } from "./auth/AuthForm";

/* Usuarios */
import { UserBtnHeader } from "./user/UserBtnHeader";
import { ProfileForm } from "./user/ProfileForm";
import { ChangePwdForm } from "./user/ChangePwdForm";

/*Geremcia */
import { FilterFormUsers } from "./gerencia/filters/FilterFormUsers";
import { FilterFormDirecciones } from "./gerencia/filters/FilterFormDirecciones";
import { FilterFormSearchDates } from "./gerencia/filters/FilterFormSearchDates";
import { FilterFormSoportes } from "./gerencia/filters/FilterFormSoportes";

import { UsersTable } from "./gerencia/tables/UsersTable";
import { DireccionesTable } from "./gerencia/tables/DireccionesTable";
import { SolicitudesTable } from "./gerencia/tables/SolicitudesTable";
import { TecnicosTable } from "./gerencia/tables/TecnicosTable";

import { ContactIconsList } from "./solicitudes/ContactIcons";

import { SoportesTable } from "./soportes/table/SoportesTable";

import { DashSoporteStats } from "./gerencia/stats/DashSoporteStats";
import { DashInfoStats } from "./gerencia/stats/DashInfoStats";

import { ChartPieSoportes } from "./gerencia/charts/ChartPieSoportes";
import { ChartSoportesMes } from "./gerencia/charts/ChartSoportesMes";
import { ChartBarSoportes } from "./gerencia/charts/ChartBarSoportes";

import { ModalUser } from "./gerencia/modals/ModalUser";
import { FormInfoUser } from "./gerencia/forms/FormInfoUser";
import { FormTrabajoUser } from "./gerencia/forms/FormTrabajoUser";
import { FormTipoUser } from "./gerencia/forms/FormTipoUser";

import { StepperUser } from "./gerencia/Stepper/StepperUser";

import { ModalDireccion } from "./gerencia/modals/ModalDireccion";
import { FormDirector } from "./gerencia/forms/FormDirector";

import { ModalAsignarSoporte } from "./soportes/modal/ModalAsignarSoporte";
import { FormAsignarSoporte } from "./soportes/form/FormAsignarSoporte";
import { ModalActivateUser } from "./gerencia/modals/ModalActivateUser";
import { FormActiveUser } from "./gerencia/forms/FormActiveUser";
import { ActivateUserBtn } from "./gerencia/btns/ActivateUserBtn";

import { SolicitudesAnuladasTable } from "./gerencia/tables/SolicitudesAnuladasTable";

import { ModalAnularSoporte } from "./soportes/modal/ModalAnularSoporte";
import { FormAnularSoporte } from "./soportes/form/FormAnularSoporte";

import { ModalSolicitudAdminSoporte } from "./soportes/modal/ModalSolicitudAdminSoporte";
import { FormSolicitudAdminSoporte } from "./soportes/form/FormSolicitudAdminSoporte";

import { ModalCreateSoporte } from "./soportes/modal/ModalCreateSoporte";
import { FormCreateSoporte } from "./soportes/form/FormCreateSoporte";

import { ModalResetPwdUser } from "./gerencia/modals/ModalResetPwdUser";
import { FormResetPwdUser } from "./gerencia/forms/FormResetPwdUser";

import { ModalAddTecnico } from "./gerencia/modals/ModalAddTecnico";
import { ModalActivateTecnico } from "./gerencia/modals/ModalActivateTecnico";
import { FormActivateTecnico } from "./gerencia/forms/FormActivateTecnico";
import { FormAddTecnico } from "./gerencia/forms/FormAddTecnico";

import { ModalDiagnostico } from "./soportes/modal/ModalDiagnostico";
import { FormDiagnosticar } from "./soportes/form/FormDiagnosticar";

import { TableDesempenoEstados } from "./soportes/table/indicadores/TableDesempenoEstados";
import { TableDesempenoAreas } from "./soportes/table/indicadores/TableDesempenoAreas";
import { TableDesempenoTecnicos } from "./soportes/table/indicadores/TableDesempenoTecnicos";
import { TableEfectividadAreas } from "./soportes/table/indicadores/TableEfectividadAreas";
import { TableEfectividadTecnicos } from "./soportes/table/indicadores/TableEfectividadTecnicos";
import { TableIndicadorEficacia } from "./soportes/table/indicadores/TableIndicadorEficacia";

import { CardIndicadores } from "./soportes/card/indicador/CardIndicadores";

import { ActividadForm } from "./actividad/ActividadForm";
import { ModalActividad } from "./actividad/modal/ModalActividad";

import { ActionReportPDF } from "./elements/buttons/ActionButton";

import { InformationActividadList } from "./elements/lists/InformationActividadList";

import { SectionUsersSoportesActuales } from "./soportes/section/SectionUsersSoportesActuales";
import { SectionUsersSoportesAnuales } from "./soportes/section/SectionUsersSoportesAnuales";
import { SoportesUsersTable } from "./soportes/table/SoportesUsersTable";

import { SoportesCalificacionTable } from "./soportes/table/SoportesCalificacionTable";

import { ModalDesempTecnicos } from "./gerencia/modals/ModalDesempTecnicos";
import { ChartDesempTecnicos } from "./gerencia/charts/ChartDesempTecnicos";

import { FormSolicitudPermiso } from "./gerencia/forms/FormSolicitudPermiso";

import { FilterPermisoAdmin } from "./gerencia/filters/FilterPermisoAdmin";
import { FilterPermiso } from "./permiso/filter/FilterPermiso";

import { PermisosTable } from "./permiso/table/PermisosTable";
import { ModalAnularPermiso } from "./permiso/modal/ModalAnularPermiso";
import { FormAnularPermiso } from "./permiso/form/FormAnularPermiso";

export {
    TitlePage,
    TextSection,
    Logo,
    AlertSection,
    BtnSubmit,
    BtnSection,
    BtnAddActions,
    BtnDarkMode,
    TableContent,
    MenuUsersTable,
    MenuTable_E,
    MenuTable_T,
    MenuSolicitudTable,
    MenuTable_Per,
    MenuSeleccion,
    AuthForm,
    UserBtnHeader,
    ProfileForm,
    ChangePwdForm,
    FilterFormUsers,
    FilterFormDirecciones,
    FilterFormSearchDates,
    FilterFormSoportes,
    UsersTable,
    DireccionesTable,
    TecnicosTable,
    SolicitudesTable,
    ContactIconsList,
    SoportesTable,
    DashSoporteStats,
    DashInfoStats,
    ChartPieSoportes,
    ChartSoportesMes,
    ChartBarSoportes,
    ModalUser,
    FormInfoUser,
    FormTrabajoUser,
    FormTipoUser,
    StepperUser,
    ModalDireccion,
    FormDirector,
    ModalAsignarSoporte,
    FormAsignarSoporte,
    ModalActivateUser,
    FormActiveUser,
    ActivateUserBtn,
    SolicitudesAnuladasTable,
    ModalAnularSoporte,
    FormAnularSoporte,
    ModalSolicitudAdminSoporte,
    FormSolicitudAdminSoporte,
    ModalCreateSoporte,
    FormCreateSoporte,
    ModalResetPwdUser,
    FormResetPwdUser,
    ModalAddTecnico,
    ModalActivateTecnico,
    FormActivateTecnico,
    FormAddTecnico,
    ModalDiagnostico,
    FormDiagnosticar,
    TableDesempenoEstados,
    TableDesempenoAreas,
    TableDesempenoTecnicos,
    TableEfectividadAreas,
    TableEfectividadTecnicos,
    TableIndicadorEficacia,
    CardIndicadores,
    ActividadForm,
    ModalActividad,
    ActionReportPDF,
    InformationActividadList,
    SectionUsersSoportesActuales,
    SectionUsersSoportesAnuales,
    SoportesUsersTable,

    SoportesCalificacionTable,
    ModalDesempTecnicos,
    ChartDesempTecnicos,

    FormSolicitudPermiso,

    FilterPermisoAdmin,
    FilterPermiso,

    PermisosTable,
    ModalAnularPermiso,
    FormAnularPermiso
};
