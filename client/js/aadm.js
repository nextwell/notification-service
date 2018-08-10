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
		var inp = this;
		var _URL = window.URL;
		let file = this.files[0];
	    
	    img = new Image();
	    img.onload = function () {
	    	console.log($(inp).attr('id'))
	    	if ( $(inp).attr('id') == 'icon' ){
	    		if ( this.width != 192 || this.height != 192 ){
	    			console.log('icon error');
	    			$(inp).next('.custom-file-control').addClass("selected").html("Неверный размер");
	    			$(inp).val('');
	    		}
	    		else {
		    		let fileName = $(inp).val().split('\\').pop(); 
		   			$(inp).next('.custom-file-control').addClass("selected").html(fileName); 
		    	}
	    	}
	   

	    	if ( $(inp).attr('id') == 'image' ){
	    		if ( this.width != 492 || this.height != 328 ){
	    			console.log('image error');
	    			$(inp).next('.custom-file-control').addClass("selected").html("Неверный размер");
	    			$(inp).val('');
	    		}
	    		else {
		    		let fileName = $(inp).val().split('\\').pop(); 
		   			$(inp).next('.custom-file-control').addClass("selected").html(fileName); 
		    	}
	    	}

        };
        img.src = _URL.createObjectURL(file);
	});

	 var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();

        }
        form.classList.add('was-validated');
      }, false);
  })

})