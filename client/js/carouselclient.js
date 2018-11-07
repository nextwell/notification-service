$(document).ready(function(){
	$('select option').on('mousedown', function (e) {
	    this.selected = !this.selected;
	    e.preventDefault();
	});

	$('.change-status').click(function(){
		
		var newBTN = {
			dataStatus: ''
		}
		var data = {
			id: $(this).attr('data-id'),
			status: $(this).attr('data-status')
		}

		switch(data.status){
			case 'active': { 
				newBTN.dataStatus = 'stopped'; 
				$(this).removeClass('btn-success').addClass('btn-danger'); 
				$(this).text("Stop"); 
				break; 
			};
			case 'stopped': { 
				newBTN.dataStatus = 'active'; 
				$(this).removeClass('btn-danger').addClass('btn-success');  
				$(this).text("Activate"); 
				break; 
			};
		}
		
		console.log(data);

		$(this).attr('data-status', newBTN.dataStatus);

		$.get(`/adm/api/carousel/status/${data.id}/${data.status}`, function(data, status) {
			console.log(data);
		})

	})
})