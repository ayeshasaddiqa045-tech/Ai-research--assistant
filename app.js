
async function analyzeText() {
  const input = document.getElementById('researchInput').value;
  const outputDiv = document.getElementById('output');
  
  if (!input.trim()) {
    alert("Please enter some text or research topic!");
    return;
  }

  outputDiv.style.display = "block";
  outputDiv.innerHTML = "⏳ Analyzing research text... Please wait...";

  const systemPrompt = "You are ScholarAI, an expert AI Research Assistant. Analyze the input text and provide: 1. Key Summary (Bullet points) 2. Main Research Findings 3. Suggested Academic References.";

  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input }
        ],
        model: "mistral"
      })
    });

    if (!response.ok) {
      throw new Error("Server responded with status " + response.status);
    }

    const data = await response.text();

    if (data && !data.includes("error")) {
      outputDiv.innerText = data;
    } else {
      outputDiv.innerText = "Error: Service temporarily unavailable. Please try again.";
    }
  } catch (error) {
    outputDiv.innerText = "Error connecting to AI service: " + error.message;
  }
}
