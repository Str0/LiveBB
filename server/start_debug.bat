cls
@echo off
TITLE Isometric-Server (DEBUG)
MODE 100, 60
nodemon --watch server index.js -q
@echo on