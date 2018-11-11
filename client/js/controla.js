$(document).ready(function(){
	$('.remove-adv').click(function(){
		let data = {
			id: $(this).attr('data-id'),
			td: $(this).parent().parent()
		}

		// client remove
		$(data.td).remove();
		// backend remove
		$.get(`/adm/api/aa/remove/${data.id}`, function(data, status) {
			console.log(data);
		})
	})
})