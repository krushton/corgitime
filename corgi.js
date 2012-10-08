$(document).ready(function() {
	
	photoUrls = [];
	shown = [];
	
	getPhotos(1);
	getPhotos(2);

	function getPhotos(pNum) {
		var dataObj = {
			api_key : '6d8c3496a8f9062f89986effee7f2fe3',
			method : 'flickr.photos.search',
			tags: 'corgi',
			sort: 'interestingness-desc',
			min_upload_date: getDate(),
			content_type: 1,
			media: 'photos',
			format: 'json',
			nojsoncallback: 1,
			page: pNum
		};
	
		$.ajax({
			url: 'http://api.flickr.com/services/rest/',
			data: dataObj,
			success: process,
			error: function() { console.log(error); },
			dataType: "json"
		});	
	}
	
	function process(data) {
		var pArr = data.photos.photo;
		for (var i = 0; i < pArr.length; i++) {
		
			dataObj = { method : 'flickr.photos.getSizes',
					api_key : '6d8c3496a8f9062f89986effee7f2fe3',
					photo_id : pArr[i].id,
					format : "json",
					nojsoncallback : 1 };
					
			$.ajax({
				url: 'http://api.flickr.com/services/rest/',
				data: dataObj,
				success: function(data) {
					pUrl = "";
					var variants = data.sizes.size;
					for (var i = 0; i < variants.length; i++) {
						if (variants[i].label == "Medium") {
							pUrl = variants[i].source;
							break;
						}
						if (variants[i].label == "Original") {
							pUrl = variants[i].source;
						}
					}
					photoUrls.push(pUrl);
				},
				error: function() { console.log(error); },
				dataType: "json"
			});	
			
		}
	}
	
	function updatePhoto() {
		var foundNew = false;
		var index = 0;
		while(!foundNew) {
			index = getRandomInt(0, photoUrls.length);
			if (shown.indexOf(index) < 0) {
				foundNew = true;
			}
		}
		$('#corgi').attr("src", photoUrls[index]);
		shown.push(index);
	}
	
	$('#more').click(function() {
		updatePhoto();
	});
	
	$('#done').click(function() {
		alert('Error: Corgi time is unstoppable.');
		updatePhoto();
	});
	
	function getDate() {
	var x = new Date();

	  with(x)
	  {
		setMonth(getMonth()-1);
		setDate(1);
	  }
	 return x;
	}
	
	function getRandomInt (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

});
