class Status
{
	constructor() 
	{
		$("#badge_invalid").css('opacity', '0')
		$("#badge_valid").css('opacity', '0')
		$('#badge_size').css('opacity', '0')

		ParserInstance.setErrorMarking(Cookies.get('markError') == undefined ? true : Cookies.get('markError') == 'true')
		$("#error_mark").prop('checked', Cookies.get('markError') == undefined ? true : Cookies.get('markError') == 'true');
		$('#error_mark').change(
		function(){
			Cookies.set('markError', $(this).is(':checked'))
			ParserInstance.setErrorMarking(Cookies.get('markError') == undefined ? true : Cookies.get('markError') == 'true')
			parse()
		});
	}

	set(status)
	{
		this.setValid(status[0])
		this.setInvalid(status[1])
		this.setSize(status[2])
	}

	get()
	{
		return this.status
	}


	setValid(value) 
	{
		$("#badge_valid").css('opacity', '1')
		$("#badge_valid").html('<i class="fa fa-check"></i> ' + value)
	}

	setInvalid(value) 
	{
		$("#badge_invalid").css('opacity', '1')
		$("#badge_invalid").html('<i class="fa fa-times"></i> ' + value)
	}

	setSize(value)
	{
		$("#badge_size").css('opacity', '1')
		$("#badge_size").html(this.humanFileSize(value, 'kB'))
	}

	setErrorMarking(bool) 
	{
		ParserInstance.setErrorMarking(bool)
	}

	humanFileSize(bytes, si) 
	{
		var thresh = si ? 1000 : 1024;
		if(Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		var units = si
			? ['kB','MB','GB','TB','PB','EB','ZB','YB']
			: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while(Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1)+' '+units[u];
	}
}