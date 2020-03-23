class Toast
{
	constructor()
	{
		this.root = $("#toast_container")
		this.queue = []
	}

	add(text, color='rgba(1, 1, 1, .5)', icon="save")
	{
		var node = document.createElement('div')
		
		node.innerHTML = '<div style="background-color: ' + color + ';" class="toast fade show"><div style="padding: 10px;padding-right: 20px;" class="toast-header"><strong class="mr-auto"><i class="fa fa-' + icon + '"></i> ' + text + '</strong></div>'
		node.style.marginTop = '18px'
		this.root.append(node)
		this.queue[node] = Date.now() 
		setTimeout(function(){$(node).fadeOut()}, 4000)
	}	

	pulse() 
	{

	}
}