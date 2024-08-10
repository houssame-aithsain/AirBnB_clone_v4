$(document).ready(function () {
  const apiStatus = $('#api_status');
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });

  $('#search_button').click(function () {
    const selectedAmenities = [];
    $('div.amenities input:checked').each(function () {
      selectedAmenities.push($(this).data('id'));
    });

    const selectedStates = [];
    const selectedCities = [];
    $('div.locations h2').each(function () {
      const state = $(this).text().slice(0, -1); // Remove the colon
      selectedStates.push(state);
    });
    $('div.locations ul li').each(function () {
      const city = $(this).text();
      selectedCities.push(city);
    });

    const searchParams = {
      amenities: selectedAmenities,
      states: selectedStates,
      cities: selectedCities
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(searchParams),
      success: function (data) {
        $('section.places').empty(); // Clear previous places
        for (const place of data) {
          const article = $('<article></article>');
          article.append('<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
          article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guests</div><div class="number_rooms">' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div></div>');
          article.append('<div class="description">' + place.description + '</div>');
          $('section.places').append(article);
        }
      }
    });
  });
});
