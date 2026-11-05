
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

});
