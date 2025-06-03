const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
	showLoadingSpinner();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}

	if (quote.text.length > 70) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	quoteText.textContent = quote.text;
	hideLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
	showLoadingSpinner();
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (err) {
		console.log(err);
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', tweetQuote);

getQuotes();
