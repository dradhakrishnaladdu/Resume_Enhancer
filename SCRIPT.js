function checkResume() {
  const text = document.getElementById("resumeText").value.trim();
  const role = document.getElementById("jobRole").value;
  const output = document.getElementById("output");
  const atsOut = document.getElementById("atsOutput");

  if (text.length < 80) {
    output.innerHTML = "<p>Please enter a valid resume.</p>";
    return;
  }

  const resume = text.toLowerCase();
  let resumeScore = 0;
  let atsScore = 0;
  let issues = [];
  let positives = [];

  /* BASIC INFO */
  if (resume.match(/[a-z]+\s[a-z]+/)) {
    resumeScore += 10;
    positives.push("Name detected");
  } else issues.push("Name not clearly mentioned");

  if (resume.includes("@")) {
    resumeScore += 10;
    positives.push("Email found");
  } else issues.push("Email missing");

  if (resume.match(/\d{10}/)) {
    resumeScore += 10;
    positives.push("Phone number found");
  } else issues.push("Phone number missing");

  /* STRUCTURE */
  if (resume.includes("skill")) resumeScore += 15;
  else issues.push("Skills section missing");

  if (resume.includes("education")) resumeScore += 15;
  else issues.push("Education section missing");

  if (resume.includes("experience") || resume.includes("project"))
    resumeScore += 15;
  else issues.push("Experience or projects missing");

  /* CONTENT QUALITY */
  if (resume.length > 300) resumeScore += 15;
  else issues.push("Resume content too short");

  if (resume.match(/managed|developed|designed|implemented/))
    resumeScore += 10;
  else issues.push("Use more action words");

  /* ATS KEYWORDS */
  let keywords = [];

  if (role === "Software Developer")
    keywords = ["html", "css", "javascript", "git", "api"];
  if (role === "Data Analyst")
    keywords = ["excel", "sql", "python", "data"];
  if (role === "Finance")
    keywords = ["excel", "gst", "accounts", "tax"];

  let missing = [];

  keywords.forEach(k => {
    if (resume.includes(k)) atsScore += 20;
    else missing.push(k);
  });

  if (atsScore > 100) atsScore = 100;

  /* STRENGTH */
  let strength =
    resumeScore >= 75 ? "STRONG ✅" :
    resumeScore >= 50 ? "AVERAGE ⚠️" :
    "WEAK ❌";

  /* OUTPUT */
  output.innerHTML = `
    <h3>Resume Strength: ${strength}</h3>
    <p><b>Resume Score:</b> ${resumeScore}%</p>

    <h4>What’s Good</h4>
    <ul>${positives.map(p => `<li>✔ ${p}</li>`).join("")}</ul>

    <h4>Needs Improvement</h4>
    <ul>${issues.map(i => `<li>❌ ${i}</li>`).join("")}</ul>
  `;

  atsOut.innerHTML = `
    <h3>ATS Score: ${atsScore}%</h3>
    <p>Missing Keywords:</p>
    <ul>${missing.map(m => `<li>⚠ ${m}</li>`).join("")}</ul>
  `;
  // ===== RESUME TIPS BASED ON SCORE =====
  let tipsHTML = "<h3>Resume Improvement Tips</h3>";

  if (resumeScore < 50) {
    tipsHTML += `
      <ul>
        <li>✏️ Start with a clear resume format.</li>
        <li>✏️ Add proper sections like Skills, Education, and Projects.</li>
        <li>✏️ Use simple professional words instead of casual language.</li>
        <li>✏️ Keep resume length at least 1 page.</li>
      </ul>
    `;
  } 
  else if (resumeScore >= 50 && resumeScore < 75) {
    tipsHTML += `
      <ul>
        <li>⚙️ Add more role-specific skills.</li>
        <li>⚙️ Improve bullet points using action verbs.</li>
        <li>⚙️ Mention tools, technologies, or software used.</li>
        <li>⚙️ Try to match keywords from job descriptions.</li>
      </ul>
    `;
  } 
  else {
    tipsHTML += `
      <ul>
        <li>🚀 Optimize resume for ATS keywords.</li>
        <li>🚀 Quantify achievements (numbers, results).</li>
        <li>🚀 Customize resume for each job role.</li>
        <li>🚀 Keep formatting clean and consistent.</li>
      </ul>
    `;
  }

  document.getElementById("tipsOutput").innerHTML = tipsHTML;

}
