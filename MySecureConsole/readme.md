## Concepts

This console-project is based on the information on these websites:

1. Microsoft identity platform documentation
   https://docs.microsoft.com/en-us/azure/active-directory/develop/

1. Quickstart: Acquire a token and call Microsoft Graph API using console app's identity
   https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-netcore-daemon
   this example was adopted to communicate with the "MyTestApi", not with the Microsoft Graph API, like it is described on the example.

1. Scenario: Daemon application that calls web APIs
   https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-daemon-overview

1. Code Examples auf Git-hub (download) ,See Call "Own Api" - Example
   https://github.com/Azure-Samples/active-directory-dotnetcore-daemon-v2/archive/master.zip

## Project Setup

dotnet new console

dotnet add package Microsoft.Extensions.Configuration

dotnet add package Microsoft.Extensions.Configuration.Binder

dotnet add package Microsoft.Extensions.Configuration.Json

dotnet add package Microsoft.Identity.Client

dotnet add package Newtonsoft.Json

touch readme.md

touch appsettings.json

touch AuthenticationConfig.cs

touch ProtectedApiCallHelper.cs
