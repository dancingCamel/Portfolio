function makeCard(uniqueId, project) {
	// split tags into array and select only the first 3 for the card
	var cardTags = [];
	if (project['tags'].length > 3) {
		for (var i = 0; i < 3; i++) {
			cardTags.push(project['tags'][i]);
		}
	}
	else {
		cardTags = project['tags'];
	}
	cardTags.push('...');
	cardTags = cardTags.join(', ');

	return (
		`<div class="col mb-4">
		<div class="card h-100">
		<div class="card-img-container">
			<img src="` +
		project['thumb'] +
		`" class="card-img-top"></div>
			<div class="card-body">
				<h5 class="card-title">` +
		project['title'] +
		`</h5>
				<h6 class="card-subtitle mb-2 text-muted">` +
		cardTags +
		`</h6>
				<p class="card-text">` +
		project['description'] +
		`</p>
				<button type="button" class="btn btn-primary blue" data-toggle="modal" data-target="#` +
		uniqueId +
		`">
					See More
				</button>
			</div>
		</div>
	</div>`
	);
}

function makeModal(uniqueId, project) {
	// disable or enable github and live links
	var githubLink =
		'<div class="modal-link-icon inactive"><img src="../static/images/github.svg"></div><span class="link-text inactive">Github repo</span>';
	var liveLink =
		'<div class="modal-link-icon inactive"><img src="../static/images/zap.svg"></div><span class="link-text inactive">Live site</span>';
	if (project['github']) {
		githubLink =
			'<a href="' +
			project['github'] +
			'" class="modal-link-container" ><div class="modal-link-live modal-link-icon"><img src="../static/images/github.svg"></div><span class="link-text">Github repo</span></a>';
	}
	if (project['live']) {
		liveLink =
			'<a href="' +
			project['live'] +
			'" class="modal-link-container" ><div class="modal-link-live modal-link-icon"><img src="../static/images/zap.svg"></div><span class="link-text">Live site</span></a>';
	}

	challenges = 'None in particular.';
	if (project['challenges'] != '') {
		var challenges = '<ul class="dark-gray-text" style="list-style-type:circle;">';
		project['challenges'].forEach((row) => {
			tempString = '<li class="dark-gray-text">';
			tempString += row;
			tempString += '</li>';

			challenges += tempString;
		});
		challenges += '</ul>';
	}

	var projectTags = project['tags'].join(', ');

	return (
		`<div class="modal fade" id="` +
		uniqueId +
		`" tabindex="-1" role="dialog" 
	            aria-hidden="true">
		<div class="modal-dialog-centered modal-dialog modal-lg" role="document">
			<div class="modal-content">
			
				<div class="modal-header">
					<h5 class="modal-title dark-gray-text" id="` +
		uniqueId +
		`ModalTitle"><em>` +
		project['title'] +
		`</em></h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
				
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-6">
								<!-- left column -->
								<div class="row">
									<!-- img -->
									<img src="` +
		project['image'] +
		`" class="mb-2">
								</div>
								<div class="row">
									<!-- tags -->
									<p class="card-subtitle mb-2 text-muted">` +
		projectTags +
		`</p>
								</div>
								<div class="row">
									<!-- links -->
									<div class="col-md-6 modal-link-container">
										` +
		githubLink +
		`
									</div>
									<div class="col-md-6 modal-link-container">
										` +
		liveLink +
		`
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<!-- right column -->
								<div class="row">
									<!-- description -->
									<div class="col-md-12">
										<h6 class="dark-gray-text"><u>Project Description</u></h6>
										<p class="dark-gray-text">` +
		project['description'] +
		`</p><hr>
									</div>
								</div>
								<div class="row">
									<!-- challenges -->
									<div class="col-md-12">
										<h6 class="dark-gray-text"><u>Challenges</u></h6>
										<p class="dark-gray-text">` +
		challenges +
		`</p><hr>
									</div>
								</div>
								<div class="row">
									<!-- reflections -->
									<div class="col-md-12">
										<h6 class="dark-gray-text"><u>Reflections</u></h6>
										<p class="dark-gray-text">` +
		project['reflections'] +
		`</p>
									</div>
								</div>
							</div>


						</div>
						
					</div>
		
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>`
	);
}

function makeId(string) {
	var words = string.split(' ');
	var camelString = [];
	words.forEach((word) => {
		var wordWithCamelCase = word[0].toUpperCase() + word.substring(1).toLowerCase();
		camelString.push(wordWithCamelCase);
	});
	camelString[0] = camelString[0].toLowerCase();
	return camelString.join('');
}
