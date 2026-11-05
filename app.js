
document.addEventListener('DOMContentLoaded', function () {

    fetch('subjects.php')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Could not load subjects.');
            }

            return response.json();
        })
        .then(function (subjects) {
            const subjectList = document.querySelector('#subject');

            subjects.forEach(function (subject) {
                const option = document.createElement('option');

                option.value = subject.id;
                option.textContent = subject.name;

                subjectList.appendChild(option);
            });
        })
        .catch(function (error) {
            console.error(error);
        });

    function loadBooks() {

        const params = new URLSearchParams(new FormData(form));

        fetch(`books.php?${params}`)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Could not load books.');
                }

                return response.json();
            })
            .then(function (books) {

                tbody.replaceChildren();

                books.forEach(function (book) {

                    const row = document.createElement('tr');

                    const title = document.createElement('td');
                    title.textContent = book.title;

                    const author = document.createElement('td');
                    author.textContent = book.author;

                    const year = document.createElement('td');
                    year.textContent = book.year;

                    const subject = document.createElement('td');
                    subject.textContent = book.subject;

                    const copies = document.createElement('td');
                    copies.textContent = book.available + ' of ' + book.copies;

                    if (book.available === 0) {
                        copies.classList.add('out');
                    }

                    row.appendChild(title);
                    row.appendChild(author);
                    row.appendChild(year);
                    row.appendChild(subject);
                    row.appendChild(copies);

                    tbody.appendChild(row);

                });

                if (books.length === 0) {
                    status.textContent = 'No books match your search.';
                } else if (books.length === 1) {
                    status.textContent = '1 book found.';
                } else {
                    status.textContent = books.length + ' books found.';
                }

            })
            .catch(function (error) {
                console.error(error);
                status.textContent = 'Could not load books.';
            });
    }

     loadBooks();

    // Search when the form is submitted
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        loadBooks();
    });

});