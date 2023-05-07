@echo off

set SOURCE_FOLDER=D:\School\MSc\2.felev\Prf\Projects\beadando\client\dist\telekocsi
set DESTINATION_FOLDER=D:\School\MSc\2.felev\Prf\Projects\beadando\server\src\public
set ANGULAR_PROJECT_FOLDER=D:\School\MSc\2.felev\Prf\Projects\beadando\client\src


echo Deleting files in %DESTINATION_FOLDER%...
del /Q %DESTINATION_FOLDER%\*.*

echo Copying files from %SOURCE_FOLDER% to %DESTINATION_FOLDER%...
xcopy /E /Y %SOURCE_FOLDER%\*.* %DESTINATION_FOLDER%\

echo Done.
