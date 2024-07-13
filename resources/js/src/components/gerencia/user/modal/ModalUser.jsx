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
} from "../../../../hooks";
import { StepperUser, TextSection } from "../../..";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";

export const ModalUser = ({ title }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isOpenModalAddUser, modalActionUser } = useUiUser();
    const { startLoadEmpresas, clearEmpresas } = useEmpresaStore();
    const { startLoadTipoSexo, clearTipoSexo } = useSexoStore();
    //const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadCargos, clearCargos } = useCargoStore();
    const { startLoadTiposUsuarios, clearTiposUsuarios } =
        useTipoUsuarioStore();
    const { startLoadTiposContratos, clearTiposContratos } =
        useTipoContratoStore();
    const { startFindUserResponsable, clearUsers, setClearActivateUser } =
        useUsersStore();

    const form = useForm({
        initialValues: {
            usu_ci: "",
            titulo: "",
            nmbre_usrio: "",
            nombre_formateado: "",
            email: "",
            sexo: null,
            lgin: "",
            actvo: "1",

            usu_id_empresa: null,
            cdgo_direccion: null,
            crgo_id: null,
            id_tipo_usuario: null,
            usu_ult_tipo_contrato: null,
            finaliza_contrato: "0",
            usu_f_f_contrato: null,

            tecnico: "0",
            secretaria_tic: "0",
            super_user: "0",
            interno: "0",
            usu_estado: "1",
            usu_alias: "",
            usu_ing: null,
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
            //usu_f_f_contrato: isNotEmpty("Por favor ingrese la fecha"),

            tecnico: isNotEmpty("Por favor seleccione una opción"),
            secretaria_tic: isNotEmpty("Por favor selecciona una opción"),
            super_user: isNotEmpty("Por favor selecciona una opción"),
            interno: isNotEmpty("Por favor selecciona una opción"),
            usu_estado: isNotEmpty("Por favor selecciona una opción"),
            usu_alias: isNotEmpty("Por favor ingrese el alias del usuario"),
            //usu_ing: isNotEmpty("Por favor ingrese el alias del usuario"),
        },
        transformValues: (values) => ({
            ...values,
            sexo: Number(values.sexo) || null,
            actvo: Number(values.actvo) || null,
            usu_id_empresa: Number(values.usu_id_empresa) || null,
            cdgo_direccion: Number(values.cdgo_direccion) || null,
            crgo_id: Number(values.crgo_id) || null,
            id_tipo_usuario: Number(values.id_tipo_usuario) || null,
            usu_ult_tipo_contrato: Number(values.usu_ult_tipo_contrato) || null,
            finaliza_contrato: Number(values.finaliza_contrato),

            tecnico: Number(values.tecnico),
            secretaria_tic: Number(values.secretaria_tic),
            super_user: Number(values.super_user),
            interno: Number(values.interno),
            usu_estado: Number(values.usu_estado) || null,
            usu_ing: Number(values.usu_ing) || null,
        }),
    });

    useEffect(() => {
        if (isOpenModalAddUser) {
            startLoadEmpresas();
            startLoadTipoSexo();
            startFindUserResponsable(usuario.cdgo_usrio);
            //startLoadDirecciones();
            startLoadCargos();
            startLoadTiposUsuarios();
            startLoadTiposContratos();
        }
        return () => {
            //clearEmpresas();
            //clearTipoSexo();
            //clearDirecciones();
            //clearUsers();
            //clearCargos();
            //clearTiposUsuarios();
            //clearTiposContratos();
        };
    }, [isOpenModalAddUser]);

    useEffect(() => {

      return () => {
        clearEmpresas();
        clearTipoSexo();
        //clearDirecciones();
        clearUsers();
        clearCargos();
        clearTiposUsuarios();
        clearTiposContratos();
      }
    }, [])


    const handleCloseModal = () => {
        modalActionUser(0);
        setClearActivateUser();
        form.reset();
    };
    return (
        <Modal
            opened={isOpenModalAddUser}
            onClose={handleCloseModal}
            title={<TextSection tt="" fz={16} fw={700}>{title}</TextSection>}
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
