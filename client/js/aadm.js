$(document).ready(function(){
	$.get('/adm/api/geo', function(data, status){
		console.log(data);
		data.forEach(function(item, i, arr) {
		  	let option = '<option value="' +  item.countryCode + '">' + item.country + ' (' + item.countryCode + ')' + '</option>';
		  	$(".countries").append(option);
		});
	});

	$.get('/adm/api/lang', function(data, status){
		console.log(data);
		data.forEach(function(item, i, arr) {
		  	let option = '<option value="' + item + '">' + item + '</option>';
		  	$(".langs").append(option);
		});
	});
})