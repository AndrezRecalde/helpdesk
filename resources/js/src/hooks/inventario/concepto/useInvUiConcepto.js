import { useDispatch, useSelector } from "react-redux"
import { onOpenModalInvConcepto } from "../../../store/inventario/concepto/uiInvConceptoSlice";

export const useInvUiConcepto = () => {

    const { isOpenModalInvConcepto } = useSelector(state => state.uiInvConcepto);
    const dispatch = useDispatch();

    const modalActionConcepto = (behavior = false) => {
        dispatch(onOpenModalInvConcepto(behavior));
    }

  return {
    isOpenModalInvConcepto,

    modalActionConcepto
  }
}
