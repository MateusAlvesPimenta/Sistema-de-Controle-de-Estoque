:: Commands to initiate the application

:: Hide terminal commands
@echo off

:: Initiate the Front-end
cd "./Front-end"
start /min cmd /k "npm run dev"

:: Initiate the Back-end
cd "../Back-end"
start /min cmd /k "dotnet run"