// Arrays to store selected categories, category filters, blog data, and blog categories
let chosenCategories = [];
let filters = [];
let blogs = [];
let blogCategories = [];
let blog = [];

// DOM elements
let logInBtn = document.getElementById('log-in-btn');
let logInForm = document.querySelector('.log-in-form');
let closeBtn = document.getElementById('add');
let mailInput = document.getElementById('mail');
let categories = document.querySelector('.categories');
let submitBtn = document.querySelector('.mail-input button');
let categoryBtn = document.querySelector('.categories button');
let logInSuccess = document.querySelector('.log-in-success')
let logInInput = document.querySelector('.log-in-input')
let submitSuccessBtn = document.querySelector('.log-in-success button');
let errorText = document.querySelector('.error');
let logInBg = document.querySelector('.log-in-form-bg');
let newBlog = document.getElementById('create-blog');
let blogsContainer = document.querySelector('.blogs');
let chosenFilters = localStorage.getItem('chosenCategory');
let main = document.getElementById('main-page');
let blogPage = document.getElementById('blog-page');
let chosenBlog = document.getElementById('chosen-blog');
let splideList = document.querySelector(".splide__list");

// Check if there are chosen filters in local storage
if (chosenFilters && chosenFilters !== ''){
    chosenCategories = chosenFilters.split(',').map(str => +str)
}

// Get the current date
let date = new Date();
console.log(date);

// ... (the rest of the code, including fetching blog and category data, creating HTML elements, and adding event listeners)

// Making an HTTP GET request to fetch blog data
fetch('https://api.blog.redberryinternship.ge/api/blogs', {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer 9f0d4150a51b5eecf6ea909a0f99338ad902e76b3716739a7f792385da412d79'
    }


})
.then(res => res.json())
.then(data => {
    // Storing the fetched blog data
    blogs = data.data;

    // Iterating through each blog entry
    for (let i = 0; i < blogs.length; i++) {
        // Converting the publish date to a Date object
        let blog_date = new Date(blogs[i].publish_date);

        // Checking if the blog's publish date is before or equal to the current date
        if (blog_date <= date) {
            // Creating a div element for the blog
            let blog = document.createElement('div');
            blog.id = blogs[i].id;
            blogsContainer.appendChild(blog);

            // Creating elements for blog details (image, author, date, title)
            let blogImage = document.createElement('img');
            blogImage.src = blogs[i].image;
            let blogAuthor = document.createElement('h5');
            blogAuthor.innerText = blogs[i].author;
            let blogDate = document.createElement('span');
            blogDate.innerText = blogs[i].publish_date;
            let blogTitle = document.createElement('h3');
            blogTitle.innerText = blogs[i].title;
            blog.appendChild(blogImage);
            blog.appendChild(blogAuthor);
            blog.appendChild(blogDate);
            blog.appendChild(blogTitle);

            // Creating a div for blog categories
            let blogFilterDiv = document.createElement('div');
            blog.appendChild(blogFilterDiv);
            let blogFilters = [];

            // Iterating through each category of the blog
            for (let index = 0; index < blogs[i].categories.length; index++) {
                blogFilters.push(blogs[i].categories[index].id)

                // Creating a button for each blog category
                let blogCategory = document.createElement('button')
                blogCategory.innerText = blogs[i].categories[index].title;
                blogCategory.value = blogs[i].categories[index].id;
                blogCategory.style.backgroundColor = blogs[i].categories[index].background_color;
                blogCategory.style.color = blogs[i].categories[index].text_color;
                blogFilterDiv.appendChild(blogCategory);
            }

            // Checking if the blog categories match the chosen categories
            for (let a = 0; a < chosenCategories.length; a++) {
                if (blogFilters.includes(chosenCategories[a])) {
                    blog.removeAttribute('style');
                } else {
                    blog.setAttribute('style', 'display: none');
                    break;  
                }
            }
            

            let blogDescription = document.createElement('p');
            if (blogs[i].description) {
                blogDescription.innerText = blogs[i].description;
            } else {
                blogDescription.innerText = 'No description available.';
            }
            blog.appendChild(blogDescription);
            

            // Creating a link to the full blog page
            let blogLink = document.createElement('a');
            blogLink.className = 'blogLink';
            blogLink.href = `./blog_page.html?id=${blogs[i].id}`;
            blogLink.textContent = 'View Full Article';
            let arrowIcon = document.createElement('img');
            blogLink.innerHTML = 'სრულად ნახვა  <img src="../img/link-arrow.svg">';
            blogLink.appendChild(arrowIcon);
            blogLink.value = blogs[i].id;
            blog.appendChild(blogLink);


            // Storing the blog categories for later use
            blogCategories.push(blogFilters);
        }
    }
})
// Handling errors during the data fetching process
.catch(error => console.error('Error fetching data:', error));



// Adding an event listener for the login button click
logInBtn.addEventListener('click', () => {
    logInForm.removeAttribute('style');
    logInBg.removeAttribute('style');
});

// Adding an event listener for the close button click to hide the login form
    closeBtn.addEventListener('click', () => {
    logInForm.setAttribute('style', 'display: none');
    logInBg.setAttribute('style', 'display: none');
});

// Adding an event listener for the submit success button click to hide the login form
submitSuccessBtn.addEventListener('click', () => {
    logInForm.classList.add('hidden');
    logInBg.classList.add('hidden');
});


// Adding an event listener for the submit button click to handle form submission
    submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(mailInput.value);
    let formData = new FormData();
    formData.append('email', mailInput.value);

    // Making an HTTP POST request to the login API
    fetch('https://api.blog.redberryinternship.ge/api/login', {
        method: "POST",
        headers: {
            'accept': 'application/json',
        },
        body: formData
    })
    .then(res => {
        // Handling the response status to show or hide elements based on success or failure
        if (res.status == 204) {
            logInSuccess.removeAttribute('style');
            logInInput.setAttribute('style', 'display: none');
            logInBtn.setAttribute('style', 'display: none');
            newBlog.removeAttribute('style');
        } else {
            errorText.removeAttribute('style');
            submitBtn.removeAttribute('style');
        }
        return res.status;
    })
    .then(data => {
        // Storing login status in localStorage if login is successful
        console.log(data);
        if (data == 204) {
            localStorage.setItem('isLoggedIn', true);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Fetching categories from the API and updating UI
fetch('https://api.blog.redberryinternship.ge/api/categories')
    .then(res => res.json())
    .then(data => {
        filters = data.data;

        console.log(filters);
        // Iterating through each category to create UI buttons
        for (let index = 0; index < filters.length; index++) {
            let option = document.createElement("button");
            option.innerText = filters[index].title;
            option.value = filters[index].id;
            option.style.backgroundColor = filters[index].background_color;
            option.style.color = filters[index].text_color;
            categories.appendChild(option);

            // Checking if the category is among the chosen ones and applying a border if true
            if (chosenCategories.includes(filters[index].id)){
                option.style.border = '1px solid #000';
            }

            // Adding a click event listener to handle category selection
            option.addEventListener('click', (e) => {
                e.preventDefault;
                if (chosenCategories.includes(filters[index].id)){
                    console.log(option.innerText + " clicked twice");
                    let optionIndex = chosenCategories.indexOf(filters[index].id);
                    chosenCategories.splice(optionIndex, 1);
                    console.log(chosenCategories);
                    option.style.border = 'none';
                } else {
                    chosenCategories.push(filters[index].id);
                    console.log(chosenCategories);
                    option.style.border = '1px solid #000';
                }
                // Storing selected categories in localStorage and updating blog display
                localStorage.setItem('chosenCategory', chosenCategories);
                for (let i=0; i<blogCategories.length; i++){
                    let contains = blogCategories[i].some(element => {
                        return chosenCategories.includes(element);
                    });
                    var blog_date = new Date(blogs[i].publish_date);
                    let blogID = document.getElementById(blogs[i].id);
                    if (contains || chosenCategories.length === 0 && blog_date <= date){
                        blogID.removeAttribute('style');
                    } else {
                        blogID.setAttribute('style', 'display: none');
                    }
                }         
            });
        }
    })
    .catch(error => console.error('Error fetching data:', error));

// Logging blog categories to the console
console.log(blogCategories);
