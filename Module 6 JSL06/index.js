// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    Starters: ["Garlic Bread", "Bruschetta"],
    MainCourses: ["Margherita Pizza", "Spaghetti Carbonara"],
    Desserts: ["Tiramisu", "Cheesecake"]
};

// Function to display menu items by category
function displayMenuItems(menu) {
    const menuContainer = document.getElementById('menu-container');

    for (const category in menu) {

        const categoryElement = document.createElement('h3');
        categoryElement.className = 'category';
        categoryElement.textContent = category;
        menuContainer.appendChild(categoryElement);

        const itemList = document.createElement('ul');
        itemList.className = 'item-list';
        menuContainer.appendChild(itemList);

        menu[category].forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.addEventListener('click', () => addToOrder(item));
            itemList.appendChild(listItem);
        });
            menuContainer.appendChild(itemList);
    }
    // Get the menu container element from the HTML

    // Loop through each category and its items in the menu object

        // Create an element to represent the category

        // Set the text content of the category element to the category name

        // Append the category element to the menu container

        // Create an element to represent a list of items

        // Append a list of items element to the menu container

        // Loop through the items in the category and create list items

            // Create a list item element

            // Set the text content of the list item element to the item name

            // Attach a click event listener to the list item to add it to the order

            // Append the list item to the list of items

            
}

// Callback function for adding an item to the order
function addToOrder(itemName) {
    const orderItemList = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');

    const orderItem = document.createElement('li');
    orderItem.textContent = itemName;
    orderItemList.appendChild(orderItem);

    const itemPrice = 10.00;
    const currentTotal = parseFloat(orderTotalElement.textContent);
    const newTotal = currentTotal + itemPrice;

    orderTotalElement.textContent = newTotal.toFixed(2);
    // Get the order items list and the order total element from the HTML

    // Create a list item for the order

    // Set the text content of the list item to the item name

    // Append the list item to the order items list

    // Calculate and update the total price

    // Update the text content of the order total element with the new total
}

// Function to initialize the menu system
function initMenuSystem(menu) {
    displayMenuItems(menu);
    // Call the function to display menu items
}

// Start the menu system by calling the init function
initMenuSystem(menu);
