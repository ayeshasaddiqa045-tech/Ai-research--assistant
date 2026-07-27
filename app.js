async function analyzeText() {
  const input = document.getElementById('researchInput').value;
  const outputDiv = document.getElementById('output');
  
  if (!input.trim()) {
    alert("Please enter some text or research topic!");
    return;
  }

  outputDiv.style.display = "block";
  outputDiv.innerHTML = "⏳ Analyzing research text... Please wait...";

  // Apni Gemini API key single quotes ke andar paste karein
  const API_KEY = 'AQ.Ab8RN6JY_QP8L7e9UNLIfzRHVLyO736bW-khWfnjGLfzeJd0TA'; 
  
  const systemPrompt = `You are ScholarAI, an expert AI Research Assistant. 
  Your task is to analyze academic text or research topics and provide:
  1. Key Summary (Bullet points)
  2. Main Research Findings
  3. Suggested Academic References / Citations
  Be clear, formal, and academic in tone.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser Input:\n${input}` }]
        }]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      outputDiv.innerText = data.candidates[0].content.parts[0].text;
    } else {
      outputDiv.innerText = "Error: Could not generate analysis. Please check your API key.";
    }
  } catch (error) {
    outputDiv.innerText = "Error connecting to AI service: " + error.message;
  }
}
