interface AdminWebConfig {
  apiBaseUrl: string;
}

let env: any = process.env.REACT_APP_ENVIRONMENT ?? "production";

let webConfig: AdminWebConfig;

switch (env) {
  case "local":
    webConfig = {
      apiBaseUrl: "http://localhost:3000",
    };
    break;
  case "production":
    webConfig = {
      apiBaseUrl: process.env.REACT_APP_BACKEND_URL ?? "",
    };
    break;
  default:
    webConfig = {
      apiBaseUrl: "http://localhost:3000",
    };
}

export default webConfig;
