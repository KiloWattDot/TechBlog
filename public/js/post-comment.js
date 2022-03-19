

// Post Function 
async function submitPost() {
  // e.preventDefault()

  const title = document.querySelector(".newTitle").value;
  const description = document.querySelector(".newPostDesc").value;

  if (description && title) {
    const response = await fetch("/api/users/post", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setTimeout(() => {
        document.location.replace("/");
      }, 2000);
      document.querySelector(".newTitle").value = "";
      document.querySelector(".newPostDesc").value = "";
    });
    console.log(response);
  }
}

// Comment Function

async function submitComment() {
  // e.preventDefault()

  const description = document.querySelector(".commentPost").value;
  const post_id = document.querySelector(".postId").value;

  if (description && post_id) {
    const response = await fetch("/api/users/comment", {
      method: "POST",
      body: JSON.stringify({ description, post_id }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setTimeout(() => {
        document.location.replace("/");
      }, 2000);
      document.querySelector(".commentPost").value = "";
    });
    console.log(response);
  }
}



// Post Delete Function
function delPost(id) {
  const response = fetch(`/api/users/post/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(() =>
    setTimeout(() => {
      document.location.replace("/");
    }, 2000)
  );
}


function toggleMenuBtn () {
  const toggleMenu = document.querySelector('#btn-toggle')
  const naviList = document.querySelector('#naviList')


  toggleMenu.addEventListener('click', () => {
      naviList.classList.toggle('active')
  })
}


// Comment Delete Function
function theDelete(id) {
  const response = fetch(`/api/users/comments/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(() =>
    setTimeout(() => {
      document.location.replace("/");
    }, 2000)
  );
}
