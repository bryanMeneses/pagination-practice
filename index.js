const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  let chunkedPosts = chunkPosts(data, 5)

  const cardsContainer = document.getElementById('cards-container');

  const mainContent = chunkedPosts[0].map((cur, index) => {
    return `
      <div class="contact-card">
        <h3 class="card-title">${cur.title}</h3>
        <p class="card-body">${cur.body}</p>
      </div>
      `;
  }).join('');

  cardsContainer.innerHTML = mainContent;
}

// chunk our data of 100 objects into arrays of 5 objects 
// [{data} * 100 ] => [[data of 5] * 20]
// should be 20 pages
// return array of arrays
const chunkPosts = (data, itemsPerPage) => {
  let chunkedData = [];
  let index = 0;

  while (index < data.length) {
    chunkedData.push(data.slice(index, index + itemsPerPage));
    index += itemsPerPage;
  }

  return chunkedData;
}

// const paginatePost = (data, chunker) => {

// }

fetchPosts();