ECHO OFF
::ECHO
if exist docker-compose.yml (
    ECHO Building from docker-compose.yml && docker-compose build && ECHO Starting platform... && docker-compose up
) else (
    ECHO Can't find docker-compose.yml file
)
PAUSE