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
			<img src="` +
		project['thumb'] +
		`" class="card-img-top">
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
	return (
		`<div class="modal fade" id="` +
		uniqueId +
		`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
	            aria-hidden="true">
		<div class="modal-dialog-centered modal-dialog modal-lg" role="document">
			<div class="modal-content">
			
				<div class="modal-header">
					<h5 class="modal-title" id="` +
		uniqueId +
		`ModalTitle">` +
		project['title'] +
		`</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div><img src="` +
		project['image'] +
		`">
				<div class="modal-body"><h6 class="card-subtitle mb-2 text-muted">` +
		project['tags'] +
		`</h6>
					<div class="container-fluid">
					<div class="row">
					<div class="col-md-4">.col-md-4</div>
					<div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
					</div>
					<div class="row">
					<div class="col-md-3 ml-auto">.col-md-3 .ml-auto</div>
					<div class="col-md-2 ml-auto">.col-md-2 .ml-auto</div>
					</div>
					<div class="row">
					<div class="col-md-6 ml-auto">.col-md-6 .ml-auto</div>
					</div>
					<div class="row">
					<div class="col-sm-9">
						Level 1: .col-sm-9
						<div class="row">
						<div class="col-8 col-sm-6">
							Level 2: .col-8 .col-sm-6
						</div>
						<div class="col-4 col-sm-6">
							Level 2: .col-4 .col-sm-6
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
