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
    ActividadPage,
    ListActividadesPage,
    ListPermisosAdminPage,
    ConfigInventarioPage,
    InvEquiposPage,
    InvComponentesPage,
} from "../../../pages";

export const PagesGerente = () => {
    //console.log('pagesGerente')
    return (
        <>
            <RoutesNotFound>
                <Route path="usuarios" element={<AdminUsersPage />} />
                <Route path="direcciones" element={<AdminDireccionesPage />} />
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

                <Route
                    path="indicadores-soportes"
                    element={<IndicadorReportPage />}
                />

                <Route
                    path="cerrar-soportes"
                    element={<SoporteCalificacionPage />}
                />

                <Route path="/permiso" element={<PermisosPage />} />

                <Route
                    path="/ver-permisos"
                    element={<ListPermisosAdminPage />}
                />

                <Route path="agregar-actividad" element={<ActividadPage />} />
                <Route
                    path="lista-actividades"
                    element={<ListActividadesPage />}
                />

                <Route
                    path="/configuracion-inventario/:tabValue/*"
                    element={<ConfigInventarioPage />}
                />

                <Route path="/inventario/equipos" element={<InvEquiposPage />} />

                <Route path="/inventario/componentes" element={<InvComponentesPage />} />
                <Route path="dashboard" element={<DashGerenciaPage />} />
            </RoutesNotFound>
        </>
    );
};
