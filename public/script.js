function getRecommendations() {
    const title = document.getElementById('book-title').value;
    
    if (!title) {
      alert("Please enter a book title.");
      return;
    }
  
    fetch(`/api/recommend?title=${encodeURIComponent(title)}`)
      .then(response => response.json())
      .then(data => {
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = ''; // Clear previous results
  
        if (data.recommendations && data.recommendations.length > 0) {
          data.recommendations.forEach(book => {
            const li = document.createElement('li');
            li.textContent = book; // Assuming the recommendation is just a book title
            recommendationsList.appendChild(li);
          });
        } else {
          recommendationsList.innerHTML = '<li>No recommendations found.</li>';
        }
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error);
      });
  }
  
  