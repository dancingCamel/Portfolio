var projects = [];

function getProjectJson() {
	$.ajax({
		url      : '/projects',
		dataType : 'json',
		success  : function(result) {
			var results = result.projects;

			for (var i = 0; i < results.length; i++) {
				var temp = results[i];

				temp['challenges'] = temp['challenges'].split(',');
				temp['tags'] = temp['tags'].split(',');
				projects.push(temp);
			}
		},
		error    : function() {
			let output = '<div class="alert alert-danger" role="alert">No projects found.</div>';
			// $('#errorMessage').html(output);
		}
	});
}
