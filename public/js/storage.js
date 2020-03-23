class StorageManager
{
	constructor() 
	{

	}

	save(slot, data) 
	{
		localStorage.setItem('DocumentSave-'+slot.toString(), data)

	}

	load(slot)
	{
		return localStorage.getItem('DocumentSave-'+slot.toString())
	}
}