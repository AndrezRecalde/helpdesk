import { useCallback, useEffect, useState } from "react";
import { Box, FileInput, Group, Image, Stack } from "@mantine/core";
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
    const [previews, setPreviews] = useState([]); // Arreglo para múltiples previews

    const form = useForm({
        initialValues: {
            actividad: "",
            fecha_actividad: new Date(),
            imagenes: [],
        },

        validate: {
            actividad: isNotEmpty("Por favor ingresa la actividad"),
            fecha_actividad: isNotEmpty("Por favor ingresa la fecha de la actividad"),
        },
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

            // Obtener imágenes previas si las hay
            const imageUrls = activateActividad.imagenes || [];
            const initialPreviews = imageUrls.map((img) => `/storage/${img.ruta_imagen}`);
            setPreviews(initialPreviews);

            // Si necesitas enviar estas URLs como datos de formulario
            form.setFieldValue("imagenes", imageUrls);
        }
    }, [activateActividad]);

    const handleImageChange = useCallback((files) => {
        if (files.length) {
            const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
            setPreviews(previewUrls);
            form.setFieldValue("imagenes", files);
        } else {
            setPreviews([]);
            form.setFieldValue("imagenes", []);
        }
    }, [form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddActividad(form.values, fecha_inicio, fecha_fin);
        modalActionActividad(0);
        editor.commands.clearContent();
        setPreviews([]); // Limpiar previews tras el envío
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
                <FileInput
                    multiple
                    label="Agregar Anexo"
                    placeholder="Puedes seleccionar imágenes .jpg, .jpeg, .png"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(files) => handleImageChange(files)}
                />
                {previews.length > 0 && (
                    <Group position="center">
                        {previews.map((preview, index) => (
                            <Image
                                key={index}
                                src={preview}
                                alt={`Vista previa ${index + 1}`}
                                fit="contain"
                                maw={100}
                            />
                        ))}
                    </Group>
                )}
                <BtnSubmit IconSection={IconDatabase}>
                    Guardar actividad
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
