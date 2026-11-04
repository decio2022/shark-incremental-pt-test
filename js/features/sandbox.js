/*
    Sandbox Mode
    --------------
    A fully editable, save-persistent sandbox. When enabled, the strings stored
    in player.sandbox replace / transform the live game formulas:

      player.sandbox = {
        enabled:  boolean,
        formulas: { [formulaId]: string },              // global formulas (Shark, currencies, ...)
        sharkUpg: { [upgradeId]: {cost, effect, curr} },// per Shark / Prestige / Mining upgrade
        research: { [researchId]: {costMult, effect, costs: string[]} }, // per research, per requirement
        explore:  { [oceanIndex]: {base, cost0, cost1, effectMult, maxDepth, fishReq, levelReq} },
      }

    Formula language: a plain JavaScript expression evaluated with break_eternity
    Decimals. Variables are Decimals, so use the helper functions (preferred) or
    Decimal methods, e.g.:

        pow(reqBase, level)                 -> Decimal.pow(reqBase, level)
        mul(pow(1.1, level), 100)           -> 100 * 1.1^level
        pow(10, mul(level, 2))              -> 10^(2*level)
        gain.mul(100)                       -> Decimal method style also works
        level.gte(20) ? pow(2, level) : 1   -> conditionals also work

    Helpers available in every formula: D(x)/E(x), add, sub, mul, div, pow,
    root, log10, log(x,base), floor, ceil, max, min, pow10, exp, slog.
    A broken / NaN formula is ignored and the original game formula is used,
    so experimenting in Sandbox can never NaN the save.
*/

const SB_FORMULA_CACHE = {}

function sb() {
    if (!player.sandbox || typeof player.sandbox != 'object') player.sandbox = {enabled: false, formulas: {}, sharkUpg: {}, research: {}, explore: {}}
    player.sandbox.formulas ??= {}
    player.sandbox.sharkUpg ??= {}
    player.sandbox.research ??= {}
    player.sandbox.explore ??= {}
    return player.sandbox
}
function sbEnabled() { return !!player.sandbox?.enabled }
function sbEntry(section, id) {
    const s = sb()[section]
    if (!s[id] || typeof s[id] != 'object') s[id] = {}
    return s[id]
}
function sbFormula(id) { return sb().formulas[id] ?? "" }

const SB_HELPERS = {
    D: x => E(x), E: x => E(x),
    add: (a,b) => E(a).add(b), sub: (a,b) => E(a).sub(b),
    mul: (a,b) => E(a).mul(b), div: (a,b) => E(a).div(b),
    pow: (a,b) => Decimal.pow(a,b), root: (a,b) => E(a).root(b),
    log10: a => E(a).max(1e-300).log10(), log: (a,b) => E(a).log(b),
    floor: a => E(a).floor(), ceil: a => E(a).ceil(),
    max: (a,b) => Decimal.max(a,b), min: (a,b) => Decimal.min(a,b),
    pow10: a => Decimal.pow(10,a), exp: a => E(a).exp(), slog: a => E(a).slog(10),
}

/** Evaluate a sandbox formula. Returns `def` when disabled, empty, broken or NaN. */
function sbEval(code, vars = {}, def = E(0)) {
    if (!sbEnabled() || typeof code != 'string' || !code.trim()) return def
    try {
        let fn = SB_FORMULA_CACHE[code]
        if (!fn) {
            const names = [...Object.keys(SB_HELPERS), ...Object.keys(vars)]
            fn = SB_FORMULA_CACHE[code] = {names, f: new Function(...names, `"use strict"; return (${code});`)}
        }
        // Variable set changed since compilation? Recompile to stay correct.
        const names = [...Object.keys(SB_HELPERS), ...Object.keys(vars)]
        if (fn.names.join() !== names.join()) fn = SB_FORMULA_CACHE[code] = {names, f: new Function(...names, `"use strict"; return (${code});`)}
        const out = fn.f(...names.map(n => n in SB_HELPERS ? SB_HELPERS[n] : vars[n]))
        const result = E(out ?? def)
        return isNaN(result.mag) ? def : result
    } catch (e) {
        return def
    }
}
function sbHasFormula(code) { return sbEnabled() && typeof code == 'string' && !!code.trim() }

/** Largest level whose cost (via costFn) is <= amount. Generic inverse for custom cost formulas. */
function sbBulk(costFn, amount, current = E(0)) {
    amount = E(amount)
    if (costFn(current).gt(amount)) return current
    let lo = current.floor(), hi = lo.add(1), guard = 0
    while (costFn(hi).lte(amount) && guard++ < 300) { lo = hi; hi = hi.mul(2).add(1) }
    guard = 0
    while (hi.sub(lo).gt(1) && guard++ < 300) {
        const mid = lo.add(hi).div(2).floor()
        if (costFn(mid).lte(amount)) lo = mid; else hi = mid
    }
    return lo.add(1) // game bulk() convention: next purchasable level count
}

/* ============================ Global formulas ============================ */

const SB_GLOBAL_FORMULAS = [
    {id: 'sharkCost',       name: 'Shark Level — cost formula',            vars: 'level, reqBase, scale',        example: 'pow(reqBase, level)'},
    {id: 'bonus_fish',      name: 'Shark Level — Fish bonus',              vars: 'level, bonus',                 example: 'pow(2, level) * level  (or: bonus.mul(10))'},
    {id: 'bonus_prestige',  name: 'Shark Level — Prestige Shard bonus',    vars: 'level, bonus',                 example: 'pow(1.25, sub(level, 19))'},
    {id: 'bonus_core',      name: 'Shark Level — Core Fragment bonus',     vars: 'level, bonus',                 example: 'pow(1.01, sub(level, 299))'},
    {id: 'bonus_remnants',  name: 'Shark Level — Remnants bonus',          vars: 'level, bonus',                 example: 'level'},
    {id: 'rankRequire',     name: 'Shark Rank — ELO requirement',          vars: 'rank',                         example: 'mul(sub(pow(1.2, add(rank, 1)), 1), 500)'},
    {id: 'tierRequire',     name: 'Shark Tier — IQ requirement',           vars: 'tier',                         example: 'add(mul(tier, 10), 50)'},
    {id: 'fishGain',        name: 'Fish — gain / second',                  vars: 'gain, fish, totalFish, sharkLevel, level', example: 'gain.mul(100)  (or rebuild it: pow(2, sharkLevel))'},
    {id: 'prestigeGain',    name: 'Prestige — Shards gained on reset',     vars: 'gain, fish, totalFish, sharkLevel, level', example: 'pow(div(totalFish, 1e36), 0.5)'},
    {id: 'coreGain',        name: 'Core — Fragments gained on reset',      vars: 'gain, prestigeTotal, sharkLevel, level',   example: 'gain.mul(10)'},
    {id: 'remnantsGain',    name: 'Remnants — gain',                       vars: 'gain, sharkLevel, level',      example: 'gain.mul(10)'},
    {id: 'darkMatterGain',  name: 'Dark Matter — gain',                    vars: 'gain, fish, sharkLevel, level', example: 'gain.mul(10)'},
    {id: 'hadronGain',      name: 'Hadron — Fundamental Particles gained', vars: 'gain, fish, sharkLevel, level', example: 'gain.mul(10)'},
]

function sbGlobalVars(extra = {}) {
    return {
        level: player.shark_level ?? E(0), sharkLevel: player.shark_level ?? E(0),
        fish: player.fish ?? E(0), totalFish: player.total_fish ?? E(0),
        prestigeTotal: player.prestige?.total ?? E(0),
        rank: player.shark_rank ?? E(0), tier: player.shark_tier ?? E(0),
        ...extra,
    }
}
/** Transform an already-computed currency gain through a global formula (if any). */
function sbGainFormula(id, gain) {
    return sbEval(sbFormula(id), sbGlobalVars({gain: E(gain)}), E(gain))
}

/* ============================ Shark upgrades ============================ */

function sbSharkUpg(id) { return sbEntry('sharkUpg', id) }
function sbSharkUpgCurr(id) {
    const c = sbSharkUpg(id).curr
    return sbEnabled() && c && CURRENCIES[c] ? c : SHARK_UPGRADES[id].curr
}
function getSharkUpgradeCost(id, lvl = player.shark_upg[id]) {
    const u = SHARK_UPGRADES[id], code = sbSharkUpg(id).cost
    if (!sbHasFormula(code)) return u.cost(lvl)
    return sbEval(code, {level: E(lvl), amt: E(lvl), ...sbGlobalVars()}, u.cost(lvl))
}
function getSharkUpgradeBulk(id, amount) {
    const u = SHARK_UPGRADES[id], code = sbSharkUpg(id).cost
    if (!sbHasFormula(code)) return u.bulk(amount)
    return sbBulk(l => getSharkUpgradeCost(id, l), amount, player.shark_upg[id])
}
function getSharkUpgradeEffect(id, lvl) {
    const u = SHARK_UPGRADES[id], code = sbSharkUpg(id).effect
    const original = u.effect(lvl)
    if (!sbHasFormula(code)) return original
    return sbEval(code, {level: E(lvl), amt: E(lvl), effect: original, ...sbGlobalVars()}, original)
}

/* ============================ Research ============================ */

function sbResearch(id) { return sbEntry('research', id) }
/** Original cost of one research requirement (index j) at research amount `amt`. */
function sbResearchBaseCost(r, amt, max) {
    let c = max > 1 ? (typeof r[2] == 'function' ? r[2](amt) : r[2]) : r[2]
    if (typeof c == 'function') c = c(amt)
    return E(c ?? EINF)
}
function getResearchCost(id, j, amt = player.research[id]) {
    const r = RESEARCH[id].require[j], max = RESEARCH[id].max ?? 1
    const base = sbResearchBaseCost(r, amt, max)
    if (!sbEnabled()) return base
    const o = sbResearch(id)
    const override = o.costs?.[j]
    let cost = base
    if (typeof override == 'string' && override.trim()) {
        cost = override.trim().startsWith('=')
            ? sbEval(override.trim().slice(1), {level: E(amt), amt: E(amt), base, cost: base, ...sbGlobalVars()}, base)
            : (() => { try { const v = E(override.trim()); return isNaN(v.mag) ? base : v } catch { return base } })()
    }
    if (o.costMult?.trim()) { try { const m = E(o.costMult.trim()); if (!isNaN(m.mag)) cost = cost.mul(m) } catch {} }
    return cost
}
function getResearchEffect(id, amt = player.research[id]) {
    const x = RESEARCH[id], original = x.effect ? x.effect(amt) : E(1)
    const code = sbResearch(id).effect
    if (!sbHasFormula(code)) return original
    return sbEval(code, {level: E(amt), amt: E(amt), effect: original, research: E(amt), ...sbGlobalVars()}, original)
}
function sbResearchHasOverride(id) {
    if (!sbEnabled()) return false
    const o = sbResearch(id)
    return !!(o.effect?.trim() || o.costMult?.trim() || (o.costs ?? []).some(c => c?.trim()))
}

/* ============================ Exploration ============================ */

function sbExplore(i) { return sbEntry('explore', String(i)) }
function sbExploreNum(i, key, def) {
    if (!sbEnabled()) return def
    const v = sbExplore(i)[key]
    if (typeof v != 'string' || !v.trim()) return def
    try { const n = E(v.trim()); return isNaN(n.mag) ? def : n } catch { return def }
}
function getExploreMaxDepth(i) { return sbExploreNum(i, 'maxDepth', E(EXPLORE[i].maxDepth)).toNumber() }
function getExploreFishReq(i) { return sbExploreNum(i, 'fishReq', EXPLORE[i].fish_req) }
function getExploreLevelReq(i) { return sbExploreNum(i, 'levelReq', E(EXPLORE[i].level_req)).toNumber() }
function getExploreUpgradeCost(i, j, lvl = player.explore.upg[i][j]) {
    const cost = EXPLORE[i].cost[j], base = cost[0](lvl)
    const code = sbExplore(i)['cost' + j]
    if (!sbHasFormula(code)) return base
    return sbEval(code, {level: E(lvl), amt: E(lvl), base, cost: base, ocean: E(i), ...sbGlobalVars()}, base)
}
function sbExploreHasCostOverride(i, j) { return sbHasFormula(sbExplore(i)['cost' + j]) }

/* ============================ Sandbox actions ============================ */

function sbSetDecimal(path, value) {
    try {
        const v = E(String(value).trim() || '0')
        if (isNaN(v.mag)) return false
        const keys = path.split('.')
        let obj = player
        for (let k = 0; k < keys.length - 1; k++) obj = obj[keys[k]]
        obj[keys[keys.length - 1]] = v
        return true
    } catch { return false }
}
function sbSetResource(id, mode, inputId) {
    const input = el(inputId), curr = CURRENCIES[id]
    if (!input || !curr) return
    try {
        const v = E(input.value.trim() || '0')
        if (isNaN(v.mag)) return
        curr.amount = mode == 'add' ? curr.amount.add(v) : v
        if ('total' in curr && mode == 'add') curr.total = curr.total.add(v)
        addNotify(`Sandbox: ${mode == 'add' ? 'added' : 'set'} ${format(v, 0)} ${id}`)
    } catch {}
}
function sbSetLevel(section, id, value) {
    try {
        const v = E(String(value).trim() || '0')
        if (isNaN(v.mag)) return
        if (section == 'shark_upg') player.shark_upg[id] = v
        else if (section == 'research') player.research[id] = v
        else if (section == 'reactor') player.core.reactor[id] = v
        else if (section == 'remnant') player.singularity.upgs[id] = v
        else if (section == 'spacebase') player.solar_system.sb_upgs[id] = v
        else if (section == 'nucleobase_base') player.hadron.nucleobases[id].upg[0] = v
        else if (section == 'nucleobase_tier') player.hadron.nucleobases[id].upg[1] = v
    } catch {}
}
function sbUnlockEverything() {
    player.feature = Math.max(player.feature, 23)
    player.explore.unl = EXPLORE.length
    player.core.times = Math.max(player.core.times, 1)
    player.humanoid.times = Math.max(player.humanoid.times, 1)
    player.hadron.times = Math.max(player.hadron.times, 1)
    player.singularity.first = true
    addNotify('Sandbox: everything unlocked (features, oceans, resets). Reload-free — switch tabs to see them.')
}
function sbMaxResearch() { for (let id in RESEARCH) player.research[id] = E(RESEARCH[id].max ?? 1); addNotify('Sandbox: all research maxed.') }
function sbClearResearch() { for (let id in RESEARCH) player.research[id] = E(0) }
function sbMaxDepths() { EXPLORE.forEach((x, i) => player.explore.depth[i] = E(getExploreMaxDepth(i))); addNotify('Sandbox: all ocean depths maxed.') }
function sbResetSandbox() {
    player.sandbox = {enabled: player.sandbox?.enabled ?? false, formulas: {}, sharkUpg: {}, research: {}, explore: {}}
    SB_FORMULA_CACHE_CLEAR()
    setupSandboxHTML()
    addNotify('Sandbox: all formula / cost / effect overrides cleared.')
}
function SB_FORMULA_CACHE_CLEAR() { for (let k in SB_FORMULA_CACHE) delete SB_FORMULA_CACHE[k] }
function sbExportSandbox() { copyToClipboard(JSON.stringify(sb())); addNotify('Sandbox: configuration copied to clipboard.') }
function sbImportSandbox() {
    createPromptPopup('Paste a Sandbox configuration JSON (exported from Sandbox):', text => {
        if (text == null) return
        try {
            const data = JSON.parse(text)
            if (typeof data != 'object' || data == null) throw 0
            player.sandbox = {enabled: !!data.enabled, formulas: data.formulas ?? {}, sharkUpg: data.sharkUpg ?? {}, research: data.research ?? {}, explore: data.explore ?? {}}
            SB_FORMULA_CACHE_CLEAR(); setupSandboxHTML()
            addNotify('Sandbox: configuration imported.')
        } catch { error('Error importing Sandbox configuration.') }
    })
}

/* ============================ Sandbox UI ============================ */

const SB_CURRENCY_CHOICES = ['fish','prestige','core','humanoid','remnants','dark-matter','hadron','coral','ice','salt','snow','kelp','stone','coal','iron','gold','platinum']
function sbEsc(s) { return String(s ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;') }
function sbFormulaInput(section, key, value, placeholder, sub) {
    const onchange = section == 'formulas'
        ? `player.sandbox.formulas['${key}']=this.value`
        : `sbEntry('${section}','${key.split('|')[0]}')['${key.split('|')[1]}']=this.value`
    return `<input class="sandbox-input sandbox-formula" value="${sbEsc(value)}" placeholder="${sbEsc(placeholder)}" onchange="${onchange}" spellcheck="false">${sub ? `<div class="sandbox-sub">${sub}</div>` : ''}`
}

function setupSandboxHTML() {
    const s = sb(), root = el('sandbox-content')
    if (!root) return
    let h = `
    <div class="sandbox-head">
        <h2>🧪 Sandbox Mode</h2>
        <p>Edit <b>everything</b>: formulas, upgrade costs &amp; effects, every research cost &amp; effect,
        every ocean, resources, levels and unlocks. Changes are saved in your save file and apply <b>live</b>
        (only while Sandbox is ON). A broken formula is ignored and the original formula is used instead.</p>
        <div class="table-center">
            <button class="big-btn ${s.enabled ? '' : 'locked'}" onclick="player.sandbox.enabled=!player.sandbox.enabled;setupSandboxHTML()">${s.enabled ? '✅ Sandbox: ON' : '⬜ Sandbox: OFF'} (click to toggle)</button>
            <button class="big-btn" onclick="sbExportSandbox()">Export Sandbox config</button>
            <button class="big-btn" onclick="sbImportSandbox()">Import Sandbox config</button>
            <button class="big-btn" onclick="sbResetSandbox()">Clear all overrides</button>
        </div>
        <div id="sandbox-status" class="sandbox-status"></div>
        <details class="sandbox-help"><summary><b>Formula help — click to open</b></summary>
            <p>Formulas are JavaScript expressions using <b>Decimals</b>. Use helpers
            <code>add(a,b) sub mul div pow(a,b) root log10 log floor ceil max min pow10 exp slog</code> or Decimal methods
            (<code>gain.mul(100)</code>, <code>pow(2, level)</code>, <code>level.gte(20) ? … : …</code>).
            In cost fields anywhere, a plain number like <code>1e100</code> is a flat cost, and text starting with
            <code>=</code> is a formula in the given variables (the original value is available as <code>base</code>/<code>cost</code>/<code>effect</code>/<code>gain</code>).</p>
        </details>
    </div>

    <details class="sandbox-section" open><summary>⚡ Quick actions &amp; unlocks</summary>
        <div class="table-center">
            <button class="big-btn" onclick="sbUnlockEverything()">Unlock everything (all features, oceans &amp; resets)</button>
            <button class="big-btn" onclick="sbMaxResearch()">Max all research</button>
            <button class="big-btn" onclick="sbClearResearch()">Clear all research</button>
            <button class="big-btn" onclick="sbMaxDepths()">Max all ocean depths</button>
            <button class="big-btn" onclick="CURRENCIES.fish.amount=CURRENCIES.fish.amount.add(E('1e100'));CURRENCIES.fish.total=CURRENCIES.fish.total.add(E('1e100'))">Give 1e100 Fish</button>
        </div>
        <div class="sandbox-grid">
            ${[['shark_level','Shark Level'],['shark_rank','Shark Rank'],['shark_tier','Shark Tier'],['humanoid.mining_tier','Mining Tier'],['humanoid.mining_ascend','Mining Ascension']].map(([p,n]) => `
            <label class="sandbox-field">${n}<span class="table-left"><input class="sandbox-input" id="sb-stat-${p}" value="${sbEsc((p.split('.').reduce((o,k)=>o?.[k],player))?.toString?.() ?? '')}" onchange="sbSetDecimal('${p}',this.value)"><button onclick="sbSetDecimal('${p}',el('sb-stat-${p}').value)">Set</button></span></label>`).join('')}
            <label class="sandbox-field">Feature progression (unlocks tabs, 0–23)<span class="table-left"><input class="sandbox-input" type="number" min="0" max="23" step="1" value="${player.feature}" onchange="player.feature=Math.max(0,Math.min(23,Math.round(+this.value||0)))"><button onclick="player.feature=23">Max</button></span></label>
            <label class="sandbox-field">Oceans unlocked (0–${EXPLORE.length})<span class="table-left"><input class="sandbox-input" type="number" min="0" max="${EXPLORE.length}" step="1" value="${player.explore.unl}" onchange="player.explore.unl=Math.max(0,Math.min(${EXPLORE.length},Math.round(+this.value||0)))"><button onclick="player.explore.unl=${EXPLORE.length}">All</button></span></label>
        </div>
    </details>

    <details class="sandbox-section" open><summary>💰 Resources — set / add any currency</summary>
        <div class="sandbox-grid">${Object.keys(CURRENCIES).map(id => `
            <label class="sandbox-field">${sbEsc(CURRENCIES[id].name?.replace(/<[^>]*>/g,'') || id)} <code>[${id}]</code>
            <span class="table-left"><input class="sandbox-input" id="sb-res-${id}" placeholder="e.g. 1e100" spellcheck="false">
            <button onclick="sbSetResource('${id}','set','sb-res-${id}')">Set</button><button onclick="sbSetResource('${id}','add','sb-res-${id}')">Add</button></span>
            <span class="sandbox-sub">Current: <span id="sb-res-cur-${id}">?</span></span></label>`).join('')}
        </div>
    </details>

    <details class="sandbox-section" open><summary>🦈 Shark tab — global formulas (Shark Level, Prestige, bonuses, gains)</summary>
        ${SB_GLOBAL_FORMULAS.map(f => `
        <div class="sandbox-row"><div class="sandbox-row-head"><b>${f.name}</b> <code>vars: ${f.vars}</code><br>
        <span class="sandbox-sub">Live: <span id="sb-live-${f.id}">?</span></span></div>
        ${sbFormulaInput('formulas', f.id, s.formulas[f.id], 'Original formula (empty = unchanged)', `e.g. <code>${sbEsc(f.example)}</code>`)}</div>`).join('')}
    </details>

    <details class="sandbox-section"><summary>⬆️ Shark tab — Shark / Prestige / Mining upgrades (cost, effect, currency, level)</summary>
        ${Object.entries(SHARK_UPGRADES).map(([id,u]) => { const o = s.sharkUpg[id] ?? {}; return `
        <div class="sandbox-row"><div class="sandbox-row-head"><b>[${id}]</b> ${sbEsc(lang_text('su-'+id+'-name')?.replace(/<[^>]*>/g,'') ?? id)}
            <code>currency: ${u.curr}</code> <span class="sandbox-sub">Live cost: <span id="sb-live-su-cost-${id}">?</span> · effect: <span id="sb-live-su-eff-${id}">?</span></span></div>
            <div class="sandbox-grid">
                <label class="sandbox-field">Level<input class="sandbox-input" type="number" step="1" value="${player.shark_upg[id]?.toString() ?? 0}" onchange="sbSetLevel('shark_upg','${id}',this.value)"></label>
                <label class="sandbox-field">Currency<select class="sandbox-input" onchange="sbSharkUpg('${id}').curr=this.value"><option value="">(original: ${u.curr})</option>${SB_CURRENCY_CHOICES.map(c => `<option value="${c}" ${o.curr == c ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
            </div>
            <label class="sandbox-field">Cost formula <code>vars: level, amt</code>${sbFormulaInput('sharkUpg', id+'|cost', o.cost, 'Original cost (empty = unchanged)')}</label>
            <label class="sandbox-field">Effect formula <code>vars: level, amt, effect (original)</code>${sbFormulaInput('sharkUpg', id+'|effect', o.effect, 'Original effect (empty = unchanged)')}</label>
        </div>` }).join('')}
    </details>

    <details class="sandbox-section"><summary>🔬 Research tab — every research: each cost &amp; its effect</summary>
        ${Object.entries(RESEARCH).map(([id,r]) => { const o = s.research[id] ?? {}; return `
        <div class="sandbox-row"><div class="sandbox-row-head"><b>[${id}]</b> ${sbEsc((lang_text('all-research')?.[id]?.[0] ?? lang_text('research-'+id+'-name') ?? id).replace(/<[^>]*>/g,''))}
            <code>max: ${r.max ?? 1}${r.tier ? ' · tier '+r.tier : ''}</code> <span class="sandbox-sub">Live: <span id="sb-live-res-${id}">?</span></span></div>
            <div class="sandbox-grid">
                <label class="sandbox-field">Research level<input class="sandbox-input" type="number" step="1" value="${player.research[id]?.toString() ?? 0}" onchange="sbSetLevel('research','${id}',this.value)"></label>
                <label class="sandbox-field">Cost multiplier (all requirements)<input class="sandbox-input" value="${sbEsc(o.costMult)}" placeholder="1" onchange="sbResearch('${id}').costMult=this.value" spellcheck="false"></label>
            </div>
            ${r.require.map((req,j) => `<label class="sandbox-field">Cost ${j+1}: ${req[0]}${req[1] ? ' (total)' : ''} — plain number, or <code>=formula</code> <code>vars: level, amt, base</code>
                <input class="sandbox-input sandbox-formula" value="${sbEsc((o.costs ?? [])[j])}" placeholder="Original: ${sbEsc(typeof req[2] == 'function' ? 'formula (level-based)' : String(req[2]))}" onchange="(sbResearch('${id}').costs??=[])[${j}]=this.value" spellcheck="false"></label>`).join('')}
            ${r.effect ? `<label class="sandbox-field">Effect formula <code>vars: level, amt, effect (original)</code>${sbFormulaInput('research', id+'|effect', o.effect, 'Original effect (empty = unchanged)')}</label>` : '<div class="sandbox-sub">No numeric effect (unlock / boolean research) — edit its costs above.</div>'}
        </div>` }).join('')}
    </details>

    <details class="sandbox-section"><summary>🌊 Exploration tab — every ocean: base gain, upgrades, depth &amp; requirements</summary>
        ${EXPLORE.map((x,i) => { const o = s.explore[i] ?? {}; return `
        <div class="sandbox-row"><div class="sandbox-row-head"><b>Ocean ${i}: ${sbEsc(lang_text('explore-'+i+'-name')?.replace(/<[^>]*>/g,'') ?? x.resource)}</b> <code>resource: ${x.resource}</code>
            <span class="sandbox-sub">Live base: <span id="sb-live-explore-${i}">?</span></span></div>
            <div class="sandbox-grid">
                <label class="sandbox-field">Resource amount<input class="sandbox-input" type="number" step="any" value="${player.explore.res[i]?.toString() ?? 0}" onchange="player.explore.res[${i}]=E(this.value||0)"></label>
                <label class="sandbox-field">Depth (m)<input class="sandbox-input" value="${player.explore.depth[i]?.toString() ?? 0}" onchange="player.explore.depth[${i}]=E(this.value||0)" spellcheck="false"></label>
                <label class="sandbox-field">Stored base (/s)<input class="sandbox-input" value="${player.explore.base[i]?.toString() ?? 0}" onchange="player.explore.base[${i}]=E(this.value||0)" spellcheck="false"></label>
                <label class="sandbox-field">Max depth (m)<input class="sandbox-input" value="${sbEsc(o.maxDepth)}" placeholder="${x.maxDepth}" onchange="sbExplore(${i}).maxDepth=this.value" spellcheck="false"></label>
                <label class="sandbox-field">Fish requirement (base gain)<input class="sandbox-input" value="${sbEsc(o.fishReq)}" placeholder="${x.fish_req}" onchange="sbExplore(${i}).fishReq=this.value" spellcheck="false"></label>
                <label class="sandbox-field">Shark Level req. to unlock next<input class="sandbox-input" value="${sbEsc(o.levelReq)}" placeholder="${x.level_req}" onchange="sbExplore(${i}).levelReq=this.value" spellcheck="false"></label>
                <label class="sandbox-field">Resource-effect multiplier<input class="sandbox-input" value="${sbEsc(o.effectMult)}" placeholder="1" onchange="sbExplore(${i}).effectMult=this.value" spellcheck="false"></label>
                <label class="sandbox-field">Upgrade 0 level (resource doubler)<input class="sandbox-input" type="number" step="1" value="${player.explore.upg[i][0]?.toString() ?? 0}" onchange="player.explore.upg[${i}][0]=E(this.value||0)"></label>
                <label class="sandbox-field">Upgrade 1 level (depth doubler)<input class="sandbox-input" type="number" step="1" value="${player.explore.upg[i][1]?.toString() ?? 0}" onchange="player.explore.upg[${i}][1]=E(this.value||0)"></label>
            </div>
            <label class="sandbox-field">Base gain formula <code>vars: bestFish, fishReq, sharkLevel, level — result becomes base/s (fed from best fish in this ocean)</code>${sbFormulaInput('explore', i+'|base', o.base, 'Original base-gain formula (empty = unchanged)', 'e.g. <code>pow(log10(bestFish), 2)</code>')}</label>
            <label class="sandbox-field">Upgrade 0 cost formula <code>vars: level, amt, base</code>${sbFormulaInput('explore', i+'|cost0', o.cost0, 'Original cost (empty = unchanged)')}</label>
            <label class="sandbox-field">Upgrade 1 cost formula <code>vars: level, amt, base</code>${sbFormulaInput('explore', i+'|cost1', o.cost1, 'Original cost (empty = unchanged)')}</label>
        </div>` }).join('')}
    </details>

    <details class="sandbox-section"><summary>🧩 Other tabs — upgrade levels (Core Reactor, Black Hole / Remnants, Space Base, Nucleobases)</summary>
        <h3>Core Reactor amounts</h3><div class="sandbox-grid">
        ${CORE_REACTOR.map((x,i) => `<label class="sandbox-field">[${i}] amount<input class="sandbox-input" type="number" step="any" value="${player.core.reactor[i]?.toString() ?? 0}" onchange="sbSetLevel('reactor','${i}',this.value)"></label>`).join('')}</div>
        <h3>Remnant upgrades (Black Hole tab)</h3><div class="sandbox-grid">
        ${REMNANT_UPGS.map((x,i) => `<label class="sandbox-field">[${i}] level<input class="sandbox-input" type="number" step="1" value="${player.singularity.upgs[i]?.toString() ?? 0}" onchange="sbSetLevel('remnant','${i}',this.value)"></label>`).join('')}</div>
        <h3>Space Base upgrades</h3><div class="sandbox-grid">
        ${Object.keys(SPACEBASE_UPGS).map(id => `<label class="sandbox-field">[${id}] level<input class="sandbox-input" type="number" step="1" value="${player.solar_system.sb_upgs[id]?.toString() ?? 0}" onchange="sbSetLevel('spacebase','${id}',this.value)"></label>`).join('')}</div>
        <h3>Nucleobases</h3><div class="sandbox-grid">
        ${Object.keys(NUCLEOBASES.ctn).map(id => `
            <label class="sandbox-field">${id} — experience-base level<input class="sandbox-input" type="number" step="1" value="${player.hadron.nucleobases[id]?.upg[0]?.toString() ?? 0}" onchange="sbSetLevel('nucleobase_base','${id}',this.value)"></label>
            <label class="sandbox-field">${id} — tier-upgrade level<input class="sandbox-input" type="number" step="1" value="${player.hadron.nucleobases[id]?.upg[1]?.toString() ?? 0}" onchange="sbSetLevel('nucleobase_tier','${id}',this.value)"></label>`).join('')}</div>
        <p class="sandbox-sub">For every other system (Evolution Tree, Forge, Automation, Singularity milestones, Solar System, …):
        use the <b>Resources</b>, <b>levels</b> and <b>Unlock everything</b> editors above — currency / level / unlock
        state is what gates all of those tabs, and the global gain formulas above scale their rewards.</p>
    </details>`
    root.innerHTML = h
}

/** Live status only — never rebuilds inputs (so typing is never interrupted). */
function updateSandboxHTML() {
    const status = el('sandbox-status')
    if (!status) return
    const s = sb()
    const count = obj => Object.values(obj ?? {}).reduce((n, v) => n + (typeof v == 'string' ? (v.trim() ? 1 : 0) : Object.values(v ?? {}).reduce((m, w) => m + (typeof w == 'string' && w.trim() ? 1 : 0) + (Array.isArray(w) ? w.filter(c => c?.trim()).length : 0), 0)), 0)
    status.innerHTML = s.enabled
        ? `Sandbox is <b>ON</b> — ${count(s.formulas) + count(s.sharkUpg) + count(s.research) + count(s.explore)} active override(s). Edits apply live and are stored in your save.`
        : `Sandbox is <b>OFF</b> — overrides are saved but not applied. Turn it ON to use them.`
    for (let id in CURRENCIES) { const e = el('sb-res-cur-' + id); if (e) e.textContent = format(CURRENCIES[id].amount, 0) }
    const live = (id, v) => { const e = el('sb-live-' + id); if (e) e.textContent = v }
    try {
        live('sharkCost', format(SHARK.cost(), 0) + ' Fish')
        live('fishGain', format(tmp.currency_gain.fish ?? E(0)) + '/s')
        live('prestigeGain', format(CURRENCIES.prestige.gain, 0) + ' Shards')
        live('coreGain', format(CURRENCIES.core.gain, 0) + ' Fragments')
        live('remnantsGain', format(CURRENCIES.remnants.gain, 0))
        live('darkMatterGain', format(CURRENCIES['dark-matter'].gain, 0))
        live('hadronGain', format(CURRENCIES.hadron.gain, 0))
        for (let b of ['fish','prestige','core','remnants']) live('bonus_' + b, format(getSharkBonus(b, E(0))))
    } catch {}
    for (let id in SHARK_UPGRADES) {
        const c = el('sb-live-su-cost-' + id), e = el('sb-live-su-eff-' + id)
        if (c) try { c.textContent = format(getSharkUpgradeCost(id), 0) + ' ' + sbSharkUpgCurr(id) } catch {}
        if (e) try { e.textContent = SHARK_UPGRADES[id].effDesc(tmp.shark_upg_eff[id]) } catch {}
    }
    for (let id in RESEARCH) {
        const e = el('sb-live-res-' + id)
        if (e) try {
            const costs = RESEARCH[id].require.map((r, j) => format(getResearchCost(id, j), 0) + ' ' + r[0]).join(', ')
            e.textContent = 'cost: ' + costs + (RESEARCH[id].effDesc ? ' · effect: ' + RESEARCH[id].effDesc(tmp.research_eff[id]) : '')
        } catch {}
    }
    EXPLORE.forEach((x, i) => { const e = el('sb-live-explore-' + i); if (e) try { e.textContent = format(getBaseExploration(i), 3) + '/s · depth ' + format(player.explore.depth[i]) + 'm / ' + format(getExploreMaxDepth(i), 0) + 'm' } catch {} })
}
