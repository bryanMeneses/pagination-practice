const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  const cardsContainer = document.getElementById('cards-container');

  const mainContent = data.map((cur, index) => {
    return `
      <div class="contact-card">
        <h3 class="card-title">${cur.title}</h3>
        <p class="card-body">${cur.body}</p>
      </div>
      `;
  }).join('')

  cardsContainer.innerHTML = mainContent;
  console.log(data);
}

// chunk our data of 100 objects into arrays of 5 objects 
// [{data} * 100 ] => [[data of 5], 10]
// should be 10 pages
const chunkData = () => {

}

fetchPosts();