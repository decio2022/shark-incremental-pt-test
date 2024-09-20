// This is main language file! It's English!

LANGUAGES.EN = {
    name: "English",
    inter_name: "English",
    icon: "lang-en",

    text: {
        'all-research': {
            'e7': ["Sunda Trench MK2",`Improve the <b>Indian Ocean</b>’s depth progress significantly.`],

            'm5': ["Shark Rank 'onto' Super Mining",`${toTextStyle("Shark",'shark')} Rank boost to mining damage affects super mining damage at a reduced rate.`],
            'm6': ["The Uranium Shark",`'Shark Exponent' is overpowered.`],
            'm7': ["Double Remnant Scaling",`The first scaling of ${toTextStyle("Remnant",'black-hole')} upgrades is delayed by <b>+100</b>.`],
            'm8': ["Ultimate Radiation",`The 14th radioactive boost’s effect is improved.`],
            'm9': [`No Radiation Overflow`,`The softcap of ${toTextStyle('Radiation '+icon('radioactive'),'core')} production is removed.`],
            'm10': [`Auto-Core Reactor MK2`,`Auto-${toTextStyle('Core','core')} Reactor now applies to the third row of ${toTextStyle('Core','core')} reactors.`],
            'm11': [`Auto-Mining Upgrade MK2`,`Auto-${toTextStyle('Shark','shark')} Mining Upgrade now applies to the rest of ${toTextStyle('Shark','shark')} mining upgrades.`],
           
            'r2': [`Reservatory Improvement`,`Improves ${toTextStyle('Reservatory','reserv')} gain formula even better.`],
            'r3': [`Reservatory Generation`,`Generates 100% of your ${toTextStyle('Reservatories','reserv')} gained on reset. <i>This research doesn’t get reset.</i>`],
        
            't1': [`Trajectory Automation`,`Automates all ${toTextStyle('Trajectory','traject')} upgrades without spending currencies. <i>This research doesn’t get reset.</i>`],
            't2': [`Trajectory Improvement`,`Improves ${toTextStyle('Trajectory','traject')} gain formula even better.`],
            't3': [`Trajectory Generation`,`Generates 100% of your ${toTextStyle('Trajectories','traject')} gained on reset. <i>This research doesn’t get reset.</i>`],
        },

        // Evolution Tree

        'evolution-tree-row': (r,a) => `<b>Row ${r}</b><br>${a} available`,
        'evolution-tree-ctn': [
            ["Strong Column 1", x=>`The above upgrades in the first column are <b>${formatPercent(x-1)}</b> stronger.`, x=>`The above upgrades, including charged, in the first column are <b>${formatPercent(x-1)}</b> stronger.`],
            ["Strong Column 2", x=>`The above upgrades in the second column are <b>${formatPercent(x-1)}</b> stronger.`, x=>`The above upgrades, including charged, in the second column are <b>${formatPercent(x-1)}</b> stronger.`],
            ["Strong Column 3", x=>`The above upgrades in the third column are <b>${formatPercent(x-1)}</b> stronger.`, x=>`The above upgrades, including charged, in the third column are <b>${formatPercent(x-1)}</b> stronger.`],
            ["Strong Column 4", x=>`The above upgrades in the fourth column are <b>${formatPercent(x-1)}</b> stronger.`, x=>`The above upgrades, including charged, in the fourth column are <b>${formatPercent(x-1)}</b> stronger.`],

            ["Fish Forge", x=>`${toTextStyle('Fish','fish')} speeds forging by <b>${formatMult(x)}</b>.`, x=>`${toTextStyle('Fish','fish')} boosts ${toTextStyle("Constellation",'star')} resources by <b>${formatMult(x)}</b>.`],
            ["Prestigious Forge", x=>`${toTextStyle('Prestige','prestige')} shards speed forging by <b>${formatMult(x)}</b>.`, x=>`${toTextStyle('Prestige','prestige')} shards boost ${toTextStyle("Constellation",'star')} resources by <b>${formatMult(x)}</b>.`],
            ["Magmatic Forge", x=>`${toTextStyle('Magmatic','core')} fragments speed forging by <b>${formatMult(x)}</b>.`, x=>`${toTextStyle('Magmatic','core')} fragments boost ${toTextStyle("Constellation",'star')} resources by <b>${formatMult(x)}</b>.`],
            ["Faster Forge", x=>`Forging is <b>${formatMult(x)}</b> faster.`, x=>`${toTextStyle("Constellation",'star')} resources are increased by <b>${formatMult(x)}</b>.`],

            ["True Column 1", x=>`You are allowed to purchase the first column of tree evolution.`, x=>`You are allowed to purchase the first column of charged tree evolution.`],
            ["True Column 2", x=>`You are allowed to purchase the second column of tree evolution.`, x=>`You are allowed to purchase the second column of charged tree evolution.`],
            ["True Column 3", x=>`You are allowed to purchase the third column of tree evolution.`, x=>`You are allowed to purchase the third column of charged tree evolution.`],
            ["True Column 4", x=>`You are allowed to purchase the fourth column of tree evolution.`, x=>`You are allowed to purchase the fourth column of charged tree evolution.`],
        ],

        // Singularity

        'remnant-upgrades': [
            [`The Star`,x=>`${toTextStyle("Constellation",'star')} resources are boosted by ${x}.`],
            [`The Growth`,x=>`The exponent of the ${toTextStyle("Constellation",'star')} base is increased by ${x}.`],
        ],

        'solar-system-list': {
            'sun':     ["Sun",`The Sun is a star that sits at the center of our solar system. It is made up mostly of hydrogen and helium and is the main source of light and heat for Earth and the other planets in the system. The Sun also creates the conditions for life on Earth by providing photosynthesis and climatic conditions. The Sun is huge. Its diameter is 109 times the diameter of the Earth, and its mass is 330,000 times the mass of the Earth. The distance between the Earth and the Sun is 150 million kilometers, so the Sun seems so small to us.`,`Unlock the next layer (NYI). The multiplier of ${toTextStyle('Sharkoid Faith','humanoid')} is doubled again.`],
            'pluto':   ["Pluto",`Pluto is the largest known dwarf planet in the solar system, a trans-Neptunian object and the tenth most massive celestial body orbiting the Sun after the eight planets and Eridas. It is composed of rock and ice and has a mass about six times smaller than the mass of the Moon and a volume about three times smaller. Pluto has a large eccentricity of orbit and a large inclination to the ecliptic plane. Because of this, it is approaching the Sun at a distance of 29.7 a.u. and moving away at 49.3 a.u.`,`Unlock more ${toTextStyle('Remnant','black-hole')} upgrades again. ${toTextStyle('Constellation','star')} resources no longer get reset.`],
        },
        'space-base-upgrades': {
            'o1': [`The Space`,x=>`${toTextStyle('Observatories','observ')} are boosted by ${x}.`],
            'o2': [`Space Fish`,x=>`${toTextStyle('Fish','fish')} is boosted by ${x}.`],
            'o3': [`Space Prestige`,x=>`${toTextStyle('Prestige shards','prestige')} are boosted by ${x}.`],
            'o4': [`Space Core`,x=>`${toTextStyle('Magmatic fragments','core')} are boosted by ${x}.`],
            'o5': [`Space Radiation`,x=>`${toTextStyle('Radiation '+icon("radioactive"),'core')} production is boosted by ${x}.`],
            
            'e1': [`Fish Exchanger`,x=>`${toTextStyle('Observatories','observ')} are boosted by ${x}.`],
            'e2': [`Prestige Exchanger`,x=>`${toTextStyle('Observatories','observ')} are boosted by ${x}.`],
            'e3': [`Core Exchanger`,x=>`${toTextStyle('Observatories','observ')} are boosted by ${x}.`],
            'e4': [`Observe-Reservatory`,x=>`${toTextStyle('Reservatories','reserv')} are boosted by ${x}.`],
            'e5': [`Universal Exchanger`,x=>`The base of ${toTextStyle('Observatory','observ')} upgrades “Exchanger” is increased by ${x}.`],
            'e6': [`Reserve-Trajectory`,x=>`${toTextStyle('Trajectories','traject')} are boosted by ${x}.`],

            'r1': [`The Relative`,x=>`${toTextStyle('Observatories','observ')} are boosted by ${x}.`],
            'r2': [`Observable`,x=>`${toTextStyle('Reservatories','reserv')} are boosted by ${x}.`],
            'r3': [`Space Fish II`,x=>`${toTextStyle('Fish','fish')} is boosted by ${x}.`],
            'r4': [`Space Prestige II`,x=>`${toTextStyle('Prestige shards','prestige')} are boosted by ${x}.`],
            'r5': [`Space Radiation II`,x=>`${toTextStyle('Radiation '+icon("radioactive"),'core')} production is boosted by ${x}.`],

            't1': [`The Transport`,x=>`${toTextStyle('Observatories','observ')} are boosted by ${x}.`],
            't2': [`Reservable`,x=>`${toTextStyle('Reservatories','reserv')} are boosted by ${x}.`],
            't3': [`Observable II`,x=>`${toTextStyle('Trajectories','traject')} are boosted by ${x}.`],
            't4': [`Space Fish III`,x=>`${toTextStyle('Fish','fish')} is boosted by ${x}.`],
            't5': [`Scaled Radiation`,x=>`The first 3 scalings of radioactive boost are delayed by ${x}.`],
            't6': [`The Transport II`,x=>`The base of “The Transport” is increased by ${x}.`],
        },
        
        'experiment-reset': `Reset all previous space-base features, but increase the ${toTextStyle('Experiment','experiment')} tier for a powerful boost.`,
        'experiment-boosts': [
            x=>`${toTextStyle('Observatories','observ')} are boosted by ${x}.`,
            x=>`${toTextStyle('Reservatories','reserv')} are boosted by ${x}.`,
            x=>`${toTextStyle('Trajectories','traject')} are boosted by ${x}.`,
        ],

        'constellation-boosts': [
            [`Stellar Fish`, x=>`Boost ${toTextStyle('Fish','fish')} amount by ${x} to the exponent.`, x=>`Boost ${toTextStyle('Observatories','observ')} generation by ${x}.`],
            [`Stellar Prestige`, x=>`Boost ${toTextStyle('Prestige','prestige')} shards gain by ${x} to the exponent.`, x=>`Boost ${toTextStyle('Reservatories','reserv')} gain by ${x}.`],
            [`Stellar Fragments`, x=>`Boost ${toTextStyle('Magmatic','core')} fragments gain by ${x}.`, x=>`Boost ${toTextStyle('Trajectories','traject')} gain by ${x}.`],
            [`Stellar Sharks`, x=>`Boost the exponent of ${toTextStyle('Humanoid','humanoid')} sharks by ${x}.`, x=>`Reduce the ${toTextStyle('Experiment','experiment')} tier requirement by ${x}`],
        ],

        // Progress

        'progress-20-text': r => `Reach ${format(r)} total ${toTextStyle('Fish','fish')}`, 
        get 'progress-20-cond-text'() { return `???` },
    },
}