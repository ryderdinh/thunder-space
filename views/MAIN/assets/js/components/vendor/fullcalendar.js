//
// Fullcalendar
//

const eventInfo = document.getElementById("eventInfo")
console.log(eventInfo);
dataEvent = JSON.parse(eventInfo.value)
console.log(dataEvent);

'use strict';

var Fullcalendar = (function() {

	// Variables

	var $calendar = $('[data-toggle="calendar"]');

	//
	// Methods
	//

	// Init
	function init($this) {

		// Calendar events

		var events = dataEvent,


		// Full calendar options
		// For more options read the official docs: https://fullcalendar.io/docs

		options = {
			header: {
				right: '',
				center: '',
				left: ''
			},
			buttonIcons: {
				prev: 'calendar--prev',
				next: 'calendar--next'
			},
			theme: false,
			selectable: true,
			selectHelper: true,
			editable: true,
			events: events,

			dayClick: function(date) {
				var isoDate = moment(date).toISOString();
				$('#new-event').modal('show');
				$('.new-event--title').val('');
				$('.new-event--start').val(isoDate);
				$('.new-event--end').val(isoDate);
			},

			viewRender: function(view) {
				var calendarDate = $this.fullCalendar('getDate');
				var calendarMonth = calendarDate.month();

				//Set data attribute for header. This is used to switch header images using css
				// $this.find('.fc-toolbar').attr('data-calendar-month', calendarMonth);

				//Set title in page header
				$('.fullcalendar-title').html(view.title);
			},

			// Edit calendar event action

			eventClick: function(event, element) {
				$('#edit-event input[value=' + event.className + ']').prop('checked', true);
				$('#edit-event').modal('show');
				$('.edit-event--id').val(event.id);
				$('.edit-event--title').val(event.title);
				$('.edit-event--description').val(event.description);
				$('.edit-event--position').val(event.position);
			}
		};

		// Initalize the calendar plugin
		$this.fullCalendar(options);


		//
		// Calendar actions
		//


		//Add new Event

		$('body').on('click', '.new-event--add', function() {
			var eventTitle = $('.new-event--title').val();
			var eventPosition = $('.new-event--position').val();

			// Generate ID
			var GenRandom = {
				Stored: [],
				Job: function() {
					var newId = Date.now().toString().substr(6); // or use any method that you want to achieve this string

					if (!this.Check(newId)) {
						this.Stored.push(newId);
						return newId;
					}
					return this.Job();
				},
				Check: function(id) {
					for (var i = 0; i < this.Stored.length; i++) {
						if (this.Stored[i] == id) return true;
					}
					return false;
				}
			};

			if (eventTitle != '') {
				$this.fullCalendar('renderEvent', {
					id: GenRandom.Job(),
					title: eventTitle,
					start: $('.new-event--start').val(),
					end: $('.new-event--end').val(),
					allDay: true,
					className: $('.event-tag input:checked').val()
				}, true);

				$('.new-event--form')[0].reset();
				$('.new-event--title').closest('.form-group').removeClass('has-danger');
				$('#new-event').modal('hide');
			} else {
				$('.new-event--title').closest('.form-group').addClass('has-danger');
				$('.new-event--title').focus();
			}
		});


		//Update/Delete an Event
		$('body').on('click', '[data-calendar]', function() {
			var calendarAction = $(this).data('calendar');
			var currentId = $('.edit-event--id').val();
			var currentTitle = $('.edit-event--title').val();
			var currentDesc = $('.edit-event--description').val();
			// var currentPosit = $('.edit-event--position').val();
			var currentClass = $('#edit-event .event-tag input:checked').val();
			var currentEvent = $this.fullCalendar('clientEvents', currentId);

			//Update
			if (calendarAction === 'update') {
				if (currentTitle != '') {
					currentEvent[0].title = currentTitle;
					currentEvent[0].description = currentDesc;
					currentEvent[0].className = [currentClass];

					console.log(currentClass);
					$this.fullCalendar('updateEvent', currentEvent[0]);
					$('#edit-event').modal('hide');
				} else {
					$('.edit-event--title').closest('.form-group').addClass('has-error');
					$('.edit-event--title').focus();
				}
			}

			//Delete
			if (calendarAction === 'delete') {
				$('#edit-event').modal('hide');

				// Show confirm dialog
				setTimeout(function() {
					swal({
						title: 'Are you sure?',
						text: "You won't be able to revert this!",
						type: 'warning',
						showCancelButton: true,
						buttonsStyling: false,
						confirmButtonClass: 'btn btn-danger',
						confirmButtonText: 'Yes, delete it!',
						cancelButtonClass: 'btn btn-secondary'
					}).then((result) => {
						if (result.value) {
							// Delete event
							$this.fullCalendar('removeEvents', currentId);

							// Show confirmation
							swal({
								title: 'Deleted!',
								text: 'The event has been deleted.',
								type: 'success',
								buttonsStyling: false,
								confirmButtonClass: 'btn btn-primary'
							});
						}
					})
				}, 200);
			}
		});


		//Calendar views switch
		$('body').on('click', '[data-calendar-view]', function(e) {
			e.preventDefault();

			$('[data-calendar-view]').removeClass('active');
			$(this).addClass('active');

			var calendarView = $(this).attr('data-calendar-view');
			$this.fullCalendar('changeView', calendarView);
		});


		//Calendar Next
		$('body').on('click', '.fullcalendar-btn-next', function(e) {
			e.preventDefault();
			$this.fullCalendar('next');
		});


		//Calendar Prev
		$('body').on('click', '.fullcalendar-btn-prev', function(e) {
			e.preventDefault();
			$this.fullCalendar('prev');
		});
	}


	//
	// Events
	//

	// Init
	if ($calendar.length) {
		init($calendar);
	}

})();
