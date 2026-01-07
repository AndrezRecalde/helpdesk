import { useEffect } from "react";
import { Box, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder"; // Importar Placeholder
import { BtnSubmit, FormRichText } from "../..";
import { isNotEmpty, useForm } from "@mantine/form";
import { useActividadStore, useUiActividad } from "../../../hooks";
import classes from "../../../assets/styles/modules/layout/input/LabelsInputs.module.css";
import dayjs from "dayjs";

export const ActividadForm = ({ fecha_inicio, fecha_fin }) => {
    const { activateActividad, startAddActividad } = useActividadStore();
    const { modalActionActividad } = useUiActividad();

    const form = useForm({
        initialValues: {
            actividad: "",
            fecha_actividad: new Date(),
        },

        validate: {
            actividad: (value) => {
                const textContent = value.replace(/<[^>]*>/g, "").trim();
                return textContent.length === 0
                    ? "Por favor ingresa la actividad"
                    : null;
            },
            fecha_actividad: isNotEmpty(
                "Por favor ingresa la fecha de la actividad"
            ),
        },
        transformValues: (values) => ({
            ...values,
            fecha_actividad:
                dayjs(values.fecha_actividad).format("YYYY-MM-DD") || null,
        }),
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Superscript,
            SubScript,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({
                placeholder: "Describe la actividad realizada...",
            }),
        ],
        content: "",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            form.setFieldValue("actividad", html);
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
            },
        },
    });

    useEffect(() => {
        if (activateActividad !== null && editor) {
            const dt = new Date(activateActividad.fecha_actividad);
            form.setValues({
                ...activateActividad,
                fecha_actividad: dt,
            });
            editor.commands.setContent(activateActividad.actividad || "");
        }
    }, [activateActividad, editor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddActividad(form.getTransformedValues(), fecha_inicio, fecha_fin);
        modalActionActividad(0);

        if (editor) {
            editor.commands.clearContent();
        }
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <DateInput
                    withAsterisk
                    maxDate={dayjs(new Date()).add(6, "month").toDate()}
                    valueFormat="YYYY-MM-DD"
                    label="Fecha de la actividad"
                    placeholder="Registra la fecha"
                    {...form.getInputProps("fecha_actividad")}
                    classNames={classes}
                />
                <FormRichText
                    form={form}
                    nameInput="actividad"
                    editor={editor}
                    label="Actividad"
                    withAsterisk
                    placeholder="Describe la actividad realizada..."
                />
                <BtnSubmit>Guardar actividad</BtnSubmit>
            </Stack>
        </Box>
    );
};
