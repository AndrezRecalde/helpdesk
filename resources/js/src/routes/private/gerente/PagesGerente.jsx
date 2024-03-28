import { Route } from "react-router-dom";
import { RoutesNotFound } from "../../not-found/RoutesNotFound";
import {
    AdminUsersPage,
    AdminDireccionesPage,
    SolicitudesActualesPage,
    BusquedaSoportePage,
    SolicitudesAnuladasPage,
    SoportesPage,
    DashGerenciaPage,
    AdminTecnicosPage,
    IndicadorReportPage,
    ReporteSoportes,
    SoporteCalificacionPage,
    PermisosPage,
} from "../../../pages";
import { ListPermisosAdminPage } from "../../../pages/permisos/ListPermisosAdminPage";

export const PagesGerente = () => {
    console.log('pagesGerente')
    return (
            <RoutesNotFound>
                <Route path="usuarios" element={<AdminUsersPage />} />
                <Route
                    path="direcciones"
                    element={<AdminDireccionesPage />}
                />
                <Route path="tecnicos" element={<AdminTecnicosPage />} />

                <Route
                    path="solicitudes-actuales"
                    element={<SolicitudesActualesPage />}
                />
                <Route
                    path="busqueda-soportes"
                    element={<BusquedaSoportePage />}
                />
                <Route
                    path="solicitudes-anuladas"
                    element={<SolicitudesAnuladasPage />}
                />
                <Route path="soportes" element={<SoportesPage />} />
                <Route path="reporte-soportes" element={<ReporteSoportes />} />


                <Route path="indicadores-soportes" element={<IndicadorReportPage />} />

                <Route path="calificar" element={<SoporteCalificacionPage />} />

                <Route path="/permiso" element={<PermisosPage />} />

                <Route path="/ver-permisos" element={<ListPermisosAdminPage />} />


                <Route path="dashboard" element={<DashGerenciaPage />} />

            </RoutesNotFound>
    );
};
