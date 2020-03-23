cls
@echo off
TITLE Basic HTTP-Server (DEBUG)
MODE 100, 60
nodemon --watch server index.js -q
@echo on