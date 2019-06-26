let button = document.querySelector('#but');

button.onclick = () => {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/v1/movies', true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
        name: 'Star wars 1',
        genre: 'cool',
        rating: 10,
        explicit: true
      }))

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log('done')
            }
        }
    }
}