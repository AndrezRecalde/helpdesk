import { useRef, useState } from "react";
import { Box, Fieldset, Group, NumberInput, SimpleGrid } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { BtnSubmit } from "../../../components";
import { IconSearch } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useRutaStore } from "../../../hooks";
import ReCAPTCHA from "react-google-recaptcha";
import dayjs from "dayjs";

export const ConsultaTramiteForm = () => {
    const VITE_RECAPTCHA_SITE_KEY = "6LeDo2QrAAAAANZ0ZF-3cNBoNGMoe0MjuVy9ivzb";
    const { isLoadingDespachos, startSearchRutaTramite } = useRutaStore();
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState(false);
    const captchaRef = useRef(null);

    const form = useForm({
        initialValues: {
            numero_ruta: "",
            anio: dayjs(),
        },
        validate: {
            numero_ruta: isNotEmpty("Por favor ingresa el número de ruta"),
            anio: isNotEmpty("Por favor ingresa el año de tu trámite"),
        },
        transformValues: (values) => ({
            ...values,
            anio: dayjs(values.anio).year() || null,
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!captchaToken) {
            setCaptchaError(true);
            return;
        }

        setCaptchaError(false);

        const values = form.getTransformedValues();
        //console.log(values, captchaToken);

        // Aquí haces tu lógica con los valores + token
        startSearchRutaTramite({
            ...values,
            captcha: captchaToken,
        });

        // ✅ Resetear CAPTCHA después de enviar
        setCaptchaToken(null);
        captchaRef.current?.reset();
    };
    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Fieldset legend="Consultar Trámite">
                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "md" }}
                    verticalSpacing={{ base: "md", sm: "md" }}
                >
                    <YearPickerInput
                        label="Anio"
                        placeholder="Elige el anio"
                        maxDate={dayjs()}
                        {...form.getInputProps("anio")}
                    />
                    <NumberInput
                        label="Número Ruta"
                        placeholder="Digite el número de ruta"
                        {...form.getInputProps("numero_ruta")}
                    />
                </SimpleGrid>
                <Group justify="flex-end" mt="md">
                    <div>
                        <ReCAPTCHA
                            sitekey={VITE_RECAPTCHA_SITE_KEY}
                            ref={captchaRef}
                            onChange={(token) => {
                                setCaptchaToken(token);
                                setCaptchaError(false);
                            }}
                            onExpired={() => {
                                setCaptchaToken(null);
                                setCaptchaError(true);
                            }}
                        />
                        {captchaError && (
                            <div
                                style={{
                                    color: "red",
                                    fontSize: "0.875rem",
                                    marginTop: "0.25rem",
                                }}
                            >
                                Por favor completa el captcha
                            </div>
                        )}
                    </div>
                </Group>
                <BtnSubmit
                    mt={20}
                    IconSection={IconSearch}
                    loading={isLoadingDespachos}
                >
                    Buscar
                </BtnSubmit>
            </Fieldset>
        </Box>
    );
};
