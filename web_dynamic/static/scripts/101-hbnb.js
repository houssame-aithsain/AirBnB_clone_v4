$(document).ready(function () {
  const selectedStates = {};
  const selectedCities = {};
  const selectedAmenities = {};

  // Check API status and update the button color
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const type = $(this).closest('div').attr('class');

    if ($(this).is(':checked')) {
      if (type === 'locations') {
        if ($(this).closest('li').parent().parent().is('li')) {
          selectedCities[id] = name;
        } else {
          selectedStates[id] = name;
        }
      } else if (type === 'amenities') {
        selectedAmenities[id] = name;
      }
    } else {
      if (type === 'locations') {
        if ($(this).closest('li').parent().parent().is('li')) {
          delete selectedCities[id];
        } else {
          delete selectedStates[id];
        }
      } else if (type === 'amenities') {
        delete selectedAmenities[id];
      }
    }

    updateLocations();
  });

  function updateLocations() {
    const locations = Object.values(selectedStates).concat(Object.values(selectedCities));
    $('div.locations h4').text(locations.join(', '));
  }

  $('button').click(function () {
    const data = {
      states: Object.keys(selectedStates),
      cities: Object.keys(selectedCities),
      amenities: Object.keys(selectedAmenities)
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        // Handle the response to update the places section
        console.log(response);
      }
    });
  });
});
