import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        // azure client registration id of this app
        clientId: "REGISTERED-APP-GUID",
        // url of the azure active directory tenant
        authority: "https://login.microsoftonline.com/AAD-TENANT-ID",
        //if authorization was successfull, where to redirect
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

// this is the scope of the target api, not the web app
// this is the request for the access token send to the /authorize endpoin
export const accessRequest = {
    scopes: ["api://TARGATAPIGUID/Data.GetAll"]
};

export const apiEndpoints = {
    myApi_GetWeatherForecast: "https://YOURAPINAME.azurewebsites.net/WeatherForecast/GetDataByScope"
};