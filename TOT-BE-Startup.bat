@echo off
echo Starting TOT Back-End Servers
echo -

echo -   Starting Orders Server on Port 3000
start /min node orders-be.js

echo -   Starting Processing Server on Port 3001
start /min node processing.js

echo -   Starting Awards Server on Port 3002
start /min node awards_be.js

echo -
echo Press any Key to Terminate all Node.js Servers
echo WARNING: This will close Node.js Servers unrelated to TOT

pause >nul

taskkill /im node.exe