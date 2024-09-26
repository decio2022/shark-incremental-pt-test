// This is main language file! It's English!

LANGUAGES.EN = {
    name: "English",
    inter_name: "English",
    icon: "lang-en",

    text: {
        // Evolution Tree

        'evolution-tree-row': (r,a) => `<b>Row ${r}</b><br>${a} available`,
        'evolution-tree-ctn': [
            ["Fish Forge", x=>`${toTextStyle('Fish','fish')} speeds forging by <b>${formatMult(x)}</b>.`, x=>`${toTextStyle('Fish','fish')} boosts ${toTextStyle("Constellation",'star')} resources by <b>${formatMult(x)}</b>.`],
            ["Prestigious Forge", x=>`${toTextStyle('Prestige','prestige')} shards speed forging by <b>${formatMult(x)}</b>.`, x=>`${toTextStyle('Prestige','prestige')} shards boost ${toTextStyle("Constellation",'star')} resources by <b>${formatMult(x)}</b>.`],
            ["Magmatic Forge", x=>`${toTextStyle('Magmatic','core')} fragments speed forging by <b>${formatMult(x)}</b>.`, x=>`${toTextStyle('Magmatic','core')} fragments boost ${toTextStyle("Constellation",'star')} resources by <b>${formatMult(x)}</b>.`],
            ["Faster Forge", x=>`Forging is <b>${formatMult(x)}</b> faster.`, x=>`${toTextStyle("Constellation",'star')} resources are increased by <b>${formatMult(x)}</b>.`],
        ],

        // Singularity

        'remnant-upgrades': [
            [`The Star`,x=>`${toTextStyle("Constellation",'star')} resources are boosted by ${x}.`],
            [`The Growth`,x=>`The exponent of the ${toTextStyle("Constellation",'star')} base is increased by ${x}.`],
        ],
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
    },
}