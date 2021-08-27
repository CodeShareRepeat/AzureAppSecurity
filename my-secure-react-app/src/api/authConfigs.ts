import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        // azure client registration id of this app
        clientId: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX ",
        // url of the azure active directory tenant
        authority: "https://login.microsoftonline.com/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX ",
        //if authorization was successfull, where to redirect
        redirectUri: "http://YOUR-APP-URL"
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

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
// This is the Scope for the Api, Not the webapp
export const accessRequest = {
    scopes: ["api://XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/SCOPE"]
};

export const apiEndpoints = {
    myApi_GetDataByUserRole: "https://YOUR-TARGET-API/METHOD"
};