interface AdminWebConfig {
  apiBaseUrl: string;
}

let env: any = process.env.REACT_APP_ENVIRONMENT ?? "production";

let webConfig: AdminWebConfig;

switch (env) {
  case "development":
    webConfig = {
      apiBaseUrl: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3000",
    };
    break;
  case "production":
    webConfig = {
      apiBaseUrl: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3000",
    };
    break;
  default:
    webConfig = {
      apiBaseUrl: process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3000",
    };
}

export default webConfig;
