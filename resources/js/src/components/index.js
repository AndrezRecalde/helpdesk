/* ELEMENTOS */
import { TitlePage } from "./elements/titles/TitlePage";
import { TextSection } from "./elements/titles/TextSection";
import { Logo } from "./elements/application/Logo";
import { AlertSection } from "./elements/alert/AlertSection";
import { BtnSubmit, BtnSection } from "./elements/buttons/BtnServices";
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

export {
    TitlePage,
    TextSection,
    Logo,
    AlertSection,
    BtnSubmit,
    BtnSection,
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
    ChartBarSoportes
}
