$( document ).ready(function() {
	var input = $("#input")
	ParserInstance = new BBCodeParser()
	StorageInstance = new StorageManager()
	StatusInstance = new Status()
	ToastInstance = new Toast()
	EditorInstance = new Editor()
	$('#input').val(StorageInstance.load(0))
	$('#input').bind('input propertychange', parse)
	$("#status").css('opacity', '0')
	$('.editor-button').bind('click', 
		function()
		{
			EditorInstance.insert(this)
		}
	)
	parse()
	stickToTop()
})

function parse()
{
	try
	{
		$("#output").html(ParserInstance.format($('#input').val()))
		StatusInstance.set(ParserInstance.getState())
		document.body.scrollTop = 0;
		StorageInstance.save(0, $('#input').val())
	}
	catch(error) 
	{
		
	}
}

function stickToTop() 
{
	if (document.body.scrollTop > 0)
		document.body.scrollTop = 0
	requestAnimationFrame(stickToTop)
}