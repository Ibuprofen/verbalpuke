console.log('testing.js');

$(function() {


	$('#test').click(function (e) {
		e.preventDefault();

		$.ajax({
			type: 'POST',
			url: '/bookmark',
			data: {
				'clientId':'1x2x3x4x5',
				'url': location.href,
				'body': 'some shit here',
				'subject': 'subject'
			},
			success: function (data) {
				console.dir(data);
			}
		});

	});
});