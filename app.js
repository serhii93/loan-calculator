// Listen to submit button
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";
  // Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Creating Calculate Result Function
function calculateResults() {
  console.log("Calculating....");
  // UI Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // Show results
    document.getElementById("results").style.display = "block";
    // hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

// Show error
function showError(error) {
  // hide results
  document.getElementById("results").style.display = "none";
  // hide loader
  document.getElementById("loading").style.display = "none";
  // creat a div
  const errorDiv = document.createElement("div");

  // Get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";
  // creat text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Inssert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear errror after 3 second
  setTimeout(clearError, 3000);
}

// Clear error function
function clearError() {
  document.querySelector(".alert").remove();
}
