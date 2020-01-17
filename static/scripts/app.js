function getProjectJson() {
	$.ajax({
		url      : '/projects',
		dataType : 'json',
		success  : function(result) {
			var projects = result.projects;
			results.forEach(function(resultsItem, resultsIndex) {});
			return projects;
		},
		error    : function() {
			let output = '<div class="alert alert-danger" role="alert">No projects found.</div>';
			// $('#errorMessage').html(output);
		}
	});
}
