// Fetch all users from the API
fetch('http://localhost:3001/user')
  .then(res => res.json())
  .then(data => displayUsers(data))
  .catch(error => console.error('Error fetching users:', error));

// Function to render the users into the DOM
function displayUsers(users) {
  const userList = document.getElementById('user-list');

  if (!userList) {
    console.error("Missing #user-list element in HTML.");
    return;
  }

  if (users.length === 0) {
    userList.innerHTML = '<li>No users found.</li>';
    return;
  }

  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${user.firstName} ${user.lastName}</strong> — ${user.email}<br>
      <small>DOB: ${new Date(user.dob).toLocaleDateString()}</small>
    `;
    userList.appendChild(li);
  });
}
