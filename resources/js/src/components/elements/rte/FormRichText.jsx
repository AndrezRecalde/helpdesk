import { Input } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import classes from "../../../assets/styles/modules/solicitud/Richtext.module.css";

export const FormRichText = ({
    form,
    nameInput,
    editor,
    label = "Contenido",
    withAsterisk = false,
    placeholder = "Escribe aquí...",
}) => {
    const inputProps = form.getInputProps(nameInput);

    return (
        <Input.Wrapper
            label={label}
            withAsterisk={withAsterisk}
            error={inputProps.error}
        >
            <RichTextEditor
                editor={editor}
                styles={(theme) => ({
                    root: {
                        borderColor: inputProps.error
                            ? theme.colors.red[6]
                            : undefined,
                    },
                    content: {
                        minHeight: "200px",
                    },
                })}
            >
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content className={classes.rich} />
            </RichTextEditor>
        </Input.Wrapper>
    );
};
