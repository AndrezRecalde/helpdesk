import { Image } from '@mantine/core';

export const Logo = ({ height = 200, width = "auto" }) => {
    const imagenes = JSON.parse(localStorage.getItem("service_images"));
    return (
        <Image
            radius="md"
            mx="auto"
            h={height}
            w={width}
            fit="contain"
            alt="logo"
            src={imagenes[0]?.imagen_logo || 'https://placehold.co/600x400?text=Placeholder'}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
    );
};
