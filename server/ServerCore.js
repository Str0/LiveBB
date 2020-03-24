"use strict"
let Express  = require('express')
let Console = require('./Console')
class ServerCore 
{
	constructor() 
	{

		this.App = Express()
		this.HttpServer = require('http').Server(this.getApp())
		this.Console = new Console(this)
	
		this.setup() 
		this.start()
	}

	setup() 
	{
		this.getApp().use(Express.static(__dirname + '/../public/'));
		this.getApp().get('/', function (req, res) 
		{
			res.sendFile(__dirname 	+ '/../public/');
		})
	}

	start() 
	{
		
		this.getHttpServer().listen(3000, function () 
		{
			this.Console.attach()
		}.bind(this))
	
	}
	getApp(){return this.App}
	getHttpServer(){return this.HttpServer}

}

module.exports = ServerCore
