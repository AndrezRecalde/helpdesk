import { useDispatch, useSelector } from "react-redux"
import { onOpenModalGenerarReporte } from "../../store/marcacion/uiMarcacionSlice";

export const useUiMarcacion = () => {
    const { isOpenModalGenerarReporte } = useSelector(state => state.uiMarcacion);

    const dispatch = useDispatch();

    const modalActionGenerarReporte = (behavior) => {
        dispatch(onOpenModalGenerarReporte(behavior));
    }

  return {
    isOpenModalGenerarReporte,

    modalActionGenerarReporte
  }
}
