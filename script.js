const fields = [
  "name", "job", "email", "phone", "location", "linkedin",
  "summary", "degree", "college", "year", "grade",
  "skills", "projectName", "projects",
  "experienceTitle", "experience", "certifications"
];

const $ = id => document.getElementById(id);

function value(id) {
  return $(id).value.trim();
}

function setText(id, text, fallback = "") {
  $(id).textContent = text || fallback;
}

function showSection(id, visible) {
  $(id).style.display = visible ? "block" : "none";
}

function updateResume() {
  setText("outName", value("name"), "Your Name");
  setText("outJob", value("job"), "Your Career Goal");

  const contacts = [
    value("email"),
    value("phone"),
    value("location"),
    value("linkedin")
  ].filter(Boolean);

  setText(
    "outContact",
    contacts.join("  |  "),
    "Add your contact information"
  );

  setText(
    "outSummary",
    value("summary"),
    "Your professional summary will appear here."
  );

  setText("outDegree", value("degree"), "Your degree");
  setText("outCollege", value("college"), "Your college or university");

  const educationMeta = [
    value("year"),
    value("grade")
  ].filter(Boolean);

  setText("outEducationMeta", educationMeta.join(" | "));

  const skills = value("skills")
    .split(/[,;\n]/)
    .map(skill => skill.trim())
    .filter(Boolean);

  $("outSkills").replaceChildren();

  if (skills.length) {
    skills.forEach(skill => {
      const tag = document.createElement("span");
      tag.textContent = skill;
      $("outSkills").appendChild(tag);
    });
  } else {
    const tag = document.createElement("span");
    tag.textContent = "Your skills";
    $("outSkills").appendChild(tag);
  }

  setText("outProjectName", value("projectName"), "Your project");
  setText(
    "outProjects",
    value("projects"),
    "Describe your project here."
  );

  setText("outExperienceTitle", value("experienceTitle"));
  setText("outExperience", value("experience"));
  setText("outCertifications", value("certifications"));

  showSection("summarySection", Boolean(value("summary")));
  showSection(
    "educationSection",
    Boolean(value("degree") || value("college") ||
      value("year") || value("grade"))
  );
  showSection("skillsSection", Boolean(value("skills")));
  showSection(
    "projectsSection",
    Boolean(value("projectName") || value("projects"))
  );
  showSection(
    "experienceSection",
    Boolean(value("experienceTitle") || value("experience"))
  );
  showSection("certificationsSection", Boolean(value("certifications")));

  updateRecommendations();
}

function updateRecommendations() {
  const tips = [];

  if (!value("name")) {
    tips.push([
      "Add your name",
      "Start with your full name so recruiters can identify you."
    ]);
  }

  if (!value("email")) {
    tips.push([
      "Add your email",
      "Use a professional email address that you check regularly."
    ]);
  }

  if (!value("job")) {
    tips.push([
      "Choose a career goal",
      "Mention a role that matches the job or internship you want."
    ]);
  }

  if (!value("summary")) {
    tips.push([
      "Write a short summary",
      "Introduce your education, key skills, and career interests in 2–4 sentences."
    ]);
  } else if (value("summary").length < 60) {
    tips.push([
      "Improve your summary",
      "Add more detail about your skills, interests, and relevant experience."
    ]);
  } else if (value("summary").length > 500) {
    tips.push([
      "Shorten your summary",
      "Keep it focused on your strongest, most relevant qualifications."
    ]);
  }

  const skills = value("skills")
    .split(/[,;\n]/)
    .map(s => s.trim())
    .filter(Boolean);

  if (skills.length < 3) {
    tips.push([
      "Add relevant skills",
      "List 3–8 skills you can demonstrate, such as C, Python, teamwork, or circuit design."
    ]);
  } else if (skills.length > 12) {
    tips.push([
      "Organize your skills",
      "Keep the most relevant skills and group similar ones together."
    ]);
  }

  if (!value("degree") || !value("college")) {
    tips.push([
      "Complete your education",
      "Include your degree, institution, and expected graduation year."
    ]);
  }

  if (!value("projectName") || !value("projects")) {
    tips.push([
      "Show a project",
      "Students can use a college project. Explain the problem, tools used, your contribution, and result."
    ]);
  } else if (value("projects").length < 50) {
    tips.push([
      "Describe your project better",
      "Explain what you built, which technologies you used, and what you learned."
    ]);
  }

  if (!value("experienceTitle") && !value("experience")) {
    tips.push([
      "No work experience? That's okay!",
      "Add academic projects, volunteering, competitions, or relevant coursework instead."
    ]);
  }

  if (!value("certifications")) {
    tips.push([
      "Add certifications (optional)",
      "Include relevant courses, workshops, awards, or achievements you have actually completed."
    ]);
  }

  if (value("phone") && !/^[+\d][\d\s()-]{6,}$/.test(value("phone"))) {
    tips.push([
      "Check your phone number",
      "Make sure your contact number is entered correctly."
    ]);
  }

  if (tips.length === 0) {
    tips.push([
      "Great progress!",
      "Review spelling, verify every detail, and tailor your resume to the job description."
    ]);
  }

  const list = $("recommendationList");
  list.replaceChildren();

  tips.forEach(([title, message]) => {
    const item = document.createElement("div");
    item.className = "tip";

    const heading = document.createElement("strong");
    heading.textContent = "✦ " + title;

    const description = document.createElement("p");
    description.textContent = message;

    item.append(heading, description);
    list.appendChild(item);
  });
}

// Update the preview whenever a field changes.
fields.forEach(id => {
  $(id).addEventListener("input", updateResume);
});

// Change the resume design.
$("template").addEventListener("change", function () {
  $("resume").className = "resume " + this.value;
});

// Fill in example details so users can test the website.
$("sampleBtn").addEventListener("click", function () {
  const sample = {
    name: "Aarav Sharma",
    job: "Electronics Engineering Student",
    email: "aarav.example@email.com",
    phone: "+91 98765 43210",
    location: "Kolkata, India",
    linkedin: "",
    summary:
      "Electronics engineering student interested in embedded systems, programming, and circuit design. Enjoys solving technical problems and building practical projects.",
    degree: "B.Tech in Electronics Engineering",
    college: "Example Institute of Technology",
    year: "Expected Graduation: 2029",
    grade: "",
    skills: "C, Python, Arduino, HTML, CSS, Teamwork",
    projectName: "Smart Distance Meter",
    projects:
      "Built a distance measurement prototype using Arduino Uno and an ultrasonic sensor. Connected the components and tested distance readings to understand embedded systems.",
    experienceTitle: "",
    experience: "",
    certifications:
      "Add relevant completed courses, workshops, or achievements here."
  };

  fields.forEach(id => {
    $(id).value = sample[id] || "";
  });

  updateResume();
});

// Clear all form fields.
$("clearBtn").addEventListener("click", function () {
  const confirmed = confirm("Clear all your resume details?");

  if (!confirmed) return;

  fields.forEach(id => {
    $(id).value = "";
  });

  updateResume();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Open the browser's print dialog to save the resume as PDF.
$("downloadBtn").addEventListener("click", function () {
  if (!value("name")) {
    alert("Please enter your name before downloading your resume.");
    $("name").focus();
    return;
  }

  window.print();
});

// Initial page setup.
updateResume();
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const outPhoto = document.getElementById("outPhoto");
const removePhotoBtn = document.getElementById("removePhotoBtn");

let currentPhotoURL = "";

photoInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Please upload a JPG, PNG, or WebP image.");
    this.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Your photo must be smaller than 5 MB.");
    this.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    currentPhotoURL = event.target.result;

    photoPreview.src = currentPhotoURL;
    outPhoto.src = currentPhotoURL;

    photoPreview.hidden = false;
    outPhoto.hidden = false;
  };

  reader.onerror = function () {
    alert("Unable to read this photo. Please try another image.");
  };

  reader.readAsDataURL(file);
});

removePhotoBtn.addEventListener("click", function () {
  photoInput.value = "";
  currentPhotoURL = "";

  photoPreview.removeAttribute("src");
  outPhoto.removeAttribute("src");

  photoPreview.hidden = true;
  outPhoto.hidden = true;
});