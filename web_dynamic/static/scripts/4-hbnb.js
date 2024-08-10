$(document).ready(function () {
  const checkedAmenities = {};

  // Function to update the amenities display
  function updateAmenitiesDisplay() {
    const amenitiesList = Object.values(checkedAmenities);
    if (amenitiesList.length > 0) {
      $('div.amenities > h4').text(amenitiesList.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  }

  // Event listener for checkbox changes
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    updateAmenitiesDisplay();
  });

  // Function to check API status
  function checkApiStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success' && data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  // Function to load places
  function loadPlaces(data = '{}') {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: data,
      dataType: 'json',
      contentType: 'application/json',
      success: function (places) {
        $('.places').empty();
        for (const place of places) {
          $('.places').append(
            `<article>
              <h2>${place.name}</h2>
              <div class="price_by_night"><p>$${place.price_by_night}</p></div>
              <div class="information">
                <div class="max_guest"><div class="guest_image"></div><p>${place.max_guest}</p></div>
                <div class="number_rooms"><div class="bed_image"></div><p>${place.number_rooms}</p></div>
                <div class="number_bathrooms"><div class="bath_image"></div><p>${place.number_bathrooms}</p></div>
              </div>
              <div class="description"><p>${place.description}</p></div>
            </article>`
          );
        }
      }
    });
  }

  // Initial load of places
  loadPlaces();

  // Event listener for search button click
  $('.filters > button').click(function () {
    const amenities = Object.keys(checkedAmenities);
    loadPlaces(JSON.stringify({ amenities: amenities }));
  });

  // Check API status on page load
  checkApiStatus();
});
