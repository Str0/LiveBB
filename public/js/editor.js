
class Editor
{
	constructor()
	{
		this.editor_element = 
		{
			'button_BB_Linebreak': "[br][/br]",
			'button_BB_Bold': '[b][7b]',
			'button_BB_Italic': '[i][/i]',
			'button_BB_Underline': '[u][/u]',
			'button_BB_Strikethrough': '[s][/s]',
			'button_BB_HorizontalLine': '[hr][/hr]',
			'button_BB_FontFamily': '[font=fontname][/font]',
			'button_BB_FontSize': '[size=number][/size]',
			'button_BB_FontColor': '[color=name][/color]',
			'button_BB_AlignLeft': '[left][/left]',
			'button_BB_AlignCenter': '[center][/center]',
			'button_BB_AlignJustify': '[justify][/justify]',
			'button_BB_AlignRight': '[right][/right]',
			'button_BB_Quote': '[quote=author][/quote]',
			'button_BB_Code': '[code][/code]',
			'button_BB_CodeBox': '[codebox][/codebox]',
			'button_BB_URL': '[url=link]text[/url]',
			'button_BB_Image': '[img]url[/img]',
			'button_BB_UnorderedList': '[ul][/ul]',
			'button_BB_OrderedList': '[ol][/ol]',
			'button_BB_ListItem': '[*]',
			'button_BB_List': '[list=type][/list]',
			'button_BB_Table': '[table][/table]',
			'button_BB_TableRow': '[tr][/tr]',
			'button_BB_HeadColumn': '[th][/th]',
			'button_BB_Column': '[td][/td]',
			'button_BB_Tabulator': '[tab2][/tab2]',
		}

		this.position = 0

		$('#input').keypress(this.Event_onInput.bind(this))
		$('#input').click(this.Event_onInput.bind(this))

		$('#fileLoad').change(function(e) { 
			var file = $('#fileLoad').prop('files')[0]
			bootbox.confirm("Do you want to load this file?",
			function() 
			{
				 var fr = new FileReader();
          		fr.onload = function(){
					$('#input').val((fr.result))
					ToastInstance.add('Loaded '  + file.name + '!', null, 'check')
					parse()
				};
          		fr.readAsText(file);
			})
		})

		document.addEventListener("keydown", function (e) {
			if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode == 83) {
				e.preventDefault();
				StorageInstance.save(1, $('#input').val())
				ToastInstance.add("Saved!", null, 'check')
			}
		}, false);
	}

	insert(element)
	{
		if (this.editor_element[element.id])
		{	
			var parts = this.split(this.getPosition())
			console.log(parts[0] + parts[1])
			this.set(parts[0] + this.editor_element[element.id] + parts[1])
		}
		if (element.id == 'button_save')
			this.save()
		if (element.id == 'button_save_quick')
			this.saveQuick()
		else if(element.id== 'button_load_file')
			this.load()
		else if(element.id=='button_load_quick')
			this.loadQuick()
		parse()
	}

	split(index) 
	{
		var value = this.get()
		return new Array(value.substring(0, index), value.substring(index))
	}

	get()
	{
		return $('#input').val()
	}

	set(value)
	{
		$('#input').val(value)
	}

	setPosition(position)
	{
		this.position = position
	}

	Event_onInput()
	{	
		this.setPosition(this.getPosition())
	}

	getPosition() 
	{
		var input = document.getElementById('input')
		if (document.selection && document.selection.createRange) {
			var range = document.selection.createRange();
			var bookmark = range.getBookmark();
			var caret_pos = bookmark.charCodeAt(2) - 2;
		} else {
			if (input.setSelectionRange)
				var caret_pos = input.selectionStart;
		}
		return caret_pos;
	}

	save() 
	{
		printJS(
			{
				printable	: 'output',
				type		: 'html',
				header		: '',
				css			: '../resources/stylesheet/style-pdf.css',
			})
	}


	load()
	{
	 	$("#fileLoad").trigger('click');
	}

	saveQuick()
	{
		bootbox.confirm("Do you want to override the quick-save?",
		function()
		{ 
			StorageInstance.save(1, $('#input').val())
			ToastInstance.add('Saved Quick-Save', null, 'check')
		})
	}


	loadQuick()
	{
		bootbox.confirm("Do you want to load the quick-save?",
		function()
		{ 
			$('#input').val(StorageInstance.load(1))
			parse()
			ToastInstance.add('Loaded Quick-Save', null, 'check')
		})
	}

}


