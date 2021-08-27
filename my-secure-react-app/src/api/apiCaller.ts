import { apiEndpoints } from "./authConfigs"

// interface IApiCallParams {
//     accessToken: string;
//   }

export async function callApi(accessToken: string) {

    console.info("Start api call...");

    console.info(`Bearer Token: ${accessToken}`);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(apiEndpoints.myApi_GetDataByUserRole, options)
        .then(response => 
            {
                // alert(apiEndpoints.myApi_GetWeatherForecast);
                // alert(response); 
                return response.json();
        });
       
};
