ECHO OFF
::ECHO
if exist node_modules (
	ECHO Starting server...
	node app.js
) else (
	if exist package.json (
		ECHO Installing missing dependencies...
		npm install && ECHO Starting server... && node app.js
	) else (
		ECHO Could not find package.json, is this .bat placed in the root folder?
	)
)
PAUSE