import { apiEndpoints } from "./authConfigs"

// interface IApiCallParams {
//     accessToken: string;
//   }

export async function callApi(accessToken: string) {

    console.info("Start api call...");

    console.info(`Bearer Token: ${accessToken}`);

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    debugger;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(apiEndpoints.myApi_GetDataByUserRole, options)
        .then(response => 
            {
                return response.json();
        });
       
};
