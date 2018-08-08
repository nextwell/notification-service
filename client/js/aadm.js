$(document).ready(function(){
	$.get('/adm/api/geo', function(data, status){
		console.log(data);
		data.forEach(function(item, i, arr) {
			$.get(`/adm/api/users/country/${item.countryCode}`, function(data, status) {
				let option = '<option value="' +  item.countryCode + '">' + item.country + ' (' + item.countryCode + ') / ' + data.length + ' users' + '</option>';
		  		$(".countries").append(option);
			})
		  	
		});
	});

	$.get('/adm/api/lang', function(data, status){
		console.log(data);
		data.forEach(function(item, i, arr) {
			$.get(`/adm/api/users/lang/${item}`, function(data, status) {
				let option = '<option value="' + item + '">' + item + ' / ' + data.length + ' users' + '</option>';
				console.log(option)
				$(".langs").append(option);
			})
/*		  	let option = '<option value="' + item + '">' + item + '</option>';
		  	$(".langs").append(option);*/
		});
	});

	$.get(`/adm/api/users/lang/all`, function(data, status){
		$('.all-users').html(`Все / ${data.length} users`)
	})

	$('.custom-file-input').on('change', function() { 
	    let fileName = $(this).val().split('\\').pop(); 
	    $(this).next('.custom-file-control').addClass("selected").html(fileName); 
	});
})