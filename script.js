const container = document.querySelector(".categories"); 

async function renderData() {
    try {
        const response = await fetch("http://localhost:3000/data");
        const data = await response.json();

        
        data.forEach(item => {
            const newItem = document.createElement('div');
            newItem.textContent = item.title; 
            newItem.style.color = item.text_color;
            container.appendChild(newItem);
        });

    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
}

renderData();

