import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearTiposUsuarios, onLoadErrores, onLoadTiposUsuarios, onLoading } from "../../store/tiposUsuarios/tiposUsuariosSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useTipoUsuarioStore = () => {
    const { isLoading, tiposUsuarios, errores } = useSelector(
        (state) => state.tipoUsuario
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadTiposUsuarios = async () => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.get("/gerencia/tipos-usuarios");
            const { tipos_usuarios } = data;
            dispatch(onLoadTiposUsuarios(tipos_usuarios));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    }

    const clearTiposUsuarios = () => {
        dispatch(onClearTiposUsuarios());
    }

    return {
        isLoading,
        tiposUsuarios,
        errores,

        startLoadTiposUsuarios,
        clearTiposUsuarios
    };
};
