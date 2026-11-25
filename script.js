let userBalance = 0.00;

const gameNames = Array.from({length: 200}, (_, i) => i === 0 ? "Aviator" : i === 1 ? "JetX" : i === 2 ? "Chicken Road" : i === 3 ? "Keno" : `Game ${i + 1}`);

const sportLeagues = [
    "⚽ Armenia. Premier League", 
    "🏀 Israel. Super League", 
    "🎾 WTA 250. Chennai. Hard. India", 
    "⚽ English Premier League", 
    "⚽ Spanish La Liga"
];

// 100 completely unique teams across 50 matches
const uniqueTeams = [
    "FC Van", "Pyunik", "Hapoel Holon", "Hapoel Galil Elyon",
    "Ararat-Armenia", "Noah FC", "Maccabi Tel Aviv", "Hapoel Jerusalem",
    "Arsenal", "Chelsea", "Real Madrid", "Barcelona",
    "Alashkert", "Shirak SC", "Ironi Nes Ziona", "Bnei Herzliya",
    "Liverpool", "Manchester City", "Atletico Madrid", "Sevilla",
    "BKMA Yerevan", "Urartu FC", "Maccabi Haifa", "Hapoel Beer Sheva",
    "Tottenham Hotspur", "Newcastle United", "Real Betis", "Villarreal",
    "West Ham United", "Aston Villa", "Real Sociedad", "Athletic Bilbao",
    "Brighton & Hove", "Fulham FC", "Valencia CF", "Celta Vigo",
    "Brentford FC", "Crystal Palace", "Getafe CF", "Osasuna",
    "Wolverhampton", "Everton FC", "Girona FC", "Mallorca",
    "Nottingham Forest", "Bournemouth", "Las Palmas", "Alaves",
    "Leicester City", "Ipswich Town", "Espanyol", "Rayo Vallecano",
    "Southampton FC", "Luton Town", "Cadiz CF", "Granada CF",
    "Burnley FC", "Sheffield United", "Almeria UD", "Valladolid",
    "Stoke City", "Coventry City", "Levante UD", "Eibar SD",
    "Norwich City", "Middlesbrough", "Sporting Gijon", "Zaragoza",
    "Watford FC", "Swansea City", "Burgos CF", "Tenerife CD",
    "Bristol City", "Millwall FC", "Oviedo FC", "Racing Santander",
    "QPR FC", "Preston North End", "Elche CF", "Cartagena FC",
    "Hull City", "Sunderland AFC", "Malaga CF", "Cordoba CF",
    "Plymouth Argyle", "Cardiff City", "Huesca SD", "Mirandes CD",
    "Derby County", "Portsmouth FC", "Albacete BP", "Leganes CD",
    "Oxford United", "Charlton Athletic", "Castellon CD", "Deportivo La Coruna"
];

const sportMatches = Array.from({length: 50}, (_, i) => {
    let league = sportLeagues[i % sportLeagues.length];
    let team1 = uniqueTeams[i * 2];
    let team2 = uniqueTeams[i * 2 + 1];
    return {
        id: i + 1,
        league: league,
        team1: team1,
        team2: team2,
        score1: Math.floor(Math.random() * 3),
        score2: Math.floor(Math.random() * 3),
        w1: (1.5 + Math.random() * 5).toFixed(2),
        x: (3.0 + Math.random() * 2).toFixed(2),
        w2: (1.2 + Math.random() * 2).toFixed(2)
    };
});

window.onload = function() {
    loadGames();
    loadSports();
    loadScrollingGames();
    startBannerSlider();
};

function loadGames() {
    const grid = document.getElementById('gamesGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    gameNames.forEach((name, index) => {
        let imgIdx = (index % 20) + 1;
        let card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => openGame(name);
        card.innerHTML = `
            <img src="game${imgIdx}.jpg" alt="${name}" onerror="this.src='game1.jpg'">
            <p>${name}</p>
        `;
        grid.appendChild(card);
    });
}

function loadSports() {
    const grid = document.getElementById('sportsGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    sportMatches.forEach((match) => {
        let card = document.createElement('div');
        card.className = 'sport-match-card';
        card.innerHTML = `
            <div class="match-top-row">
                <div class="match-league">${match.league}</div>
                <span class="match-live-tag">LIVE #${match.id}</span>
            </div>
            <div class="match-teams-row">
                <div class="team-side"><span>${match.team1}</span></div>
                <div class="score-pill">${match.score1} - ${match.score2}</div>
                <div class="team-side away"><span>${match.team2}</span></div>
            </div>
            <div class="match-odds-grid">
            <div class="odd-box" onclick="openGame('${match.team1} vs ${match.team2}')">
                    <span>W1</span>
                    <strong>${match.w1}</strong>
                </div>
                <div class="odd-box" onclick="openGame('${match.team1} vs ${match.team2}')">
                    <span>X</span>
                    <strong>${match.x}</strong>
                </div>
                <div class="odd-box" onclick="openGame('${match.team1} vs ${match.team2}')">
                    <span>W2</span>
                    <strong>${match.w2}</strong>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 10 Circular Games
function loadScrollingGames() {
    const scrollBar = document.getElementById('scrollingGames');
    if(!scrollBar) return;
    scrollBar.innerHTML = '';
    for(let i = 0; i < 10; i++) {
        let item = document.createElement('div');
        item.className = 'scroll-item';
        item.onclick = () => openGame(gameNames[i]);
        item.innerHTML = `
            <img src="game${i+1}.jpg" alt="${gameNames[i]}" onerror="this.src='game1.jpg'">
            <p>${gameNames[i]}</p>
        `;
        scrollBar.appendChild(item);
    }
}

// Auto-moving Main Hero Slider
let currentSlide = 0;
function startBannerSlider() {
    const slides = document.querySelectorAll('.banner-slider .slide');
    if(slides.length === 0) return;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3500);
}

function openGame(gameName) {
    document.getElementById('activeGameTitle').innerText = gameName;
    document.getElementById('gameMessage').innerText = "please confirm a deposit!";
    openModal('gameModal');
}

function filterGames() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        let title = card.querySelector('p').innerText.toLowerCase();
        card.style.display = title.includes(input) ? 'block' : 'none';
    });
}

function goToMainPage() {
    switchTab('sportTab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-section'));
    document.querySelectorAll('.bottom-nav-bar button').forEach(btn => btn.classList.remove('active-tab'));
    
    let topFiveSec = document.getElementById('topFiveSection');
    let bannerSec = document.getElementById('mainBannerSection');
    let miniHeroSec = document.getElementById('miniHeroSection');
    let scrollSec = document.getElementById('mainScrollSection');
    let searchSec = document.getElementById('searchSection');
    
    if(tabId === 'depositTab' || tabId === 'promotionTab') {
        if(topFiveSec) topFiveSec.style.display = 'none';
        if(bannerSec) bannerSec.style.display = 'none';
        if(miniHeroSec) miniHeroSec.style.display = 'none';
        if(scrollSec) scrollSec.style.display = 'none';
        if(searchSec) searchSec.style.display = 'none';
    } else {
        if(topFiveSec) topFiveSec.style.display = 'grid';
        if(bannerSec) bannerSec.style.display = 'block';
        if(miniHeroSec) miniHeroSec.style.display = 'flex';
        if(scrollSec) scrollSec.style.display = 'block';
        if(searchSec) searchSec.style.display = 'block';
    }

    document.getElementById(tabId).classList.add('active-section');
    
    if(tabId === 'sportTab') document.getElementById('tabBtnSport').classList.add('active-tab');
    if(tabId === 'gamesTab') document.getElementById('tabBtnGames').classList.add('active-tab');
    if(tabId === 'promotionTab') document.getElementById('tabBtnPromotion').classList.add('active-tab');
    if(tabId === 'depositTab') document.getElementById('tabBtnDeposit').classList.add('active-tab');
    if(tabId === 'kenoTab') document.getElementById('tabBtnKeno').classList.add('active-tab');
}
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function toggleProfileMenu() {
    let menu = document.getElementById('profileDropdown');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function registerUser() {
    let phone = document.getElementById('regPhone').value.trim();
    if(!phone) { alert("Please enter mobile number"); return; }
    closeModal('registerModal');
    loginSuccess(phone);
    switchTab('depositTab');
}

function loginUser() {
    let phone = document.getElementById('loginPhone').value.trim();
    if(!phone) { alert("Please enter mobile number"); return; }
    closeModal('loginModal');
    loginSuccess(phone);
}

function loginSuccess(phone) {
    document.getElementById('navButtons').style.display = 'none';
    document.getElementById('userPanel').style.display = 'flex';
    userBalance = 0.00;
    updateBalanceDisplay();
}

function logout() {
    document.getElementById('navButtons').style.display = 'flex';
    document.getElementById('userPanel').style.display = 'none';
    document.getElementById('profileDropdown').style.display = 'none';
    userBalance = 0.00;
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    document.getElementById('userBalance').innerText = userBalance.toFixed(2);
}

function copyPhone() {
    navigator.clipboard.writeText("0997791266");
    alert("Phone number copied: 0997791266");
}

function submitDepositStep() {
    let amt = parseFloat(document.getElementById('depositAmountInput').value);
    let sms = document.getElementById('smsInput').value.trim();

    if(!amt || amt < 500) {
        alert("ቢያንስ 500 ETB ያስገቡ · Minimum deposit is 500 ETB");
        return;
    }

    if(!sms) {
        alert("SMS ወይም Transaction ID ያስገቡ · Please paste your SMS or Transaction ID");
        return;
    }

    document.getElementById('waitingMsg').style.display = 'block';
}

function requestWithdraw() {
    let amt = parseFloat(document.getElementById('withdrawAmount').value) || 0;
    
    if(amt <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    if(amt > userBalance || userBalance <= 0) {
        alert("please confirm a deposit!");
        return;
    }

    userBalance -= amt;
    updateBalanceDisplay();
    alert("Withdrawal request sent via Telebirr (Agent: 0997791266)");
    closeModal('withdrawModal');
}

function openSupport() {
    window.open("https://t.me/0997791266", "_blank");
}