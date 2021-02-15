import { apiEndpoints} from "./apiConfigs"

interface IApiCallParams {
    accessToken: string;
  }

export async function callApi(params: IApiCallParams) {

    console.info("Start api call...");

    console.info(`Bearer Token: ${params.accessToken}`);

    const headers = new Headers();
    const bearer = `Bearer ${params.accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(apiEndpoints.myApi_GetWeatherForecast, options)
        .then(response => response.json())
       
};
