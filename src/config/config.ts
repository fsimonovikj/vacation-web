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
  case "development":
    webConfig = {
      apiBaseUrl: "http://localhost:3000",
    };
    break;
  case "staging":
    webConfig = {
      apiBaseUrl: "http://localhost:3000",
    };
    break;
  case "production":
    webConfig = {
      apiBaseUrl: "http://api.odmor.k.net.mk",
    };
    break;
  case "knet":
    webConfig = {
	apiBaseUrl: "http://api.odmor.k.net.mk"
    }
    break;
  default:
    webConfig = {
      apiBaseUrl: "http://localhost:3000",
    };
}

export default webConfig;
