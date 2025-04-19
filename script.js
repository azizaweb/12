
let users = [];

function fetchUsers() {
    document.getElementById('loader').style.display = 'block';

    fetch('https://randomuser.me/api/?results=10')
        .then(res => res.json())
        .then(data => {
            users = data.results.map(user => ({
                name: `${user.name.first} ${user.name.last}`,
                firstName: user.name.first.toLowerCase(),
                lastName: user.name.last.toLowerCase(),
                age: user.dob.age,
                picture: user.picture.medium
            }));
            displayUsers(users);
        })
        .finally(() => {
            document.getElementById('loader').style.display = 'none';
        });
}

function displayUsers(userArray) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    userArray.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `
            <img src="${user.picture}" alt="${user.name}" />
            <div>
                <h4>${user.name}</h4>
                <p>Age: ${user.age}</p>
            </div>
        `;
        userList.appendChild(div);
    });
}

function sortUsers(by) {
    const sorted = [...users];
    if (by === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (by === 'age') {
        sorted.sort((a, b) => a.age - b.age);
    }
    displayUsers(sorted);
}

function filterUsers() {
    const value = document.getElementById('filterInput').value.toLowerCase();
    const filtered = users.filter(user =>
        user.firstName.includes(value) || user.lastName.includes(value)
    );
    displayUsers(filtered);
}

