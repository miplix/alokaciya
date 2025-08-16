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
        "Ancestral sword (mystical)", "Fate Generator (Unique)", "Kingdom (Mystical)",
        "Mirror portal to Shambhala (unique)", "Necklace of Elysium (Mystical)",
        "Transformer of Worlds (mystic)", "Very Mega Super Puper Elite Tangerines (unique)",
        "Milk giraffe (1lv)", "real whale (winner)", "Real Whale (Winner)",
        "Theatronom (unique)", "Universal Soul (unique)", "Yupik Slippers (Unique)",
        "YupLand Pump (Unique)", "1 Еon of Ether - Ancient", "Black Pegasus - Unicorn (unicorn)",
        "Fiery Pegasus - Unicorn (unicorn)", "Fire duvet cover (unique)", "Golden Pegasus - Unicorn (unicorn)"
    ]
};

let cache = {};
let activeTab = 'allocation';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', async () => {
    setupTabs();
    setupSearch();
    await loadAllData();
});

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            if (activeTab === tabName) {
                hideTab(tabName);
                button.classList.remove('active');
                activeTab = null;
            } else {
                showTab(tabName);
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                activeTab = tabName;
            }
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterData();
    });
}

function filterByOwner(data, query) {
    if (!data || !Array.isArray(data)) return data;

    const filtered = data.filter(item => {
        const owner = item.owner || item.owner_id || '';
        return owner.toLowerCase().includes(query);
    });

    return filtered;
}

function filterData() {
    if (!searchQuery) {
        renderData(activeTab, cache[activeTab]);
        return;
    }

    const filteredData = filterByOwner(cache[activeTab], searchQuery);
    renderData(activeTab, filteredData);
    
    // Handle no results message consistently across all tabs
    const noResultsEl = document.querySelector(`#${activeTab} .no-results`);
    if (noResultsEl) {
        if (filteredData.length === 0) {
            noResultsEl.style.display = 'block';
        } else {
            noResultsEl.style.display = 'none';
        }
    }
}

async function loadAllData() {
    const types = ['duplo', 'reputation', 'staking', 'business', 'rare', 'award'];
    
    for (const type of types) {
        await loadData(type);
    }
    
    if (types.every(t => cache[t])) {
        const allocationData = generateAllocationData();
        cache.allocation = allocationData;
        
        const loading = document.querySelector('#allocation .loading');
        if (loading) loading.style.display = 'none';
        
        renderData('allocation', allocationData);
    }
    
    updateLastUpdated();
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const content = document.getElementById(tabName);
    content.classList.add('active');
    
    if (cache[tabName]) {
        renderData(tabName, filterByOwner(cache[tabName], searchQuery));
    }
}

function hideTab(tabName) {
    const content = document.getElementById(tabName);
    content.classList.remove('active');
}

async function loadData(type) {
    if (cache[type]) return;
    
    try {
        const data = await fetchData(type);
        cache[type] = data;
        
        const loading = document.querySelector(`#${type} .loading`);
        if (loading) loading.style.display = 'none';
        
    } catch (error) {
        console.error(`Error loading ${type}:`, error);
    }
}

async function fetchData(type) {
    const response = await fetch(API_ENDPOINTS[type]);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

function renderData(type, data) {
    const container = document.querySelector(`#${type} .data-container`);
    let html = '<table class="data-table">';
    
    switch(type) {
        case 'allocation':
            html += `
                <thead>
                    <tr>
                        <th style="width: 40px;">Ранг</th>
                        <th style="width: 25%;">Владелец</th>
                        <th>Duplo</th>
                        <th>Reput</th>
                        <th>Stake</th>
                        <th>Business</th>
                        <th>Rare</th>
                        <th>Award</th>
                        <th>Matches</th>
                    </tr>
                </thead>
                <tbody>
                    ${(data || []).map((item, i) => `
                        <tr>
                            <td class="rank">#${i + 1}</td>
                            <td class="owner-cell" data-full-address="${item.owner}" title="Click to copy">${truncateAddress(item.owner)}</td>
                            <td>${item.duplo}</td>
                            <td>${item.reputation}</td>
                            <td>${item.staking}</td>
                            <td>${item.business}</td>
                            <td>${item.rare}</td>
                            <td>${item.award}</td>
                            <td>${item.matches}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            break;
            
        case 'duplo':
            const duploData = processDuploData(data);
            html += `
                <thead>
                    <tr>
                        <th style="width: 40px;">Ранг</th>
                        <th style="width: 25%;">Владелец</th>
                        <th>Final Sum</th>
                    </tr>
                </thead>
                <tbody>
                    ${(duploData || []).map((item, i) => `
                        <tr>
                            <td class="rank">#${i + 1}</td>
                            <td class="owner-cell" data-full-address="${item.owner}" title="Click to copy">${truncateAddress(item.owner)}</td>
                            <td>${formatLargeNumber(item.final_sum)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            break;
            
        case 'reputation':
            const repData = processReputationData(data);
            html += `
                <thead>
                    <tr>
                        <th style="width: 40px;">Ранг</th>
                        <th style="width: 25%;">Владелец</th>
                        <th>Репутация</th>
                    </tr>
                </thead>
                <tbody>
                    ${(repData || []).map((item, i) => `
                        <tr>
                            <td class="rank">#${i + 1}</td>
                            <td class="owner-cell" data-full-address="${item.owner}" title="Click to copy">${truncateAddress(item.owner)}</td>
                            <td>${item.total_reputation}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            break;
            
        case 'staking':
            const stakingData = processStakingData(data);
            html += `
                <thead>
                    <tr>
                        <th style="width: 40px;">Ранг</th>
                        <th style="width: 25%;">Владелец</th>
                        <th>Power</th>
                        <th>NFT Count</th>
                    </tr>
                </thead>
                <tbody>
                    ${(stakingData || []).map((item, i) => `
                        <tr>
                            <td class="rank">#${i + 1}</td>
                            <td class="owner-cell" data-full-address="${item.owner_id}" title="Click to copy">${truncateAddress(item.owner_id)}</td>
                            <td>${item.power.toFixed(2)}</td>
                            <td>${item.count}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            break;
            
        case 'business':
            const businessData = processBusinessData(data);
            html += `
                <thead>
                    <tr>
                        <th style="width: 40px;">Ранг</th>
                        <th style="width: 25%;">Владелец</th>
                        <th>Интеллект</th>
                    </tr>
                </thead>
                <tbody>
                    ${(businessData || []).map((item, i) => `
                        <tr>
                            <td class="rank">#${i + 1}</td>
                            <td class="owner-cell" data-full-address="${item.owner}" title="Click to copy">${truncateAddress(item.owner)}</td>
                            <td>+${item.intellect}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            break;

        case 'rare':
            const rareData = processRareData(data);
            html += `
                <thead>
                    <tr>
                        <th style="width: 40px;">Ранг</th>
                        <th style="width: 25%;">Владелец</th>
                        <th>Unique</th>
                        <th>Percent</th>
                    </tr>
                </thead>
                <tbody>
                    ${(rareData || []).map((item, i) => `
                        <tr>
                            <td class="rank">#${i + 1}</td>
                            <td class="owner-cell" data-full-address="${item.owner}" title="Click to copy">${truncateAddress(item.owner)}</td>
                            <td>${item.uniqueCount}</td>
                            <td>${item.percent}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            break;

        case 'award':
            const awardData = processAwardData(data);
            html += `
                <thead>
                    <tr>
                        <th style="width: 40px;">Ранг</th>
                        <th style="width: 25%;">Владелец</th>
                        <th>Award %</th>
                    </tr>
                </thead>
                <tbody>
                    ${(awardData || []).map((item, i) => `
                        <tr>
                            <td class="rank">#${i + 1}</td>
                            <td class="owner-cell" data-full-address="${item.owner}" title="Click to copy">${truncateAddress(item.owner)}</td>
                            <td>${item.awardPercent}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            break;
    }
    
    html += '</table>';
    container.innerHTML = html;
    
    // Add click handlers for copy functionality
    container.querySelectorAll('.owner-cell').forEach(cell => {
        cell.addEventListener('click', (e) => {
            const fullAddress = e.target.dataset.fullAddress;
            navigator.clipboard.writeText(fullAddress).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = 'copied!';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1000);
            });
        });
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

function formatLargeNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(3) + ' трлн';
    if (num >= 1e9) return (num / 1e9).toFixed(3) + ' млрд';
    if (num >= 1e6) return (num / 1e6).toFixed(3) + ' млн';
    return num.toFixed(2);
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
        'Honorary Designer',
        'Honorary yupik - culture of giving',
        'Support Reward',
        'CEO Ring',
        'Supporting AI research',
        'For improving the economy'
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

function generateAllocationData() {
    const types = ['duplo', 'reputation', 'staking', 'business', 'rare', 'award'];
    
    const duploOwners = new Set();
    const duploData = processDuploData(cache.duplo);
    duploData.forEach((item, i) => {
        if (i < CONFIG.TOP_LIMIT) duploOwners.add(item.owner);
    });
    
    const reputationData = processReputationData(cache.reputation);
    const reputationOwners = new Set(reputationData.map(item => item.owner));
    
    const stakingData = processStakingData(cache.staking);
    const stakingOwners = new Set();
    stakingData.forEach(item => {
        if (item.count > 10) {
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
        const duplo = duploOwners.has(owner) ? '✅' : '';
        const reputation = reputationOwners.has(owner) ? '✅' : '';
        const staking = stakingOwners.has(owner) ? '✅' : '';
        const business = businessOwners.has(owner) ? '✅' : '';
        const rare = rareMap.get(owner) || '0%';
        const award = awardMap.get(owner) || '0%';
        
        const matches = [duplo, reputation, staking, business].filter(v => v === '✅').length;
        
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

async function refreshAllData() {
    cache = {};
    await loadAllData();
    updateLastUpdated();
}

function updateLastUpdated() {
    const now = new Date().toLocaleString('ru-RU');
    document.getElementById('last-updated').textContent = now;
}

function truncateAddress(address) {
    if (!address || address.length <= 12) return address;
    return address.substring(0, 8) + '...' + address.slice(-4);
}

setInterval(() => {
    refreshAllData();
}, 5 * 60 * 1000);