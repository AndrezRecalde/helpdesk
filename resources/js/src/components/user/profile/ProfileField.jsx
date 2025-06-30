import { TextSection } from "../../../components";

export const ProfileField = ({ value, label }) => {
    return (
        <div>
            <TextSection tt="" fw={700}>
                {value}
            </TextSection>
            <TextSection tt="uppercase" fz={12} fw={600} color="dimmed">
                {label}
            </TextSection>
        </div>
    );
};
