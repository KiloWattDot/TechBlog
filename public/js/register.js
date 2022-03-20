async function register() {


    // e.preventDefault();

	const username = document.querySelector('.username-signup').value.trim();
	const email = document.querySelector('.email-signup').value.trim();
	const password = document.querySelector('.password-signup').value.trim();

    if(username && email && password ) { 
        const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({  username, email, password}),
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/register');
      alert('Sign in successful...');
    } else {
      alert('Sign in failed...');
    }
      console.log(response);
  };
}

  
  document
  .querySelector('.signUp-form')
  .addEventListener('submit', register);