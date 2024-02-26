import { Text, Box, Stack, rem } from "@mantine/core";
import { IconSun, IconPhone, IconMapPin, IconAt } from "@tabler/icons-react";
import classes from "../../assets/styles/modules/solicitud/ContactIcons.module.css";

function ContactIcon({ icon: Icon, title, description, ...others }) {
    return (
        <div className={classes.wrapper} {...others}>
            <Box mr="md">
                <Icon style={{ width: rem(24), height: rem(24) }} />
            </Box>

            <div>
                <Text size="xs" className={classes.title}>
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    );
}

const MOCKDATA = [
    { title: "Email", description: "tic@gadpe.gob.ec", icon: IconAt },
    { title: "Teléfono", description: "(06) 272-1433", icon: IconPhone },
   /*  {
        title: "Dirección",
        description: "10 de Agosto entre Bolívar y Pedro Vicente Maldonado",
        icon: IconMapPin,
    }, */
    { title: "Horas Laborales", description: "8 a.m. - 16 p.m.", icon: IconSun },
];

export function ContactIconsList() {
    const items = MOCKDATA.map((item, index) => (
        <ContactIcon key={index} {...item} />
    ));
    return <Stack>{items}</Stack>;
}
