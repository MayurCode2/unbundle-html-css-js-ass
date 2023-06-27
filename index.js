  // Available chocolates data (can be fetched from a backend server)
//   const chocolates = [
//     { name: "Chocolate 1", price: 2 },
//     { name: "Chocolate 2", price: 3 },
//     { name: "Chocolate 3", price: 4 },
//     { name: "Chocolate 4", price: 5 },
//     { name: "Chocolate 5", price: 6 },
//     { name: "Chocolate 6", price: 7 },
//     { name: "Chocolate 7", price: 8 },
//     { name: "Chocolate 8", price: 9, }
//   ];

  const chocolates = [
    {
      id: 1,
      name: "Milk Chocolate",
      price: 2.99,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1600070338156-c39c9b594cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
    },
    {
      id: 2,
      name: "Dark Chocolate",
      price: 3.49,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1586400928533-da0dbdca07fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
    },
    {
      id: 3,
      name: "White Chocolate",
      price: 3.99,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80"
    },
    {
      id: 4,
      name: "Caramel Chocolate",
      price: 4.99,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1604514813549-92e26bbae4f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
    {
      id: 5,
      name: "hazelnut chocolate.jpg",
      price: 5.49,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1542843137-8791a6904d14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGF6ZWxudXQlMjAlMjBjaG9jb2xhdGUlMjBiYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60"
    },
    {
      id: 6,
      name: "Almond Chocolate",
      price: 4.99,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1519148246701-3dc1897a7a21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWxtb25kJTIwY2hvY29sYXRlJTIwYmFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
    },
    {
      id: 7,
      name: "Coconut Chocolate",
      price: 3.99,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1598276223578-f16e0efa9920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q29jb251dCUyMENob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
    },
    {
      id: 8,
      name: "Mint Chocolate",
      price: 3.49,
      quintity:0,
      imageName: "https://images.unsplash.com/photo-1636450525985-f38e86fd4759?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWludCUyMGNob2NvbGF0ZSUyMGJhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
    }
  ];

  // Track selected chocolates and their quantities
  const selectedChocolates = {};

  // Get HTML elements
  const availableChocolatesElement = document.getElementById("availableChocolates");
  const selectedChocolatesElement = document.getElementById("selectedChocolates");
  const totalPriceElement = document.getElementById("totalPrice");

  // Generate chocolate cards for the available chocolates
  function generateChocolateCards() {
    availableChocolatesElement.innerHTML = "";
    chocolates.forEach((chocolate, index) => {
      const card = document.createElement("div");
      card.className = "chocolate-card";
      card.innerHTML = `<img class="img-1" src=${chocolate.imageName} alt="">
        <p>${chocolate.name} - Price: $${chocolate.price}</p>
        <div class="quantity">
          <button class="quantity-button" onclick="changeQuantity(${index}, -1)">-</button>
          <span id="quantity-${index}">0</span>
          <button class="quantity-button" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <button class="add-button" onclick="addToCustomPack(${index})">Add</button>
      `;
      availableChocolatesElement.appendChild(card);
    });
  }

  // Add a chocolate to the custom pack
  function addToCustomPack(index) {
    const chocolate = chocolates[index];
    const selectedQuantity = parseInt(document.getElementById(`quantity-${index}`).textContent);
    const totalItems = Object.values(selectedChocolates).reduce((a, b) => a + b, 0);

    if (selectedQuantity > 0 && totalItems + selectedQuantity <= 8) {
      if (selectedChocolates[chocolate.name]) {
        selectedChocolates[chocolate.name] += selectedQuantity;
      } else {
        selectedChocolates[chocolate.name] = selectedQuantity;
      }

      updateSelectedChocolates();
      calculateTotalPrice();
      resetQuantity(index);
    } else if (totalItems + selectedQuantity > 8) {
      alert("You can only select up to 8 chocolates in the custom pack.");
    }
  }

  // Remove a chocolate from the custom pack
  function removeFromCustomPack(chocolateName) {
    delete selectedChocolates[chocolateName];
    updateSelectedChocolates();
    calculateTotalPrice();
  }

  // Change the quantity of a chocolate
  function changeQuantity(index, amount) {
    const quantityElement = document.getElementById(`quantity-${index}`);
    let quantity = parseInt(quantityElement.textContent);

    if (quantity + amount >= 0 && quantity + amount <= 8) {
      quantity += amount;
      quantityElement.textContent = quantity;
    }
  }

  // Reset the quantity of a chocolate to 0
  function resetQuantity(index) {
    const quantityElement = document.getElementById(`quantity-${index}`);
    quantityElement.textContent = "0";
  }

  // Update the selected chocolates section
  function updateSelectedChocolates() {
    selectedChocolatesElement.innerHTML = "";
    for (const chocolate in selectedChocolates) {
      const quantity = selectedChocolates[chocolate];
      const card = document.createElement("div");
      card.className = "chocolate-card";
      card.innerHTML = `
        <p>${chocolate} - Quantity: ${quantity}</p>
        <button class="add-button" onclick="removeFromCustomPack('${chocolate}')">Remove</button>
      `;
      selectedChocolatesElement.appendChild(card);
    }
  }

  // Calculate the total price of the custom pack
  function calculateTotalPrice() {
    let totalPrice = 0;
    for (const chocolate in selectedChocolates) {
      const quantity = selectedChocolates[chocolate];
      const chocolateObj = chocolates.find(c => c.name === chocolate);
      totalPrice += chocolateObj.price * quantity;
    }
    totalPriceElement.textContent = totalPrice;
  }

  // Initialize the UI
  generateChocolateCards();