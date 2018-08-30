const submitTokenRequest = () => {
  event.preventDefault();
  const email = document.querySelector('.email');
  const appName = document.querySelector('.app-name');
  console.log(email.value, appName.value)
  fetch('/api/v1/access', {
    method: 'POST',
    headers: { 'Content-type': 'application/json'},
    body: JSON.stringify({ 
      email: email.value,
      appName: appName.value
    })
  })
  .then(response => response.json())
  .then(result => {
    document.querySelector('.token').innerText = "Your token is: " + result.token;
  })
}

document.querySelector('.submit').addEventListener('click', submitTokenRequest);