$(document).ready(function(){

	$('.dop-st').click(function(){
		if ( $(this).find('i').hasClass("fa-chevron-down")){
			 $(this).find('i').removeClass('fa-chevron-down');
			 $(this).find('i').addClass('fa-chevron-up');
		}
		else{
			 $(this).find('i').removeClass('fa-chevron-up');
			 $(this).find('i').addClass('fa-chevron-down');
		}
    })

	
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
				$(this).text("Остановить"); 
				break; 
			};
			case 'stopped': { 
				newBTN.dataStatus = 'active'; 
				$(this).removeClass('btn-danger').addClass('btn-success');  
				$(this).text("Запустить"); 
				break; 
			};
		}
		
		console.log(data);

		$(this).attr('data-status', newBTN.dataStatus);

		$.get(`/adm/api/carousel/status/${data.id}/${data.status}`, function(data, status) {
			console.log(data);
		})

	})



	$('.remove-adv').click(function(){
		
		// view remove
		let th = $(this).parent().parent().parent();
		$(th).remove()

		// server side remove

		let data = {
			carousel_id: $(this).attr('data-cor-id'),
			adv_id: $(this).attr('data-adv-id')
		}
		console.log(data);

		$.get(`/adm/api/carousel/remove/${data.carousel_id}/${data.adv_id}`, function(data, status) {
			console.log(data);
		})

	})

	$(".dropdown-menu a").click(function(){
		var mainBtn = $(this).parent().parent().children().first();
      	$(mainBtn).text($(this).text());					// name
      	$(mainBtn).next().val($(this).attr('data-id'));			// id
    });




    $('.remove-carousel').click(function(){
    	// Remove carousel
    	let data = {
    		id: $(this).attr('data-id'),
    		tr: $(this).parent().parent() // row
    	}

    	// View remove

    	$(data.tr).remove()	// remove main tr

    	$(`tr[data-objectId=${data.id}]`).each(function() {
		    $(this).remove();	// remove children
		});

    	// Server side remove

		$.get(`/adm/api/carousel/remove/${data.id}`, function(data, status) {
			console.log(data);
		})

    })
})