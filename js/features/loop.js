/*
    Loop — the reset layer after Hadronize (Fundamental Particles).
    Unlocked by reaching Fundamental Particles (hadronizing at least once).
    Costs a flat ee10 Fish (never increases). Each Loop multiplies EVERY
    gain by ×3 (based on total Loops), and at 100+ total Loops every gain
    is additionally raised to ^1.1.

    All access goes through the coercion helpers below (loopTimes /
    loopAmount / loopUpgs / normalizeLoopPlayer) so that a missing,
    null, string, Decimal or otherwise malformed `player.loop` — e.g.
    from an imported save, the Sandbox raw editor, or an older save —
    can never throw inside the per-frame game loop and freeze the game.
*/

function loopTimes() {
    try {
        const t = E(player.loop?.times ?? 0)
        if (isNaN(t.mag)) return 0
        return Math.max(0, Math.min(1e6, Math.floor(t.toNumber())))
    } catch { return 0 }
}
function loopAmount() {
    try {
        const a = E(player.loop?.amount ?? 0)
        return isNaN(a.mag) ? E(0) : a.max(0)
    } catch { return E(0) }
}
function loopUpgs() {
    const u = player.loop?.upgs
    if (!Array.isArray(u)) return []
    return u.filter(i => Number.isInteger(i) && i >= 0 && i < LOOP_UPGRADES.length)
}
/** Repair player.loop in place so every other system can trust its shape. */
function normalizeLoopPlayer() {
    if (!player.loop || typeof player.loop != 'object') player.loop = {amount: E(0), times: 0, upgs: []}
    player.loop.times = loopTimes()
    player.loop.amount = loopAmount()
    player.loop.upgs = loopUpgs()
    return player.loop
}

const LOOP = {
    cost: E('ee10'), // flat, never increases
    get unlocked() { return (player.hadron?.times ?? 0) > 0 || loopTimes() > 0 },
    get canLoop() { return this.unlocked && !tmp.bh_pause && player.fish.gte(this.cost) },
    get total() { return loopTimes() },
    get amount() { return loopAmount() },
    get mult() { return Decimal.pow(3, loopTimes()) },
    get exp() { return loopTimes() >= 100 ? 1.1 : 1 },
}

/** Apply the Loop boost to any gain: ×3 per total Loop, then ^1.1 at 100+ Loops. Never returns NaN. */
function applyLoopGain(x) {
    try { x = E(x ?? 0) } catch { return E(0) }
    if (isNaN(x.mag)) return E(0)
    const times = loopTimes()
    if (times <= 0 || x.lte(0)) return x
    try {
        x = x.mul(LOOP.mult)
        if (LOOP.exp > 1) x = x.pow(LOOP.exp)
        return isNaN(x.mag) ? E(0) : x
    } catch { return E(0) }
}

const LOOP_UPGRADES = [
    { name: "Eternal Shark Automation", desc: "Auto-Shark Level and Auto-Shark Upgrades are always automated, even when locked or switched off.", cost: 1, auto: ['shark','su'] },
    { name: "Eternal Prestige & Exploration", desc: "Auto-Prestige Upgrades and Auto-Exploration Upgrades are always automated.", cost: 2, auto: ['spu','eu'] },
    { name: "Eternal Core", desc: "Core Reactor, Core Radiation and Radioactive Boost automations are always automated.", cost: 3, auto: ['core_reactor','core_radiation','radioactive_boosts'] },
    { name: "Eternal Research", desc: "Pre-Black-Hole and Singularity Research automations are always automated.", cost: 5, auto: ['research','sing_research'] },
    { name: "Eternal Mining", desc: "Mining Upgrades, Mining Tier and Mining Ascension automations are always automated.", cost: 8, auto: ['mining_upgs','mining_tier','mining_ascend'] },
    { name: "Eternal Everything Else", desc: "Humanoid Sharks, Remnant Upgrades, Sharkoid Faith, Evolution Tree and Rocket Part automations are always automated.", cost: 12, auto: ['humanoid','remnant','faith','evolution_tree','rocket_part'] },
]

function hasLoopUpgrade(i) { return loopUpgs().includes(i) }
function hasLoopAutomation(autoId) { return LOOP_UPGRADES.some((u,i) => hasLoopUpgrade(i) && u.auto.includes(autoId)) }

function buyLoopUpgrade(i) {
    const u = LOOP_UPGRADES[i]
    if (!u || hasLoopUpgrade(i)) return
    normalizeLoopPlayer()
    if (player.loop.amount.lt(u.cost)) return
    player.loop.amount = player.loop.amount.sub(u.cost).max(0)
    player.loop.upgs.push(i)
}

// Loop is a currency too (spendable amount), so it shows up in the Sandbox resource editor.
CURRENCIES.loop = {
    get require() { return LOOP.cost },
    get amount() { return loopAmount() },
    set amount(v) { normalizeLoopPlayer(); player.loop.amount = E(v ?? 0).max(0) },
    get total() { return E(loopTimes()) },
    set total(v) { /* total loops are tracked in player.loop.times */ },
    get gain() { return E(0) },
}

function setupLoopHTML() {
    const root = el('loop-upgrades')
    if (!root) return
    normalizeLoopPlayer()
    root.innerHTML = LOOP_UPGRADES.map((u,i) => `
        <button class="remnant-upg" id="loop-upg-${i}" onclick="buyLoopUpgrade(${i})">
            <b>${u.name}</b><br>${u.desc}<br><span id="loop-upg-${i}-cost">Cost: ${u.cost} Loop</span>
        </button>`).join("")
}

function updateLoopHTML() {
    const info = el('loop-info'), button = el('loop-button')
    if (!info || !button) return
    normalizeLoopPlayer()
    info.innerHTML = `You have looped <h3>${format(loopTimes(),0)}</h3> time(s) and have <h3>${format(loopAmount(),0)}</h3> Loop(s) to spend.<br>
    Every gain is multiplied by <b>×${format(LOOP.mult)}</b> (×3 per Loop)${LOOP.exp > 1 ? ` and raised to <b>^${LOOP.exp}</b> (100+ Loops!)` : `.<br>Reach <b>100</b> Loops to also raise every gain to <b>^1.1</b>`}.`
    button.innerHTML = LOOP.unlocked
        ? (player.fish.gte(LOOP.cost) ? `Loop! Reset everything Hadronize does (and Fundamental Particles) for +1 Loop.<br>Cost: ${format(LOOP.cost,0)} Fish (never increases)` : `Reach ${format(LOOP.cost,0)} Fish to Loop.`)
        : `Reach Fundamental Particles (Hadronize once) to unlock Looping.`
    button.className = el_classes({locked: !LOOP.canLoop, 'huge-btn': true})
    LOOP_UPGRADES.forEach((u,i) => {
        const b = el('loop-upg-'+i), c = el('loop-upg-'+i+'-cost')
        if (!b || !c) return
        const owned = hasLoopUpgrade(i)
        b.className = el_classes({'remnant-upg': true, bought: owned, locked: !owned && loopAmount().lt(u.cost)})
        c.textContent = owned ? 'Owned — always automated!' : `Cost: ${u.cost} Loop`
    })
}
