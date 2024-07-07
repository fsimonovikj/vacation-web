interface AdminWebConfig {
  apiBaseUrl: string;
}

let env: any = process.env.REACT_APP_ENVIRONMENT ?? "local";

let webConfig: AdminWebConfig;

switch (env) {
  case "local":
    webConfig = {
      apiBaseUrl: "http://localhost:3000",
    };
    break;
  case "development":
    webConfig = {
      apiBaseUrl: "https://localhost:3000",
    };
    break;
  case "staging":
    webConfig = {
      apiBaseUrl: "https://localhost:3000",
    };
    break;
  case "production":
    webConfig = {
      apiBaseUrl: "http://10.1.1.43:3000",
    };
    break;
  default:
    webConfig = {
      apiBaseUrl: "https://localhost:3000",
    };
}

export default webConfig;
