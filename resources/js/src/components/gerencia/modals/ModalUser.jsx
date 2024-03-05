import { useEffect } from "react";
import { Modal } from "@mantine/core";
import {
    useCargoStore,
    useEmpresaStore,
    useSexoStore,
    useTipoContratoStore,
    useTipoUsuarioStore,
    useUiUser,
    useUsersStore,
} from "../../../hooks";
import { StepperUser } from "../../../components";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";

export const ModalUser = ({ title }) => {
    const { isOpenModalAddUser, modalActionUser } = useUiUser();
    const { startLoadEmpresas, clearEmpresas } = useEmpresaStore();
    const { startLoadTipoSexo, clearTipoSexo } = useSexoStore();
    //const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadCargos, clearCargos } = useCargoStore();
    const { startLoadTiposUsuarios, clearTiposUsuarios } =
        useTipoUsuarioStore();
    const { startLoadTiposContratos, clearTiposContratos } =
        useTipoContratoStore();
    const { setClearActivateUser } = useUsersStore();

    const form = useForm({
        initialValues: {
            usu_ci: "",
            titulo: "",
            nmbre_usrio: "",
            nombre_formateado: "",
            email: "",
            sexo: "",
            lgin: "",
            actvo: "",

            usu_id_empresa: null,
            cdgo_direccion: null,
            crgo_id: null,
            id_tipo_usuario: null,
            usu_ult_tipo_contrato: null,
            finaliza_contrato: null,
            usu_f_f_contrato: "",

            tecnico: "",
            secretaria_tic: "",
            super_user: "",
            interno: "",
            usu_estado: null,
            usu_alias: "",
            usu_ing: "",
        },
        validate: {
            usu_ci: hasLength(
                { min: 10, max: 10 },
                "Por favor ingrese la cédula 10 dígitos"
            ),
            titulo: hasLength(
                { min: 2, max: 5 },
                "Por favor ingrese titulo del usuario"
            ),
            nmbre_usrio: isNotEmpty(
                "Por favor ingrese los nombres del usuario"
            ),
            nombre_formateado: isNotEmpty(
                "Por favor digite el nombre formateado"
            ),
            email: isEmail("Dígite un email valido"),
            sexo: isNotEmpty("Por favor seleccione una opción"),
            lgin: isNotEmpty("Por favor ingrese el usuario login"),
            actvo: isNotEmpty("Por favor seleccione el estado"),

            usu_id_empresa: isNotEmpty("Por favor seleccione una opción"),
            cdgo_direccion: isNotEmpty("Por favor seleccione una opción"),
            crgo_id: isNotEmpty("Por favor seleccione una opción"),
            id_tipo_usuario: isNotEmpty("Por favor seleccione una opción"),
            usu_ult_tipo_contrato: isNotEmpty(
                "Por favor seleccione una opción"
            ),
            finaliza_contrato: isNotEmpty("Por favor seleccione una opción"),
            usu_f_f_contrato: isNotEmpty("Por favor ingrese la fecha"),

            tecnico: isNotEmpty("Por favor seleccione una opción"),
            secretaria_tic: isNotEmpty("Por favor selecciona una opción"),
            super_user: isNotEmpty("Por favor selecciona una opción"),
            interno: isNotEmpty("Por favor selecciona una opción"),
            usu_estado: isNotEmpty("Por favor selecciona una opción"),
            usu_alias: isNotEmpty("Por favor ingrese el alias del usuario"),
        },
    });

    useEffect(() => {
        startLoadEmpresas();
        startLoadTipoSexo();
        //startLoadDirecciones();
        startLoadCargos();
        startLoadTiposUsuarios();
        startLoadTiposContratos();

        return () => {
            clearEmpresas();
            clearTipoSexo();
            //clearDirecciones();
            clearCargos();
            clearTiposUsuarios();
            clearTiposContratos();
        };
    }, []);

    const handleCloseModal = () => {
        modalActionUser(0);
        setClearActivateUser();
    };
    return (
        <Modal
            opened={isOpenModalAddUser}
            onClose={handleCloseModal}
            title={title}
            size="xl"
            closeOnClickOutside={false}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <StepperUser form={form} />
        </Modal>
    );
};
