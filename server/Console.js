class Console 
{
	constructor(core) 
	{
		this.core = core
		this.commandList = Array()
		this.commandList["rs"] = ["Restart the Server"]
		this.commandList["info"] = ["Print Server-Info"] 


		this.prompt = require('prompt')
		this.inputFilter = [{name:'>'}]
		if (this.prompt)
			this.prompt.start()
	}

	attach() 
	{
		this.welcome()
		this.input()
	}

	input() 
	{
	
		this.prompt.get(this.inputFilter, this.Event_onPrompt.bind(this))
	}

	Event_onPrompt(error, result)
	{
		if (error) 
		{
			console.log(error)
			this.input()
			return 1
		}
		else 
		{
			if (result['>'].length > 0)
			{
				console.log('Executing: ' + result['>'])
				this.processCommand(result['>'])
				this.input()
			}
		}
	}

	processCommand(command)
	{
		if (command == 'help')
			this.help()
		
	}

	help() 
	{
		console.log('[!] Avalaible Commands:\n')
		for(let command in this.commandList)
			console.log(command + ' - ' + this.commandList[command][0])
	}

	welcome() 
	{
		console.log('')
		console.log('')
		var address = this.getCore().getHttpServer().address().address.length > 2 ? this.getCore().getHttpServer().address().address : 'localhost'
		console.log('Basic HTTP-Server by Strobe 	 ')
		console.log('[+] Server started!')
		console.log('[+] Running on ' + address + ":" + this.getCore().getHttpServer().address().port)
	}

	getCore(){return this.core}
}

module.exports = Console