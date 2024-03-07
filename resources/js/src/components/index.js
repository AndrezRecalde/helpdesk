/* ELEMENTOS */
import { TitlePage } from "./elements/titles/TitlePage";
import { TextSection } from "./elements/titles/TextSection";
import { Logo } from "./elements/application/Logo";
import { AlertSection } from "./elements/alert/AlertSection";
import { BtnSubmit, BtnSection, BtnAddActions } from "./elements/buttons/BtnServices";
import { BtnDarkMode } from "./elements/buttons/BtnDarkMode";
import { TableContent } from "./elements/tables/TableContent";
import { MenuUsersTable, MenuTable_E, MenuSolicitudTable } from "./elements/tables/MenuTable";

/* Authentication */
import { AuthForm } from "./auth/AuthForm";

/* Usuarios */
import { UserBtnHeader } from "./user/UserBtnHeader";
import { ProfileForm } from "./user/ProfileForm";


/*Geremcia */
import { FilterFormUsers } from "./gerencia/filters/FilterFormUsers";
import { FilterFormDirecciones } from "./gerencia/filters/FilterFormDirecciones";
import { FilterFormSearchSoli } from "./gerencia/filters/FilterFormSearchSoli";
import { FilterFormSoportes } from "./gerencia/filters/FilterFormSoportes";

import { UsersTable } from "./gerencia/tables/UsersTable";
import { DireccionesTable } from "./gerencia/tables/DireccionesTable";
import { SolicitudesTable } from "./gerencia/tables/SolicitudesTable";

import { ContactIconsList } from "./solicitudes/ContactIcons";

import { SoportesTable } from "./soportes/table/SoportesTable";


import { DashSoporteStats } from "./gerencia/stats/DashSoporteStats";
import { DashInfoStats } from "./gerencia/stats/DashInfoStats";


import { ChartPieSoportes } from "./gerencia/charts/ChartPieSoportes";
import { ChartAreaSoportes } from "./gerencia/charts/ChartAreaSoportes";
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

import { ModalSolicitudAdminSoporte } from "./soportes/modal/ModalSolicitudAdminSoporte.jsx";
import { FormSolicitudAdminSoporte } from "./soportes/form/FormSolicitudAdminSoporte.jsx";

import { ModalCreateSoporte } from "./soportes/modal/ModalCreateSoporte.jsx";
import { FormCreateSoporte } from "./soportes/form/FormCreateSoporte";

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
    MenuSolicitudTable,

    AuthForm,

    UserBtnHeader,
    ProfileForm,

    FilterFormUsers,
    FilterFormDirecciones,
    FilterFormSearchSoli,
    FilterFormSoportes,

    UsersTable,
    DireccionesTable,
    SolicitudesTable,

    ContactIconsList,

    SoportesTable,

    DashSoporteStats,
    DashInfoStats,

    ChartPieSoportes,
    ChartAreaSoportes,
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
    FormCreateSoporte
}
