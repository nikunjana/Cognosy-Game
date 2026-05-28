const pharmacognosyBank = [
    { drug: "Aloe", source: "Aloe barbadensis", chemical: "Aloin" },
    { drug: "Senna", source: "Cassia angustifolia", chemical: "Sennosides" },
    { drug: "Digitalis", source: "Digitalis purpurea", chemical: "Digitoxin" },
    { drug: "Cinchona", source: "Cinchona officinalis", chemical: "Quinine" },
    { drug: "Opium", source: "Papaver somniferum", chemical: "Morphine" },
    { drug: "Belladonna", source: "Atropa belladonna", chemical: "Atropine" },
    { drug: "Ergot", source: "Claviceps purpurea", chemical: "Ergotamine" },
    { drug: "Rauwolfia", source: "Rauwolfia serpentina", chemical: "Reserpine" },
    { drug: "Vinca", source: "Catharanthus roseus", chemical: "Vincristine" },
    { drug: "Nux vomica", source: "Strychnos nux-vomica", chemical: "Strychnine" },
    { drug: "Clove", source: "Eugenia caryophyllus", chemical: "Eugenol" },
    { drug: "Cinnamon", source: "Cinnamomum zeylanicum", chemical: "Cinnamaldehyde" },
    { drug: "Fennel", source: "Foeniculum vulgare", chemical: "Anethole" },
    { drug: "Coriander", source: "Coriandrum sativum", chemical: "Linalool" },
    { drug: "Cardamom", source: "Elettaria cardamomum", chemical: "Cineole" },
    { drug: "Ginger", source: "Zingiber officinale", chemical: "Gingerol" },
    { drug: "Turmeric", source: "Curcuma longa", chemical: "Curcumin" },
    { drug: "Liquorice", source: "Glycyrrhiza glabra", chemical: "Glycyrrhizin" },
    { drug: "Ginseng", source: "Panax ginseng", chemical: "Ginsenosides" },
    { drug: "Ashwagandha", source: "Withania somnifera", chemical: "Withanolides" },
    { drug: "Ephedra", source: "Ephedra sinica", chemical: "Ephedrine" },
    { drug: "Colchicum", source: "Colchicum autumnale", chemical: "Colchicine" },
    { drug: "Ipecacuanha", source: "Cephaelis ipecacuanha", chemical: "Emetine" },
    { drug: "Jalap", source: "Ipomoea purga", chemical: "Convolvulin" },
    { drug: "Rhubarb", source: "Rheum palmatum", chemical: "Rhein" },
    { drug: "Cascara", source: "Rhamnus purshiana", chemical: "Cascarosides" },
    { drug: "Isapgol", source: "Plantago ovata", chemical: "Mucilage" },
    { drug: "Senega", source: "Polygala senega", chemical: "Senegins" },
    { drug: "Quassia", source: "Picrasma excelsa", chemical: "Quassin" },
    { drug: "Guggul", source: "Commiphora mukul", chemical: "Guggulsterones" },
    { drug: "Coca", source: "Erythroxylum coca", chemical: "Cocaine" },
    { drug: "Tea", source: "Camellia sinensis", chemical: "Caffeine" },
    { drug: "Coffee", source: "Coffea arabica", chemical: "Caffeine" },
    { drug: "Cocoa", source: "Theobroma cacao", chemical: "Theobromine" },
    { drug: "Datura", source: "Datura stramonium", chemical: "Hyoscyamine" },
    { drug: "Hyoscyamus", source: "Hyoscyamus niger", chemical: "Hyoscyamine" },
    { drug: "Strophanthus", source: "Strophanthus kombe", chemical: "K-Strophanthin" },
    { drug: "Squill", source: "Urginea maritima", chemical: "Scillaren A" },
    { drug: "Dioscorea", source: "Dioscorea deltoidea", chemical: "Diosgenin" },
    { drug: "Vasaka", source: "Adhatoda vasica", chemical: "Vasicine" },
    { drug: "Tulsi", source: "Ocimum sanctum", chemical: "Eugenol" },
    { drug: "Neem", source: "Azadirachta indica", chemical: "Azadirachtin" },
    { drug: "Aconite", source: "Aconitum napellus", chemical: "Aconitine" },
    { drug: "Kurchi", source: "Holarrhena antidysenterica", chemical: "Conessine" },
    { drug: "Podophyllum", source: "Podophyllum hexandrum", chemical: "Podophyllotoxin" },
    { drug: "Peppermint", source: "Mentha piperita", chemical: "Menthol" },
    { drug: "Eucalyptus", source: "Eucalyptus globulus", chemical: "Eucalyptol" },
    { drug: "Nutmeg", source: "Myristica fragrans", chemical: "Myristicin" },
    { drug: "Garlic", source: "Allium sativum", chemical: "Allicin" },
    { drug: "Camphor", source: "Cinnamomum camphora", chemical: "Camphor" }
];

const TRIPLETS_PER_GAME = 10;
let currentTiles = [];
let selectedTiles = [];
let matchesFound = 0;
let isAnimating = false;

// Score and Timer variables
let score = 0;
let streak = 0;
let multiplier = 1;
let startTime = 0;
let timerInterval = null;
let timeElapsed = 0;

const gameBoard = document.getElementById('game-board');
const matchesCountEl = document.getElementById('matches-count');
const scoreCountEl = document.getElementById('score-count');
const scoreMultiplierEl = document.getElementById('score-multiplier');
const timerEl = document.getElementById('timer');
const victoryScreen = document.getElementById('victory-screen');
const restartBtn = document.getElementById('restart-btn');
const finalScoreEl = document.getElementById('final-score');
const finalTimeEl = document.getElementById('final-time');
const startScreen = document.getElementById('start-screen');
const usernameInput = document.getElementById('username-input');
const startGameBtn = document.getElementById('start-game-btn');
const playerNameEl = document.getElementById('player-name');
const leaderboardListEl = document.getElementById('leaderboard-list');
const leaderboardRefreshInfoEl = document.getElementById('leaderboard-refresh-info');

const LEADERBOARD_KEY = 'pharmacognosyMahjongLeaderboard';
const LEADERBOARD_REFRESH_KEY = 'pharmacognosyMahjongLeaderboardLastRefresh';
const LEADERBOARD_TTL_MS = 60 * 60 * 1000; // 1 hour
let leaderboardTimer = null;
let currentUsername = '';

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function initGame() {
    // Reset stats
    matchesFound = 0;
    score = 0;
    streak = 0;
    multiplier = 1;
    selectedTiles = [];
    isAnimating = false;
    timeElapsed = 0;
    
    // Timer reset
    if (timerInterval) clearInterval(timerInterval);
    timerEl.textContent = "00:00";
    
    updateStats();
    
    // Hide victory screen
    victoryScreen.classList.add('hidden');
    gameBoard.innerHTML = '';

    // Randomly select 10 triplets
    const shuffledBank = [...pharmacognosyBank].sort(() => 0.5 - Math.random());
    const selectedGroups = shuffledBank.slice(0, TRIPLETS_PER_GAME);

    // Create tiles (drug, source, chemical)
    currentTiles = [];
    selectedGroups.forEach((group, index) => {
        currentTiles.push({ id: `drug-${index}`, groupId: index, type: 'drug', text: group.drug });
        currentTiles.push({ id: `source-${index}`, groupId: index, type: 'source', text: group.source });
        currentTiles.push({ id: `chemical-${index}`, groupId: index, type: 'chemical', text: group.chemical });
    });

    // Shuffle the tiles
    currentTiles.sort(() => 0.5 - Math.random());

    // Render tiles
    currentTiles.forEach(tileData => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.id = tileData.id;
        tile.dataset.groupId = tileData.groupId;
        
        const content = document.createElement('span');
        content.className = 'tile-content';
        content.textContent = tileData.text;
        
        tile.appendChild(content);
        tile.addEventListener('click', () => handleTileClick(tile));
        gameBoard.appendChild(tile);
    });

    // Start timer
    startTime = Date.now();
    timerInterval = setInterval(() => {
        timeElapsed = Math.floor((Date.now() - startTime) / 1000);
        timerEl.textContent = formatTime(timeElapsed);
    }, 1000);
}

function handleTileClick(tile) {
    if (isAnimating || tile.classList.contains('matched') || tile.classList.contains('selected')) {
        return;
    }

    tile.classList.add('selected');
    selectedTiles.push(tile);

    if (selectedTiles.length === 3) {
        isAnimating = true;
        
        const g1 = selectedTiles[0].dataset.groupId;
        const g2 = selectedTiles[1].dataset.groupId;
        const g3 = selectedTiles[2].dataset.groupId;

        if (g1 === g2 && g2 === g3) {
            // Match found
            matchesFound++;
            streak++;
            multiplier = streak;
            score += 100 * multiplier;
            updateStats();
            
            selectedTiles.forEach(t => {
                t.classList.remove('selected');
                t.classList.add('matched');
            });

            setTimeout(() => {
                selectedTiles.forEach(t => t.remove());
                checkWinCondition();
                isAnimating = false;
                selectedTiles = [];
            }, 600);
            
        } else {
            // Mismatch
            streak = 0;
            multiplier = 1;
            score = Math.max(0, score - 25); // Deduct 25 points, don't go below zero
            updateStats();
            
            selectedTiles.forEach(t => {
                t.classList.add('mismatched');
            });

            setTimeout(() => {
                selectedTiles.forEach(t => {
                    t.classList.remove('selected', 'mismatched');
                });
                selectedTiles = [];
                isAnimating = false;
            }, 500);
        }
    }
}

function updateStats() {
    matchesCountEl.textContent = `${matchesFound} / ${TRIPLETS_PER_GAME}`;
    scoreCountEl.textContent = score;
    
    if (multiplier > 1) {
        scoreMultiplierEl.textContent = `x${multiplier}`;
        scoreMultiplierEl.classList.add('active');
        
        // Remove and re-add class to trigger animation again
        scoreMultiplierEl.classList.remove('pulse-multi');
        void scoreMultiplierEl.offsetWidth; // trigger reflow
        scoreMultiplierEl.classList.add('pulse-multi');
    } else {
        scoreMultiplierEl.classList.remove('active', 'pulse-multi');
    }
}

function checkWinCondition() {
    if (matchesFound === TRIPLETS_PER_GAME) {
        clearInterval(timerInterval);
        
        // Time bonus: if finished in less than 5 minutes (300s), add bonus points
        if (timeElapsed < 300) {
            const timeBonus = (300 - timeElapsed) * 10;
            score += timeBonus;
        }
        
        finalScoreEl.textContent = score;
        finalTimeEl.textContent = formatTime(timeElapsed);
        victoryScreen.classList.remove('hidden');
        
        addLeaderboardEntry({
            username: currentUsername || 'Anonymous',
            score,
            time: timeElapsed,
            date: new Date().toISOString()
        });
        refreshLeaderboardDisplay();
    }
}

function loadLeaderboardData() {
    try {
        const raw = localStorage.getItem(LEADERBOARD_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

function saveLeaderboardData(entries) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

function addLeaderboardEntry(entry) {
    const entries = loadLeaderboardData();
    entries.push(entry);
    entries.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
    });
    saveLeaderboardData(entries.slice(0, 10));
}

function formatLeaderboardEntry(entry, index) {
    const date = new Date(entry.date);
    return `#${index + 1} ${entry.username} — ${entry.score} pts (${formatTime(entry.time)})`;
}

function refreshLeaderboardDisplay() {
    const entries = loadLeaderboardData();
    leaderboardListEl.innerHTML = '';

    if (entries.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.textContent = 'No scores yet. Finish a game to populate the leaderboard.';
        leaderboardListEl.appendChild(emptyItem);
    } else {
        entries.forEach((entry, index) => {
            const item = document.createElement('li');
            item.textContent = formatLeaderboardEntry(entry, index);
            leaderboardListEl.appendChild(item);
        });
    }

    const lastRefresh = Number(localStorage.getItem(LEADERBOARD_REFRESH_KEY)) || Date.now();
    const refreshDate = new Date(lastRefresh);
    leaderboardRefreshInfoEl.textContent = `Last refreshed: ${refreshDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function setLeaderboardAutoRefresh() {
    if (leaderboardTimer) clearInterval(leaderboardTimer);
    leaderboardTimer = setInterval(() => {
        localStorage.setItem(LEADERBOARD_REFRESH_KEY, Date.now());
        refreshLeaderboardDisplay();
    }, LEADERBOARD_TTL_MS);
}

function ensureLeaderboardFresh() {
    const lastRefresh = Number(localStorage.getItem(LEADERBOARD_REFRESH_KEY)) || 0;
    if (Date.now() - lastRefresh >= LEADERBOARD_TTL_MS) {
        localStorage.setItem(LEADERBOARD_REFRESH_KEY, Date.now());
    }
    refreshLeaderboardDisplay();
}

function startGame() {
    const username = usernameInput.value.trim();
    if (!username) {
        usernameInput.classList.add('input-error');
        setTimeout(() => usernameInput.classList.remove('input-error'), 400);
        return;
    }

    currentUsername = username;
    playerNameEl.textContent = currentUsername;
    startScreen.classList.add('hidden');
    initGame();
}

restartBtn.addEventListener('click', initGame);
startGameBtn.addEventListener('click', startGame);
usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startGame();
    }
});

ensureLeaderboardFresh();
setLeaderboardAutoRefresh();
