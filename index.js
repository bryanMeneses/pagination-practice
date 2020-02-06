const elements = {
  curPageEl: document.getElementById('current-page'),
  nextPageEl: document.getElementById('next-page'),
  prevPageEl: document.getElementById('prev-page'),
  cardsContainer: document.getElementById('cards-container'),
};

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
}

const paginate = async () => {
  const { curPageEl, nextPageEl, prevPageEl, cardsContainer } = elements;

  let data = await fetchPosts();

  let curPage = parseInt(curPageEl.innerText) - 1;
  let chunkedPosts = chunkPosts(data, 5)

  // initial map for screen load
  mapPostsToHtml(cardsContainer, curPage, chunkedPosts);

  nextPageEl.addEventListener('click', () => {
    if (curPage === chunkedPosts.length - 1) {
      console.log('out of range array');
      return;
    }
    curPage += 1;
    curPageEl.innerText = curPage + 1;
    mapPostsToHtml(cardsContainer, curPage, chunkedPosts)
  })

  prevPageEl.addEventListener('click', () => {
    if (curPage === 0) {
      console.log('out of range array');
      return;
    }
    curPage -= 1;
    curPageEl.innerText = curPage + 1;
    mapPostsToHtml(cardsContainer, curPage, chunkedPosts)
  })
}

paginate();






// Helper functions

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

const mapPostsToHtml = (container, curPage, chunkedPosts) => {

  const mainContent = chunkedPosts[curPage].map(cur => {
    return `
      <div class="contact-card">
        <h3 class="card-title">${cur.title}</h3>
        <p class="card-body">${cur.body}</p>
      </div>
      `;
  }).join('');

  container.innerHTML = mainContent;
}