/*
    Loop — the reset layer after Hadronize (Fundamental Particles).
    Unlocked by reaching Fundamental Particles (hadronizing at least once).
    Costs a flat ee10 Fish (never increases). Each Loop multiplies EVERY
    gain by ×3 (based on total Loops), and at 100+ total Loops every gain
    is additionally raised to ^1.1.
*/

const LOOP = {
    cost: E('ee10'), // flat, never increases
    get unlocked() { return player.hadron.times > 0 || player.loop.times > 0 },
    get total() { return player.loop.times },
    get amount() { return player.loop.amount },
    get mult() { return Decimal.pow(3, player.loop.times) },
    get exp() { return player.loop.times >= 100 ? 1.1 : 1 },
}

/** Apply the Loop boost to any gain: ×3 per total Loop, then ^1.1 at 100+ Loops. */
function applyLoopGain(x) {
    x = E(x ?? 0)
    if (player.loop.times <= 0 || x.lte(0)) return x
    x = x.mul(LOOP.mult)
    if (LOOP.exp > 1) x = x.pow(LOOP.exp)
    return x
}

const LOOP_UPGRADES = [
    { name: "Eternal Shark Automation", desc: "Auto-Shark Level and Auto-Shark Upgrades are always automated, even when locked or switched off.", cost: 1, auto: ['shark','su'] },
    { name: "Eternal Prestige & Exploration", desc: "Auto-Prestige Upgrades and Auto-Exploration Upgrades are always automated.", cost: 2, auto: ['spu','eu'] },
    { name: "Eternal Core", desc: "Core Reactor, Core Radiation and Radioactive Boost automations are always automated.", cost: 3, auto: ['core_reactor','core_radiation','radioactive_boosts'] },
    { name: "Eternal Research", desc: "Pre-Black-Hole and Singularity Research automations are always automated.", cost: 5, auto: ['research','sing_research'] },
    { name: "Eternal Mining", desc: "Mining Upgrades, Mining Tier and Mining Ascension automations are always automated.", cost: 8, auto: ['mining_upgs','mining_tier','mining_ascend'] },
    { name: "Eternal Everything Else", desc: "Humanoid Sharks, Remnant Upgrades, Sharkoid Faith, Evolution Tree and Rocket Part automations are always automated.", cost: 12, auto: ['humanoid','remnant','faith','evolution_tree','rocket_part'] },
]

function hasLoopUpgrade(i) { return player.loop.upgs.includes(i) }
function hasLoopAutomation(autoId) { return LOOP_UPGRADES.some((u,i) => hasLoopUpgrade(i) && u.auto.includes(autoId)) }

function buyLoopUpgrade(i) {
    const u = LOOP_UPGRADES[i]
    if (hasLoopUpgrade(i) || player.loop.amount.lt(u.cost)) return
    player.loop.amount = player.loop.amount.sub(u.cost)
    player.loop.upgs.push(i)
}

// Loop is a currency too (spendable amount), so it shows up in the Sandbox resource editor.
CURRENCIES.loop = {
    get require() { return LOOP.cost },
    get amount() { return player.loop.amount },
    set amount(v) { player.loop.amount = v.max(0) },
    get total() { return E(player.loop.times) },
    set total(v) { /* total loops are tracked in player.loop.times */ },
    get gain() { return E(0) },
}

function setupLoopHTML() {
    el('loop-upgrades').innerHTML = LOOP_UPGRADES.map((u,i) => `
        <button class="remnant-upg" id="loop-upg-${i}" onclick="buyLoopUpgrade(${i})">
            <b>${u.name}</b><br>${u.desc}<br><span id="loop-upg-${i}-cost">Cost: ${u.cost} Loop</span>
        </button>`).join("")
}

function updateLoopHTML() {
    el('loop-info').innerHTML = `You have looped <h3>${format(player.loop.times,0)}</h3> time(s) and have <h3>${format(player.loop.amount,0)}</h3> Loop(s) to spend.<br>
    Every gain is multiplied by <b>×${format(LOOP.mult)}</b> (×3 per Loop)${LOOP.exp > 1 ? ` and raised to <b>^${LOOP.exp}</b> (100+ Loops!)` : `.<br>Reach <b>100</b> Loops to also raise every gain to <b>^1.1</b>`}.`
    el('loop-button').innerHTML = LOOP.unlocked
        ? (player.fish.gte(LOOP.cost) ? `Loop! Reset everything Hadronize does (and Fundamental Particles) for +1 Loop.<br>Cost: ${format(LOOP.cost,0)} Fish (never increases)` : `Reach ${format(LOOP.cost,0)} Fish to Loop.`)
        : `Reach Fundamental Particles (Hadronize once) to unlock Looping.`
    el('loop-button').className = el_classes({locked: !LOOP.unlocked || player.fish.lt(LOOP.cost), 'huge-btn': true})
    LOOP_UPGRADES.forEach((u,i) => {
        const b = el('loop-upg-'+i); if (!b) return
        const owned = hasLoopUpgrade(i)
        b.className = el_classes({'remnant-upg': true, bought: owned, locked: !owned && player.loop.amount.lt(u.cost)})
        el('loop-upg-'+i+'-cost').textContent = owned ? 'Owned — always automated!' : `Cost: ${u.cost} Loop`
    })
}
