import { useDispatch, useSelector } from "react-redux"
import { onSetStorageFields } from "../../store/fields/storageFieldsSlice";

export const useStorageField = () => {

  const { storageFields } = useSelector(state => state.storageField);
  const dispatch = useDispatch();

  const setStorageFields = (fields) => {
    dispatch(onSetStorageFields(fields));
  }

  const clearStorageFields = () => {
    dispatch(onSetStorageFields(null));
  }

  return {
    storageFields,

    setStorageFields,
    clearStorageFields
  }
}
