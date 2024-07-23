import { useEffect } from "react";
import { Box, Grid } from "@mantine/core";
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
        },

        validate: {
            actividad: isNotEmpty("Por favor ingresa la actividad"),
            fecha_actividad: isNotEmpty(
                "Por favor ingresa la fecha de la actividad"
            ),
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
        content: activateActividad?.actividad ? activateActividad?.actividad : content,
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
        startAddActividad(form.values, fecha_inicio, fecha_fin);
        //console.log(form.values)
        modalActionActividad(0);
        form.reset();
        editor.commands.clearContent();
        /* setTimeout(() => {
            window.location.reload();
        }, 2000); */
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <DateInput
                        withAsterisk
                        maxDate={dayjs(new Date()).add(1, "month").toDate()}
                        valueFormat="YYYY-MM-DD"
                        label="Fecha de la actividad"
                        placeholder="Registra la fecha"
                        {...form.getInputProps("fecha_actividad")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    {/* <Textarea
                        label="Actividad"
                        withAsterisk
                        description="Registra la actividad"
                        autosize
                        minRows={6}
                        maxRows={8}
                        {...form.getInputProps("actividad")}
                    /> */}
                    <FormRichText form={form} nameInput="actividad" editor={editor} />
                </Grid.Col>
            </Grid>
            <BtnSubmit radius="md" IconSection={IconDatabase}>
                Registrar actividad
            </BtnSubmit>
        </Box>
    );
};
