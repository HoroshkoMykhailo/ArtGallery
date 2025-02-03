const { VITE_APP_PROXY_SERVER_URL } = import.meta.env;

const ENV = {
  SERVER_URL: VITE_APP_PROXY_SERVER_URL as string
};

export { ENV };
