import { useErrorException } from "../../hooks";
import { onLoadErrores } from "../../store/tecnico/tecnicoSlice";
import helpdeskApi from "../../api/helpdeskApi";
import { useState } from "react";

export const useTecnicoAreaStore = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tecnicosConAreas, setTecnicosConAreas] = useState([]);
    const [tecnicosArea, setTecnicosArea] = useState([]);
    const [areasTecnico, setAreasTecnico] = useState([]);
    const [estadisticasArea, setEstadisticasArea] = useState([]);
    const [resumenAreas, setResumenAreas] = useState([]);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const startLoadTecnicosConAreas = async () => {
        try {
            setIsLoading(true);
            const { data } = await helpdeskApi.get("/gerencia/tecnicos-con-areas");
            const { tecnicos } = data;
            setTecnicosConAreas(tecnicos);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            ExceptionMessageError(error);
        }
    };

    const startLoadTecnicosArea = async (areaId) => {
        try {
            setIsLoading(true);
            const { data } = await helpdeskApi.get(`/gerencia/area/${areaId}/tecnicos`);
            const { tecnicos } = data;
            setTecnicosArea(tecnicos);
            setIsLoading(false);
            return tecnicos;
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            ExceptionMessageError(error);
            return [];
        }
    };

    const startLoadAreasTecnico = async (tecnicoId) => {
        try {
            setIsLoading(true);
            const { data } = await helpdeskApi.get(`/gerencia/tecnico/${tecnicoId}/areas`);
            const { areas } = data;
            setAreasTecnico(areas);
            setIsLoading(false);
            return areas;
        } catch (error) {
            setIsLoading(false);
            ExceptionMessageError(error);
            return [];
        }
    };

    const startAsignarArea = async (asignacion) => {
        try {
            const { data } = await helpdeskApi.post("/gerencia/tecnico-area/asignar", asignacion);
            return data;
        } catch (error) {
            ExceptionMessageError(error);
            throw error;
        }
    };

    const startUpdateAsignacion = async (id, asignacion) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/tecnico-area/update/${id}`,
                asignacion
            );
            return data;
        } catch (error) {
            ExceptionMessageError(error);
            throw error;
        }
    };

    const startRemoverArea = async (id) => {
        try {
            const { data } = await helpdeskApi.delete(`/gerencia/tecnico-area/remover/${id}`);
            return data;
        } catch (error) {
            ExceptionMessageError(error);
            throw error;
        }
    };

    const startLoadEstadisticasArea = async (areaId) => {
        try {
            setIsLoading(true);
            const { data } = await helpdeskApi.get(
                `/gerencia/asignacion/estadisticas-area/${areaId}`
            );
            const { estadisticas } = data;
            setEstadisticasArea(estadisticas);
            setIsLoading(false);
            return estadisticas;
        } catch (error) {
            setIsLoading(false);
            ExceptionMessageError(error);
            return [];
        }
    };

    const startLoadResumenAreas = async () => {
        try {
            setIsLoading(true);
            const { data } = await helpdeskApi.get("/gerencia/asignacion/resumen-areas");
            const { areas } = data;
            setResumenAreas(areas);
            setIsLoading(false);
            return areas;
        } catch (error) {
            setIsLoading(false);
            ExceptionMessageError(error);
            return [];
        }
    };

    const startVerificarCapacidad = async (areaId, umbralMaximo = 50) => {
        try {
            const { data } = await helpdeskApi.post("/gerencia/asignacion/verificar-capacidad", {
                area_id: areaId,
                umbral_maximo: umbralMaximo,
            });
            return data;
        } catch (error) {
            ExceptionMessageError(error);
            return null;
        }
    };

    return {
        isLoading,
        tecnicosConAreas,
        tecnicosArea,
        areasTecnico,
        estadisticasArea,
        resumenAreas,

        startLoadTecnicosConAreas,
        startLoadTecnicosArea,
        startLoadAreasTecnico,
        startAsignarArea,
        startUpdateAsignacion,
        startRemoverArea,
        startLoadEstadisticasArea,
        startLoadResumenAreas,
        startVerificarCapacidad,
    };
};
