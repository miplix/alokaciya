const API_ENDPOINTS = {
    duplo: 'https://api.sendler.xyz/nft/duplo-chart/',
    reputation: 'https://api.sendler.xyz/reputation',
    staking: 'https://api.sendler.xyz/nft/?contract_address=darai.mintbase1.near',
    business: 'https://api.sendler.xyz/nft/?contract_address=yuplandshop.mintbase1.near&title=Shop%20Owner',
    rare: 'https://api.sendler.xyz/nft/?contract_address=yuplandshop.mintbase1.near',
    award: 'https://api.sendler.xyz/nft/?contract_address=yuplandshop.mintbase1.near'
};

const CONFIG = {
    TOP_LIMIT: 100,
    BLACKLIST_ADDRESSES: [
        "0000000000000000000000000000000000000000000000000000000000000000",
        "darai_nft.near", "darai_ng.near", "darai_collection.near",
        "a.mitte-orderbook.near", "widget.near",
        "alchemistshop.near", "darai_team.near", "sofiya_562-hot.tg",
        "yupileya.near", "darai_yupalka.near", "intents.near", "feed_yupiks.near"
    ],
    TITLE_BLACKLIST: [
        'egg', 'passport', 'Yupik - Chiter', 'Chest', 'Press',
        'тест', 'boost', 'mystical',
        'Ellie (0th generation - Ancient)', 'Phi-So (0th generation - Ancient)'
    ],
    POWER_VALUES: {
        '(0': 100, '(1': 50, '(2': 25, '(3': 12.5, '(4': 6.25,
        'legendary': 3.125, 'epic': 1.5625, 'rare': 0.78125,
        'uncommon': 0.390625, '(common)': 0.1953125
    },
    RARE_NFT_TITLES: [
"Ancestral sword (mystical)",
"Fate Generator (Unique)",
"Kingdom (Mystical)",
"Necklace of Elysium (Mystical)",
"Transformer of Worlds (mystic)",
"Very Mega Super Puper Elite Tangerines (unique)",
"Milk giraffe (1lv) ",
"real whale (winner)",
"Real Whale (Winner) ",
"Theatronom (unique)",
"Universal Soul (unique)",
"Universal Soul (unique) ",
"Yupik Slippers (Unique)",
"YupLand Pump (Unique) ",
"1 Еon of Ether - Ancient ",
"1 Eon of Ether - Ancient",
"2nd Eon of Ether - Ancient",
"3rd Eon of Ether - Ancient",
"4th Eon of Earth - The Ancient",
"5th Eon of Ether - Ancient",
"6th Eon of Ether - Ancient",
"7th Eon of Ether - Ancient",
"7th Eon of Ether - The Ancient One",
"Black Pegasus - Unicorn (unicorn)",
"Fiery Pegasus - Unicorn (unicorn) ",
"Fire duvet cover (unique)",
"Golden Pegasus - Unicorn (unicorn) ",
"Honorary handshake (legendary) ",
"Key to Shambhala (Unique)",
"Milk giraffe (1lv)",
"Purple Pegasus - Unicorn (unicorn) ",
"Scroll of the Mage (Unique)",
"Snow Pegasus - Unicorn (unicorn) ",
"Space - Unicorn (unicorn) ",
"Upper Upland Pass (Elite)",
"Victory unicorn (unicorn)",
"White Pegasus - Unicorn (unicorn) ",
"YupLand Pump (Legendary)",
"Magic brush (unique)",
"Swap Table (Unique)",
"Yupik Slippers (legendary)",
"100 pairs of slippers (common)",
"Card Set (Legendary)",
"Designer Worlds (unique)",
"Door to Dreams (Epic)",
"Magic Mantle (Unique)",
"Moth Skeleton (Epic)",
"Teapot - Genie Generator (rare)",
"Yupidrasil Tree Dew (Unique)",
"Yupik gem",
"Yupik Slippers (Epic)",
"Подводные очки (Легендарные)",
"Clock - Eons (Legendary)",
"Diploma of Strategic Magician",
"Lots of balalaikas (useless)",
"Magic Pot (legendary)",
"Mountain (unique)",
"Pug toy (unique)",
"Universal egg (legendary)",
"Yupik Slippers (Rare)",
"Подъемник курса (Эпический)",
"Great Yupik Happiness (Priceless) ",
"Lord's Bed (Epic)",
"Magic brush (legendary)",
"Pump power (epic)",
"Huge Stone (Epic)",
"Magician's Set (Unique)",
"Morpheus Chair (Epic)",
"Pug Kennel (legendary)",
"Pump magic (uncommon)",
"Reflector - solar stars (epic)",
"Unicorn Factory (Legendary)",
"Levitation Goggles (Legendary)",
"5 метровый шкаф (необычный)",
"Генератор волн (обычный)",
"Ядро Атлантиды (Редкое)",
"Book - Yupik Imagination (Rare)",
"Buckwheat assembly (Legendary)",
"Fair Dice (Rare) ",
"Fog Generator (Unique) ",
"Lamp (legendary)",
"Lantern (legendary)",
"Pug Bone (Epic)",
"Speech synthesizer (epic)",
"World Generator (Rare)",
"Yupik Happiness (Priceless) ",
"Levitation Goggles (Epic)",
"Stool (uncommon)",
"Цветок Атлантиды (необычный)",
"Air Purity Meter (Epic)",
"Door to Sherlock's house (Rare)",
"Lamp (Epic)",
"Lantern (Epic)",
"Larger Stone (Rare)",
"Magic brush (epic)",
"The most unusual carpet (legendary)",
"Treat Bowl (Rare)",
"Book - solution to conspiracies (common) ",
"Диван в форме дупла (редкий)",
"Art school diploma",
"Bed with a hollow (Epic)",
"Duvet cover Magic (legendary) ",
"Lamp (rare)",
"Lantern (rare)",
"Levitation Goggles (Rare)",
"Sphere - Reason (uncommon)",
"Yup'ik Carpet (Rare)",
"Yup'ik Chair (Rare) ",
"Yupik barrier (rare)",
" 0A:@KBK9 10;0AB - 3C@",
"Раскрытый баласт - 3ур",
"Lantern (Uncommon)",
"Levitation Goggles (Uncommon)",
"Magic brush (rare)",
"Talking Bed (uncommon)",
"Table - Chestnut Generator (Rare)",
"Arcanum Integra (clan) ",
"Artifact Dragon Tooth Stormfang (clan)",
"Artifact with the Ixdivite crystal (clan)",
"Astrolabes of the ancients (clan)",
"Certificate of unknown level",
"Duvet cover Magic (comon) ",
"Heritage of the Sun (clan)",
"Kailani and Buckwheat (clan)",
"Lantern (Common)",
"Laughter Meter (clan) ",
"Levitation Goggles (Common)",
"Magic brush (uncommon)",
"Magic light stone (clan)",
"Magic light stone (clan) ",
"Neuron Manas (clan) ",
"Pandora's Box (clan) ",
"Precious Fire Lantern (Clan)",
"Reviver - grecha (uncommon)",
"Ring of Power (clan)",
"Sphere - Mind (common)",
"Sphere - Mind (Normal)",
"Sphere - Reason (common)",
"The Deep water of Atlantis (clan)",
"Yup'ik Chips (rare)",
"YupElf hat (clan)",
"Безумная Греча Кайлани (обычная)",
"Buckwheat (rare)",
"Duvet cover Magic (uncommon)",
"Grecha grinder (rare)",
"Magic brush (common)",
"Деревянная ложка (бесполезная)",
"Зелёный человек (Нужна защита)",
"Chair with egg stand (unique)",
"Glarungs (100 water)",
"Hollow Key (Legendary)",
"House for the Glarungs (common) ",
"Magic Slingshot (unique)",
"Super Dupla generator +50% (epic)",
"ticket to buy glarungs",
"Ticket to buy Glarungs ",
"Yupik Egg (legendary) "
    ]
};

let cache = {};
let isValidating = false;
let allocationData = [];

document.addEventListener('DOMContentLoaded', async () => {
    showLoadingPopup();
    await loadAllData();
    hideLoadingPopup();
    setupSearch();
});

function showLoadingPopup() {
    document.getElementById('loading-popup').style.display = 'flex';
}

function hideLoadingPopup() {
    document.getElementById('loading-popup').style.display = 'none';
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchHint = document.getElementById('search-hint');
    
    searchInput.addEventListener('input', (e) => {
        const address = e.target.value.trim().toLowerCase();
        
        if (!address) {
            searchHint.textContent = 'Введите корректный адрес';
            searchHint.style.color = 'var(--text-muted)';
            hideResult();
            return;
        }
        
        if (!isValidAddress(address)) {
            searchHint.textContent = 'введите корректный адрес';
            searchHint.style.color = '#ff6b6b';
            hideResult();
            return;
        }
        
        searchHint.textContent = '';
        checkAllocation(address);
    });
}

function isValidAddress(address) {
    return address.length === 64 || address.includes('.near') || address.includes('.tg');
}

async function loadAllData() {
    const types = ['duplo', 'reputation', 'staking', 'business', 'rare', 'award'];
    
    for (const type of types) {
        await loadData(type);
    }
    
    allocationData = await generateAllocationData();
}

async function loadData(type) {
    if (cache[type]) return;
    
    try {
        const data = await fetchData(type);
        cache[type] = data;
    } catch (error) {
        console.error(`Error loading ${type}:`, error);
    }
}

async function fetchData(type) {
    const response = await fetch(API_ENDPOINTS[type]);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

async function checkAllocation(address) {
    if (isValidating) return;
    
    isValidating = true;
    
    const exactMatch = allocationData.find(item => item.owner.toLowerCase() === address);
    
    if (exactMatch) {
        showResult(exactMatch);
    } else {
        showNoAllocation();
    }
    
    isValidating = false;
}

function toggleMatches() {
    const content = document.getElementById('matches-content');
    const arrow = document.getElementById('dropdown-arrow');
    
    content.classList.toggle('hidden');
    arrow.classList.toggle('open');
}

function calculateChance(data) {
    let points = 0;
    
    // Points for checks
    if (data.reputation) points += 2;
    if (data.duplo) points += 1;
    if (data.business) points += 1;
    if (data.staking) points += 1;
    
    // Points for rare NFTs
    const rarePercent = parseFloat(data.rare);
    if (rarePercent >= 70) points += 10;
    else if (rarePercent >= 50) points += 6;
    else if (rarePercent >= 40) points += 5;
    else if (rarePercent >= 20) points += 4;
    else if (rarePercent >= 15) points += 3;
    else if (rarePercent >= 10) points += 2;
    else if (rarePercent > 0) points += 1;
    
    // Points for award NFTs
    const awardPercent = parseFloat(data.award);
    if (awardPercent >= 80) points += 6;
    else if (awardPercent >= 60) points += 4;
    else if (awardPercent >= 40) points += 3;
    else if (awardPercent >= 20) points += 2;
    else if (awardPercent > 0) points += 1;
    
    // Exception rule for reputation
    if (points === 2 && data.reputation) {
        return { text: 'средний', class: 'medium', points: 3 };
    }
    
    // Map points to chance levels
    const chanceMap = {
        0: { text: 'очень низкий', class: 'very-low' },
        1: { text: 'низкий', class: 'low' },
        2: { text: 'ниже среднего', class: 'below-medium' },
        3: { text: 'средний', class: 'medium' },
        6: { text: 'высокий', class: 'high' },
        10: { text: 'очень высокий', class: 'very-high' },
        14: { text: 'платина', class: 'platinum' }
    };
    
    // Find the highest matching points
    const sortedPoints = Object.keys(chanceMap)
        .map(Number)
        .sort((a, b) => b - a)
        .find(p => p <= points);
    
    return chanceMap[sortedPoints] || chanceMap[0];
}

async function generateAllocationData() {
    const types = ['duplo', 'reputation', 'staking', 'business', 'rare', 'award'];
    
    const duploData = processDuploData(cache.duplo);
    const duploOwners = new Set(duploData.map(item => item.owner));
    
    const reputationData = processReputationData(cache.reputation);
    const reputationOwners = new Set(reputationData.map(item => item.owner));
    
    const stakingData = processStakingData(cache.staking);
    const stakingOwners = new Set();
    stakingData.forEach(item => {
        if (item.count > 9) {
            stakingOwners.add(item.owner_id);
        }
    });
    
    const businessData = processBusinessData(cache.business);
    const businessOwners = new Set(businessData.map(item => item.owner));

    const rareData = processRareData(cache.rare);
    const rareMap = new Map(rareData.map(item => [item.owner, item.percent]));

    const awardData = processAwardData(cache.award);
    const awardMap = new Map(awardData.map(item => [item.owner, item.awardPercent]));

    const allOwners = new Set([
        ...duploOwners,
        ...reputationOwners,
        ...stakingOwners,
        ...businessOwners,
        ...rareMap.keys(),
        ...awardMap.keys()
    ]);
    
    const allocationData = [];
    
    for (const owner of allOwners) {
        const duplo = duploOwners.has(owner);
        const reputation = reputationOwners.has(owner);
        const staking = stakingOwners.has(owner);
        const business = businessOwners.has(owner);
        
        const matches = [duplo, reputation, staking, business].filter(v => v).length;
        const rare = rareMap.get(owner) || '0%';
        const award = awardMap.get(owner) || '0%';
        
        allocationData.push({
            owner,
            duplo,
            reputation,
            staking,
            business,
            rare,
            award,
            matches
        });
    }
    
    return allocationData.sort((a, b) => {
        if (b.matches !== a.matches) return b.matches - a.matches;
        if (b.rare !== a.rare) return parseFloat(b.rare) - parseFloat(a.rare);
        return parseFloat(b.award) - parseFloat(a.award);
    });
}

function processDuploData(data) {
    if (!data?.owners_data) return [];
    
    return Object.entries(data.owners_data)
        .map(([owner, info]) => ({
            owner,
            final_sum: parseFloat(info.final_sum) || 0
        }))
        .sort((a, b) => b.final_sum - a.final_sum)
        .slice(0, CONFIG.TOP_LIMIT);
}

function processReputationData(data) {
    if (!Array.isArray(data?.reputation_records)) return [];
    
    return data.reputation_records
        .filter(rec => typeof rec.owner_rank === 'number' && rec.owner_rank >= 1 && rec.owner_rank <= CONFIG.TOP_LIMIT)
        .sort((a, b) => a.owner_rank - b.owner_rank)
        .map(rec => ({
            owner: rec.owner,
            total_reputation: rec.total_reputation
        }));
}

function processStakingData(data) {
    if (!Array.isArray(data?.nfts)) return [];
    
    const filtered = data.nfts.filter(nft => {
        if (CONFIG.BLACKLIST_ADDRESSES.includes(nft.owner_id)) return false;
        const title = nft.metadata?.title?.toLowerCase() || '';
        return !CONFIG.TITLE_BLACKLIST.some(badWord => title.includes(badWord.toLowerCase()));
    }).map(nft => {
        const titleLower = nft.metadata?.title?.toLowerCase() || '';
        let power = 0;
        for (const [key, value] of Object.entries(CONFIG.POWER_VALUES)) {
            if (titleLower.includes(key)) {
                power = value;
                break;
            }
        }
        return {
            owner_id: nft.owner_id,
            title: nft.metadata?.title || '',
            power
        };
    });

    const grouped = {};
    filtered.forEach(item => {
        if (!grouped[item.owner_id]) {
            grouped[item.owner_id] = { power: 0, count: 0 };
        }
        grouped[item.owner_id].power += item.power;
        grouped[item.owner_id].count += 1;
    });

    return Object.entries(grouped)
        .map(([owner_id, data]) => ({ owner_id, ...data }))
        .sort((a, b) => b.power - a.power);
}

function processBusinessData(data) {
    if (!Array.isArray(data?.nfts)) return [];
    
    const grouped = {};
    data.nfts.forEach(nft => {
        if (!nft.owner_id || !nft.metadata || !nft.metadata.title) return;
        const owner = nft.owner_id;
        const match = nft.metadata.title.match(/([+-]?\d+(\.\d+)?)/);
        const intellect = match ? parseFloat(match[1]) : 0;
        if (intellect > 0) {
            if (!grouped[owner]) grouped[owner] = 0;
            grouped[owner] += intellect;
        }
    });

    return Object.entries(grouped)
        .map(([owner, intellect]) => ({ owner, intellect }))
        .filter(r => r.intellect > 0)
        .sort((a, b) => b.intellect - a.intellect);
}

function processRareData(data) {
    if (!Array.isArray(data?.nfts)) return [];

    const filtered = data.nfts.filter(nft => {
        const title = nft.metadata?.title || '';
        return CONFIG.RARE_NFT_TITLES.includes(title);
    });

    const ownerMap = {};
    filtered.forEach(nft => {
        const owner = nft.owner_id;
        const title = nft.metadata?.title || '';
        if (!ownerMap[owner]) ownerMap[owner] = new Set();
        ownerMap[owner].add(title);
    });

    const totalUnique = CONFIG.RARE_NFT_TITLES.length;
    let result = [];
    for (let owner in ownerMap) {
        const uniqueCount = ownerMap[owner].size;
        const percent = ((uniqueCount / totalUnique) * 100).toFixed(1) + '%';
        result.push({ owner, uniqueCount, percent });
    }

    return result.sort((a, b) => b.uniqueCount - a.uniqueCount);
}

function processAwardData(data) {
    if (!Array.isArray(data?.nfts)) return [];

    const awardNFTs = data.nfts.filter(nft =>
        nft.nft_contract_id === 'yuplandshop.mintbase1.near'
    );

    const AWARD_GROUPS = [
        'Honorary Designer', 'Patron', 'Honorary yupik - culture of giving', 'Support Reward',
        'CEO Ring', 'Supporting AI research', 'For improving the economy'
    ];

    let ownerGroups = {};
    awardNFTs.forEach(nft => {
        const owner = nft.owner_id;
        const title = (nft.metadata?.title || '').toLowerCase();

        if (!ownerGroups[owner]) {
            ownerGroups[owner] = new Set();
        }

        AWARD_GROUPS.forEach(groupName => {
            if (title.includes(groupName.toLowerCase())) {
                ownerGroups[owner].add(groupName);
            }
        });
    });

    let filteredOwners = Object.entries(ownerGroups)
        .filter(([_, groups]) => groups.size > 0)
        .map(([owner, groups]) => {
            const groupCount = groups.size;
            const percent = ((groupCount / AWARD_GROUPS.length) * 100).toFixed(0) + '%';
            return { owner, awardPercent: percent };
        });

    return filteredOwners.sort((a, b) => {
        const aNum = parseFloat(a.awardPercent);
        const bNum = parseFloat(b.awardPercent);
        if (bNum !== aNum) return bNum - aNum;
        return a.owner.localeCompare(b.owner);
    });
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('no-allocation').classList.add('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

function showResult(data) {
    document.getElementById('result-address').textContent = data.owner;
    document.getElementById('matches-count').textContent = data.matches;
    
    document.getElementById('duplo-status').textContent = data.duplo ? '✅' : '❌';
    document.getElementById('reputation-status').textContent = data.reputation ? '✅' : '❌';
    document.getElementById('staking-status').textContent = data.staking ? '✅' : '❌';
    document.getElementById('business-status').textContent = data.business ? '✅' : '❌';
    
    document.getElementById('rare-percent').textContent = data.rare;
    document.getElementById('award-percent').textContent = data.award;
    
    const chance = calculateChance(data);
    const chanceElement = document.getElementById('chance-value');
    chanceElement.textContent = chance.text;
    chanceElement.className = `chance-value ${chance.class}`;
    
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('no-allocation').classList.add('hidden');
}

function showNoAllocation() {
    document.getElementById('no-allocation').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
}

function hideResult() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('no-allocation').classList.add('hidden');
}

// Make toggleMatches globally available for onclick
window.toggleMatches = toggleMatches;
