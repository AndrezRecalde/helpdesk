import { Container, Tabs, rem } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconDeviceImacUp, IconDeviceImacExclamation } from "@tabler/icons-react";
import {
    SectionUsersSoportesActuales,
    SectionUsersSoportesAnuales,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";

export const UserSoportesPage = () => {
    const navigate = useNavigate();
    const { soporteValue } = useParams();
    const iconStyle = { width: rem(15), height: rem(15) };
    console.log(soporteValue)

    return (
        <Container size="xxl">
            <Tabs
                value={soporteValue}
                onChange={(value) => navigate(`/gad/d/soportes/${value}`)}
                defaultValue="actuales"
            >
                <Tabs.List grow>
                    <Tabs.Tab
                        value="actuales"
                        leftSection={<IconDeviceImacUp style={iconStyle} />}
                    >
                        Seguimiento de soportes
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="anuales"
                        leftSection={<IconDeviceImacExclamation style={iconStyle} />}
                    >
                        Todas mis solicitudes
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="actuales">
                    <SectionUsersSoportesActuales tabValue={soporteValue} />
                </Tabs.Panel>

                <Tabs.Panel value="anuales">
                    <SectionUsersSoportesAnuales tabValue={soporteValue} />
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
};
