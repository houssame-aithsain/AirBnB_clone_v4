$(document).ready(function () {
  const checkedAmenities = {};
  const checkedLocations = { states: {}, cities: {} };

  function updateDisplay() {
    const amenitiesList = Object.values(checkedAmenities);
    const locationsList = [...Object.values(checkedLocations.states), ...Object.values(checkedLocations.cities)];
    $('div.amenities > h4').text(amenitiesList.join(', ') || '\u00A0');
    $('div.locations > h4').text(locationsList.join(', ') || '\u00A0');
  }

  $(document).on('change', "input[type='checkbox']", function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const isState = $(this).closest('ul').parent().is('li');

    if (this.checked) {
      if (isState) {
        checkedLocations.states[id] = name;
      } else {
        checkedLocations.cities[id] = name;
      }
    } else {
      if (isState) {
        delete checkedLocations.states[id];
      } else {
        delete checkedLocations.cities[id];
      }
    }
    updateDisplay();
  });

  function checkApiStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success' && data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

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

  loadPlaces();

  $('.filters > button').click(function () {
    const amenities = Object.keys(checkedAmenities);
    const states = Object.keys(checkedLocations.states);
    const cities = Object.keys(checkedLocations.cities);
    loadPlaces(JSON.stringify({ amenities: amenities, states: states, cities: cities }));
  });

  checkApiStatus();
});
