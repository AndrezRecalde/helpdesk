export const getEnv = () => {
    return {
        VITE_APP_URL: import.meta.env.VITE_APP_URL,
        VITE_RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    };
};
