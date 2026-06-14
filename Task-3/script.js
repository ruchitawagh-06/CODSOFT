const genreSelect = document.querySelector("#genre");
const languageSelect = document.querySelector("#language");
const moodSelect = document.querySelector("#mood");
const eraSelect = document.querySelector("#era");
const ratingInput = document.querySelector("#rating");
const ratingValue = document.querySelector("#ratingValue");
const chipGrid = document.querySelector("#chipGrid");
const recommendButton = document.querySelector("#recommendButton");
const searchInput = document.querySelector("#search");
const recommendations = document.querySelector("#recommendations");
const matchScore = document.querySelector("#matchScore");
const movieCount = document.querySelector("#movieCount");
const shownCount = document.querySelector("#shownCount");

const wikiPosterTitles = {
    "Baahubali: The Beginning": "Baahubali: The Beginning",
    "City of God": "City of God (2002 film)",
    "Coco": "Coco (2017 film)",
    "Crouching Tiger, Hidden Dragon": "Crouching Tiger, Hidden Dragon",
    "Dune": "Dune (2021 film)",
    "Drishyam": "Drishyam (2013 film)",
    "Roma": "Roma (2018 film)",
    "The Godfather": "The Godfather",
    "The Intouchables": "The Intouchables",
    "The Raid": "The Raid (2011 film)",
    "Train to Busan": "Train to Busan",
    "Vikram": "Vikram (2022 film)",
};

const posterCache = new Map();

const movies = [
    {
        title: "Sholay",
        language: "Hindi",
        country: "India",
        genre: "action",
        mood: "exciting",
        rating: 8.1,
        year: 1975,
        tags: ["classic", "friendship", "revenge", "bollywood"],
        summary: "A legendary Indian action adventure with friendship, drama, and unforgettable characters.",
        poster: "linear-gradient(135deg, #b91c1c, #f59e0b)",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Dilwale Dulhania Le Jayenge",
        language: "Hindi",
        country: "India",
        genre: "romance",
        mood: "romantic",
        rating: 8.0,
        year: 1995,
        tags: ["classic", "family", "love", "bollywood"],
        summary: "A beloved romantic film about love, tradition, and family.",
        poster: "linear-gradient(135deg, #be123c, #fb7185)",
        image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "3 Idiots",
        language: "Hindi",
        country: "India",
        genre: "comedy",
        mood: "fun",
        rating: 8.4,
        year: 2009,
        tags: ["college", "friendship", "inspiring", "family"],
        summary: "A funny and emotional story about learning, pressure, and following passion.",
        poster: "linear-gradient(135deg, #16a34a, #facc15)",
        image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Dangal",
        language: "Hindi",
        country: "India",
        genre: "drama",
        mood: "emotional",
        rating: 8.3,
        year: 2016,
        tags: ["sports", "family", "inspiring", "award"],
        summary: "A powerful sports drama about discipline, family, and ambition.",
        poster: "linear-gradient(135deg, #92400e, #f97316)",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Hellaro",
        language: "Gujarati",
        country: "India",
        genre: "drama",
        mood: "emotional",
        rating: 8.6,
        year: 2019,
        tags: ["regional", "folk", "award", "dance"],
        summary: "A visually rich Gujarati drama about expression, courage, and tradition.",
        poster: "linear-gradient(135deg, #dc2626, #fbbf24)",
        image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Chhello Divas",
        language: "Gujarati",
        country: "India",
        genre: "comedy",
        mood: "fun",
        rating: 7.9,
        year: 2015,
        tags: ["regional", "college", "friendship", "youth"],
        summary: "A light Gujarati college comedy filled with friendship and youthful chaos.",
        poster: "linear-gradient(135deg, #2563eb, #f59e0b)",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Kantara",
        language: "Kannada",
        country: "India",
        genre: "thriller",
        mood: "mysterious",
        rating: 8.2,
        year: 2022,
        tags: ["regional", "folk", "action", "new"],
        summary: "A rooted Indian thriller mixing folklore, action, and spiritual mystery.",
        poster: "linear-gradient(135deg, #451a03, #ca8a04)",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Baahubali: The Beginning",
        language: "Telugu",
        country: "India",
        genre: "action",
        mood: "exciting",
        rating: 8.0,
        year: 2015,
        tags: ["epic", "war", "regional", "adventure"],
        summary: "A grand action epic with kingdoms, battles, and heroic scale.",
        poster: "linear-gradient(135deg, #1d4ed8, #7c2d12)",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "RRR",
        language: "Telugu",
        country: "India",
        genre: "action",
        mood: "exciting",
        rating: 7.8,
        year: 2022,
        tags: ["new", "friendship", "epic", "award"],
        summary: "A high-energy historical action spectacle about courage and friendship.",
        poster: "linear-gradient(135deg, #991b1b, #1d4ed8)",
        image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Nayakan",
        language: "Tamil",
        country: "India",
        genre: "drama",
        mood: "thoughtful",
        rating: 8.7,
        year: 1987,
        tags: ["classic", "crime", "regional", "award"],
        summary: "A landmark Tamil crime drama about power, survival, and morality.",
        poster: "linear-gradient(135deg, #111827, #6b7280)",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Vikram",
        language: "Tamil",
        country: "India",
        genre: "action",
        mood: "exciting",
        rating: 8.3,
        year: 2022,
        tags: ["new", "crime", "regional", "thriller"],
        summary: "A slick action thriller with layered missions and stylish set pieces.",
        poster: "linear-gradient(135deg, #0f172a, #dc2626)",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Drishyam",
        language: "Malayalam",
        country: "India",
        genre: "thriller",
        mood: "mysterious",
        rating: 8.3,
        year: 2013,
        tags: ["regional", "family", "crime", "suspense"],
        summary: "A gripping family thriller built around a clever cover-up.",
        poster: "linear-gradient(135deg, #14532d, #0f172a)",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Pather Panchali",
        language: "Bengali",
        country: "India",
        genre: "drama",
        mood: "thoughtful",
        rating: 8.2,
        year: 1955,
        tags: ["classic", "award", "realistic", "regional"],
        summary: "A poetic Bengali classic about childhood, poverty, and human dignity.",
        poster: "linear-gradient(135deg, #334155, #f8fafc)",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Sairat",
        language: "Marathi",
        country: "India",
        genre: "romance",
        mood: "emotional",
        rating: 8.3,
        year: 2016,
        tags: ["regional", "love", "social", "new"],
        summary: "A Marathi romance with beauty, intensity, and social conflict.",
        poster: "linear-gradient(135deg, #1d4ed8, #f97316)",
        image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "The Godfather",
        language: "English",
        country: "USA",
        genre: "drama",
        mood: "thoughtful",
        rating: 9.2,
        year: 1972,
        tags: ["classic", "crime", "family", "award"],
        summary: "A classic crime drama about family, loyalty, and power.",
        poster: "linear-gradient(135deg, #020617, #7f1d1d)",
        image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Interstellar",
        language: "English",
        country: "USA",
        genre: "sci-fi",
        mood: "thoughtful",
        rating: 8.7,
        year: 2014,
        tags: ["space", "science", "emotional", "modern"],
        summary: "A grand space journey with emotion, science, and survival at its center.",
        poster: "linear-gradient(135deg, #0f172a, #2563eb)",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Top Gun: Maverick",
        language: "English",
        country: "USA",
        genre: "action",
        mood: "exciting",
        rating: 8.2,
        year: 2022,
        tags: ["new", "flying", "action", "adventure"],
        summary: "A high-energy action film built around skill, speed, and teamwork.",
        poster: "linear-gradient(135deg, #1e3a8a, #f97316)",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Parasite",
        language: "Korean",
        country: "South Korea",
        genre: "thriller",
        mood: "mysterious",
        rating: 8.5,
        year: 2019,
        tags: ["award", "social", "dark", "new"],
        summary: "A sharp Korean thriller about class, deception, and survival.",
        poster: "linear-gradient(135deg, #111827, #16a34a)",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Train to Busan",
        language: "Korean",
        country: "South Korea",
        genre: "thriller",
        mood: "exciting",
        rating: 7.6,
        year: 2016,
        tags: ["new", "zombie", "survival", "emotional"],
        summary: "A tense survival thriller set on a speeding train.",
        poster: "linear-gradient(135deg, #7f1d1d, #1f2937)",
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Spirited Away",
        language: "Japanese",
        country: "Japan",
        genre: "animation",
        mood: "emotional",
        rating: 8.6,
        year: 2001,
        tags: ["award", "fantasy", "family", "classic"],
        summary: "A magical animated journey through a strange spirit world.",
        poster: "linear-gradient(135deg, #0e7490, #f9a8d4)",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Seven Samurai",
        language: "Japanese",
        country: "Japan",
        genre: "action",
        mood: "thoughtful",
        rating: 8.6,
        year: 1954,
        tags: ["classic", "samurai", "war", "global"],
        summary: "A legendary action drama about warriors defending a village.",
        poster: "linear-gradient(135deg, #111827, #9ca3af)",
        image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Roma",
        language: "Spanish",
        country: "Mexico",
        genre: "drama",
        mood: "thoughtful",
        rating: 7.7,
        year: 2018,
        tags: ["award", "family", "realistic", "new"],
        summary: "A graceful drama about memory, class, and family life.",
        poster: "linear-gradient(135deg, #4b5563, #e5e7eb)",
        image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Pan's Labyrinth",
        language: "Spanish",
        country: "Spain",
        genre: "fantasy",
        mood: "mysterious",
        rating: 8.2,
        year: 2006,
        tags: ["dark", "fantasy", "award", "modern"],
        summary: "A haunting fantasy tale blending imagination and historical darkness.",
        poster: "linear-gradient(135deg, #1f2937, #854d0e)",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Amelie",
        language: "French",
        country: "France",
        genre: "romance",
        mood: "fun",
        rating: 8.3,
        year: 2001,
        tags: ["romantic", "stylish", "classic", "feel-good"],
        summary: "A charming French romance filled with whimsy and visual style.",
        poster: "linear-gradient(135deg, #166534, #dc2626)",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "The Intouchables",
        language: "French",
        country: "France",
        genre: "comedy",
        mood: "emotional",
        rating: 8.5,
        year: 2011,
        tags: ["friendship", "feel-good", "modern", "drama"],
        summary: "A warm comedy-drama about friendship across different worlds.",
        poster: "linear-gradient(135deg, #0f172a, #38bdf8)",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "City of God",
        language: "Portuguese",
        country: "Brazil",
        genre: "drama",
        mood: "exciting",
        rating: 8.6,
        year: 2002,
        tags: ["crime", "modern", "global", "intense"],
        summary: "A fast, intense Brazilian crime drama about life in Rio.",
        poster: "linear-gradient(135deg, #f97316, #111827)",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Crouching Tiger, Hidden Dragon",
        language: "Mandarin",
        country: "China",
        genre: "action",
        mood: "emotional",
        rating: 7.9,
        year: 2000,
        tags: ["martial arts", "romance", "award", "classic"],
        summary: "A graceful martial-arts epic with romance and poetic action.",
        poster: "linear-gradient(135deg, #14532d, #eab308)",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "A Separation",
        language: "Persian",
        country: "Iran",
        genre: "drama",
        mood: "thoughtful",
        rating: 8.3,
        year: 2011,
        tags: ["award", "family", "realistic", "modern"],
        summary: "A layered drama about family, truth, and difficult choices.",
        poster: "linear-gradient(135deg, #475569, #0f172a)",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "The Raid",
        language: "Indonesian",
        country: "Indonesia",
        genre: "action",
        mood: "exciting",
        rating: 7.6,
        year: 2011,
        tags: ["martial arts", "intense", "modern", "thriller"],
        summary: "A relentless action thriller packed with close-quarters combat.",
        poster: "linear-gradient(135deg, #7f1d1d, #111827)",
        image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=900&q=80",
    },
    {
        title: "Capernaum",
        language: "Arabic",
        country: "Lebanon",
        genre: "drama",
        mood: "emotional",
        rating: 8.4,
        year: 2018,
        tags: ["award", "realistic", "new", "social"],
        summary: "A moving drama about childhood, survival, and injustice.",
        poster: "linear-gradient(135deg, #92400e, #1e293b)",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
    },
];

let selectedChip = "balanced";

function getEra(movie) {
    if (movie.year < 2000) {
        return "classic";
    }

    if (movie.year <= 2016) {
        return "modern";
    }

    return "new";
}

function scoreMovie(movie) {
    let score = 35;

    if (genreSelect.value === "any" || movie.genre === genreSelect.value) {
        score += genreSelect.value === "any" ? 6 : 22;
    }

    if (languageSelect.value === "any" || movie.language === languageSelect.value) {
        score += languageSelect.value === "any" ? 6 : 24;
    }

    if (moodSelect.value === "any" || movie.mood === moodSelect.value) {
        score += moodSelect.value === "any" ? 5 : 18;
    }

    if (eraSelect.value === "any" || getEra(movie) === eraSelect.value) {
        score += eraSelect.value === "any" ? 4 : 14;
    }

    score += Math.max(0, (movie.rating - Number(ratingInput.value)) * 7);

    if (selectedChip === "family" && movie.tags.includes("family")) {
        score += 16;
    }

    if (selectedChip === "classic" && movie.tags.includes("classic")) {
        score += 16;
    }

    if (selectedChip === "new" && getEra(movie) === "new") {
        score += 16;
    }

    if (selectedChip === "award" && movie.tags.includes("award")) {
        score += 16;
    }

    if (selectedChip === "regional" && movie.tags.includes("regional")) {
        score += 16;
    }

    if (selectedChip === "balanced") {
        score += 8;
    }

    return Math.min(Math.round(score), 99);
}

function getReason(movie, score) {
    const reasons = [];

    if (genreSelect.value !== "any" && movie.genre === genreSelect.value) {
        reasons.push(`matches ${movie.genre}`);
    }

    if (languageSelect.value !== "any" && movie.language === languageSelect.value) {
        reasons.push(`is in ${movie.language}`);
    }

    if (moodSelect.value !== "any" && movie.mood === moodSelect.value) {
        reasons.push(`fits a ${movie.mood} mood`);
    }

    if (eraSelect.value !== "any" && getEra(movie) === eraSelect.value) {
        reasons.push(`belongs to the ${eraSelect.options[eraSelect.selectedIndex].text} era`);
    }

    if (movie.rating >= Number(ratingInput.value)) {
        reasons.push(`clears ${ratingInput.value}+ rating`);
    }

    if (selectedChip !== "balanced" && movie.tags.includes(selectedChip)) {
        reasons.push(`matches the ${selectedChip} quick pick`);
    }

    if (!reasons.length) {
        reasons.push("has a strong overall profile for your current settings");
    }

    return `${score}% match because it ${reasons.join(", ")}.`;
}

function renderRecommendations() {
    const query = searchInput.value.trim().toLowerCase();
    const minRating = Number(ratingInput.value);
    const ranked = movies
        .filter((movie) => movie.rating >= minRating)
        .filter((movie) => {
            const searchText = [
                movie.title,
                movie.language,
                movie.country,
                movie.genre,
                movie.mood,
                ...movie.tags,
            ].join(" ").toLowerCase();
            return searchText.includes(query);
        })
        .map((movie) => ({
            ...movie,
            score: scoreMovie(movie),
        }))
        .sort((a, b) => b.score - a.score || b.rating - a.rating)
        .slice(0, 9);

    recommendations.innerHTML = "";
    shownCount.textContent = ranked.length;
    matchScore.textContent = ranked.length ? `${ranked[0].score}%` : "0%";

    if (!ranked.length) {
        recommendations.innerHTML = '<div class="empty-state">No movies match these filters. Try another language, lower the rating, or search a broader tag.</div>';
        return;
    }

    ranked.forEach((movie, index) => {
        const card = document.createElement("article");
        card.className = "movie-card";
        card.style.animationDelay = `${index * 60}ms`;
        card.style.setProperty("--poster-bg", movie.poster);
        card.innerHTML = `
            <div class="poster">
                <img src="${movie.image}" alt="${movie.title} visual" loading="lazy">
                <span>${movie.language} | ${movie.country}</span>
            </div>
            <div class="movie-body">
                <header>
                    <div>
                        <h3>${movie.title}</h3>
                        <p class="movie-meta">${movie.year} | ${movie.genre} | Rating ${movie.rating}</p>
                    </div>
                    <span class="match-pill">${movie.score}%</span>
                </header>
                <p>${movie.summary}</p>
                <p class="reason">${getReason(movie, movie.score)}</p>
                <div class="tag-row">
                    ${movie.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
            </div>
        `;
        recommendations.appendChild(card);
        loadOfficialPoster(movie, card.querySelector("img"));
    });
}

async function loadOfficialPoster(movie, imageElement) {
    const wikiTitle = wikiPosterTitles[movie.title] || movie.title;

    if (posterCache.has(wikiTitle)) {
        imageElement.src = posterCache.get(wikiTitle) || movie.image;
        imageElement.alt = `${movie.title} official poster`;
        return;
    }

    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`);

        if (!response.ok) {
            throw new Error("Poster lookup failed");
        }

        const data = await response.json();
        const posterUrl = data.thumbnail?.source || data.originalimage?.source || "";
        posterCache.set(wikiTitle, posterUrl);

        if (posterUrl) {
            imageElement.src = posterUrl;
            imageElement.alt = `${movie.title} official poster`;
            imageElement.classList.add("official-poster");
        }
    } catch {
        posterCache.set(wikiTitle, "");
    }
}

function setChip(chip) {
    selectedChip = chip;
    chipGrid.querySelectorAll(".chip").forEach((button) => {
        button.classList.toggle("active", button.dataset.chip === chip);
    });
    renderRecommendations();
}

ratingInput.addEventListener("input", () => {
    ratingValue.textContent = `${ratingInput.value}+`;
    renderRecommendations();
});

[genreSelect, languageSelect, moodSelect, eraSelect, searchInput].forEach((input) => {
    input.addEventListener("input", renderRecommendations);
});

chipGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chip]");

    if (button) {
        setChip(button.dataset.chip);
    }
});

recommendButton.addEventListener("click", renderRecommendations);

movieCount.textContent = movies.length;
renderRecommendations();
