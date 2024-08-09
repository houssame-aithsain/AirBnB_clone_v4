document.addEventListener('DOMContentLoaded', function () {
    fetch('http://0.0.0.0:5001/api/v1/status/')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                document.getElementById('api_status').classList.add('available');
            } else {
                document.getElementById('api_status').classList.remove('available');
            }
        })
        .catch(error => {
            document.getElementById('api_status').classList.remove('available');
        });
});
