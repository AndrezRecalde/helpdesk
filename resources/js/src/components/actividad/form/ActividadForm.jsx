import { useEffect } from "react";
import { Box, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { BtnSubmit, FormRichText } from "../..";
import { isNotEmpty, useForm } from "@mantine/form";
import { useActividadStore, useUiActividad } from "../../..//hooks";
import { IconDatabase } from "@tabler/icons-react";
import dayjs from "dayjs";

export const ActividadForm = ({ fecha_inicio, fecha_fin }) => {
    const { activateActividad, startAddActividad } = useActividadStore();
    const { modalActionActividad } = useUiActividad();

    const form = useForm({
        initialValues: {
            actividad: "",
            fecha_actividad: new Date(),
            //imagenes: [],
        },

        validate: {
            actividad: isNotEmpty("Por favor ingresa la actividad"),
            fecha_actividad: isNotEmpty("Por favor ingresa la fecha de la actividad"),
        },
        transformValues: (values) => ({
            ...values,
            fecha_actividad: dayjs(values.fecha_actividad).format("YYYY-MM-DD") || null
        })
    });

    let content = "";
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Superscript,
            SubScript,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        onUpdate(props) {
            const content = props.editor.getHTML();
            form.setFieldValue("actividad", content);
        },
        content: activateActividad?.actividad || content,
    });

    useEffect(() => {
        if (activateActividad !== null) {
            const dt = new Date(activateActividad.fecha_actividad);
            form.setValues({
                ...activateActividad,
                fecha_actividad: dt,
            });
            return;
        }
    }, [activateActividad]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues())
        startAddActividad(form.getTransformedValues(), fecha_inicio, fecha_fin);
        modalActionActividad(0);
        editor.commands.clearContent();
        form.reset();
    };

    return (
        <Box component="form" onSubmit={form.onSubmit((_, e) => handleSubmit(e))}>
            <Stack>
                <DateInput
                    withAsterisk
                    maxDate={dayjs(new Date()).add(6, "month").toDate()}
                    valueFormat="YYYY-MM-DD"
                    label="Fecha de la actividad"
                    placeholder="Registra la fecha"
                    {...form.getInputProps("fecha_actividad")}
                />
                <FormRichText form={form} nameInput="actividad" editor={editor} />
                <BtnSubmit IconSection={IconDatabase}>
                    Guardar actividad
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
