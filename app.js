
async function analyzeText() {
  const input = document.getElementById('researchInput').value;
  const outputDiv = document.getElementById('output');
  
  if (!input.trim()) {
    alert("Please enter some text or research topic!");
    return;
  }

  outputDiv.style.display = "block";
  outputDiv.innerHTML = "⏳ Analyzing research text... Please wait...";

  const systemPrompt = "You are ScholarAI, an expert AI Research Assistant. Analyze the input text and provide: 1. Key Summary (Bullet points) 2. Main Research Findings 3. Suggested Academic References. Input: ";
  
  const fullPrompt = encodeURIComponent(systemPrompt + input);

  try {
    const response = await fetch(`https://text.pollinations.ai/${fullPrompt}`);
    const data = await response.text();

    if (data && data.length > 0) {
      outputDiv.innerText = data;
    } else {
      outputDiv.innerText = "Could not generate analysis. Please try again.";
    }
  } catch (error) {
    outputDiv.innerText = "Error: " + error.message;
  }
}
