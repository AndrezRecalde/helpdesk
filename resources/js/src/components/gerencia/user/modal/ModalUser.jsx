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

export const ModalUser = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isOpenModalAddUser, modalActionUser } = useUiUser();
    const { startLoadEmpresas } = useEmpresaStore();
    const { startLoadTipoSexo } = useSexoStore();
    //const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadCargos } = useCargoStore();
    const { startLoadTiposUsuarios } = useTipoUsuarioStore();
    const { startLoadTiposContratos } = useTipoContratoStore();
    const { startFindUserResponsable, setClearActivateUser } = useUsersStore();

    const form = useForm({
        initialValues: {
            usu_ci: "",
            titulo: "",
            //nmbre_usrio: "",
            usu_ape_pat: "",
            usu_ape_mat: "",
            usu_nombres: "",
            nombre_formateado: "",
            email: "",
            sexo: null,
            lgin: "",
            actvo: "1",

            usu_id_empresa: null,
            cdgo_direccion: null,
            cdgo_dprtmnto: null,
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
            /*  nmbre_usrio: isNotEmpty(
                "Por favor ingrese los nombres del usuario"
            ), */
            usu_ape_pat: isNotEmpty(
                "Por favor ingrese los nombres del usuario"
            ),
            usu_ape_mat: isNotEmpty(
                "Por favor ingrese los nombres del usuario"
            ),
            usu_nombres: isNotEmpty(
                "Por favor ingrese los nombres del usuario"
            ),
            email: isEmail("Dígite un email valido"),
            sexo: isNotEmpty("Por favor seleccione una opción"),
            lgin: isNotEmpty("Por favor ingrese el usuario login"),
            actvo: isNotEmpty("Por favor seleccione el estado"),

            usu_id_empresa: isNotEmpty("Por favor seleccione una opción"),
            cdgo_direccion: isNotEmpty("Por favor seleccione una opción"),
            //cdgo_dprtmnto: isNotEmpty("Por favor seleccione una opción"),
            crgo_id: isNotEmpty("Por favor seleccione una opción"),
            id_tipo_usuario: isNotEmpty("Por favor seleccione una opción"),
            usu_ult_tipo_contrato: isNotEmpty(
                "Por favor seleccione una opción"
            ),
            finaliza_contrato: isNotEmpty("Por favor seleccione una opción"),
            tecnico: isNotEmpty("Por favor seleccione una opción"),
            secretaria_tic: isNotEmpty("Por favor selecciona una opción"),
            super_user: isNotEmpty("Por favor selecciona una opción"),
            interno: isNotEmpty("Por favor selecciona una opción"),
            usu_estado: isNotEmpty("Por favor selecciona una opción"),
        },
        transformValues: (values) => ({
            ...values,
            sexo: Number(values.sexo) || null,
            //actvo: Number(values.actvo) || null,
            usu_id_empresa: Number(values.usu_id_empresa) || null,
            cdgo_direccion: Number(values.cdgo_direccion) || null,
            cdgo_dprtmnto: Number(values.cdgo_dprtmnto) || null,
            crgo_id: Number(values.crgo_id) || null,
            id_tipo_usuario: Number(values.id_tipo_usuario) || null,
            usu_ult_tipo_contrato: Number(values.usu_ult_tipo_contrato) || null,
            finaliza_contrato: Number(values.finaliza_contrato),
            usu_f_f_contrato: new Date(values.usu_f_f_contrato) || null,
            tecnico: Number(values.tecnico),
            secretaria_tic: Number(values.secretaria_tic),
            super_user: Number(values.super_user),
            interno: Number(values.interno),
            usu_estado: Number(values.usu_estado) || null,
            usu_ing: Number(values.usu_ing) || null,
            cdgo_lrgo: obtenerIniciales(values.usu_ape_pat, values.usu_ape_mat, values.usu_nombres)
            /* nombre_formateado: formatName(values.nmbre_usrio),
            usu_alias: formatName(values.nmbre_usrio), */
        }),
    });

    /* const formatName = (fullName) => {
        // Separar el nombre completo en palabras
        const nameParts = fullName.trim().split(" ");

        // Tomar el primer nombre y el primer apellido si están disponibles
        const firstName = nameParts[0];
        const firstLastName = nameParts.length > 1 ? nameParts[1] : "";

        // Retornar el nombre formateado
        return `${firstName} ${firstLastName}`;
    }; */

    function obtenerIniciales(apellido_paterno, apellido_materno, nombres) {
        // Obtiene las iniciales de cada nombre en el string 'nombres'
        const inicialesNombres = nombres
            .split(' ')                    // Divide los nombres
            .map(nombre => nombre[0].toUpperCase())  // Toma la primera letra de cada nombre y la convierte en mayúscula
            .join('');                     // Une las iniciales de los nombres

        // Combina las iniciales del apellido paterno, apellido materno y nombres
        return `${inicialesNombres}${apellido_paterno[0].toUpperCase()}${apellido_materno[0].toUpperCase()}`;
    }

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
    }, [isOpenModalAddUser]);

    const handleCloseModal = () => {
        modalActionUser(false);
        setClearActivateUser();
        form.reset();
    };
    return (
        <Modal
            opened={isOpenModalAddUser}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Usuario
                </TextSection>
            }
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
