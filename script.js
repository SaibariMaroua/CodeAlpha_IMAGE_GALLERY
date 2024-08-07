document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.menu-gallery');
    const allItems = Array.from(document.querySelectorAll('.menu-item'));
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let filteredItems = [];

    function showItem(index) {
        if (index >= 0 && index < filteredItems.length) {
            gallery.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateButtons();
        }
    }

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === filteredItems.length - 1;
    }

    prevButton.addEventListener('click', () => {
        showItem(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showItem(currentIndex + 1);
    });

    const filterLinks = document.querySelectorAll('.nav-link');

    filterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove 'active' class from all filter links
            filterLinks.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');

            // Get the filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter menu items based on the selected category
            filteredItems = allItems.filter(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    return true;
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    return true;
                } else {
                    item.style.display = 'none';
                    return false;
                }
            });

            // Reset gallery to the first item of the filtered set
            if (filteredItems.length > 0) {
                currentIndex = 0;
                showItem(currentIndex);
            } else {
                gallery.style.transform = `translateX(0%)`;
                prevButton.disabled = true;
                nextButton.disabled = true;
            }
        });
    });

    // Initialize the gallery if there are items to show
    if (allItems.length > 0) {
        filteredItems = allItems;
        showItem(currentIndex);
    }
});
