// This is portuguese language file! It's not English!

LANGUAGES.PT = {
    name: "Português",
    inter_name: "Portuguese",
    icon: "lang-pt",

    text: {
        // Currencies

        'fish-name': "Peixe",
        'fish-costName': toTextStyle('Peixe','fish'),

        'prestige-name': "Fragmentos de prestígio",
        'prestige-costName': "Fragmentos de " + toTextStyle('prestígio','prestige'),

        'coral-name': "Corais",
        'coral-costName': toTextStyle('Corais','coral'),

        'ice-name': "Gelo",
        'ice-costName': toTextStyle('Gelo','ice'),

        'salt-name': "Sal",
        'salt-costName': toTextStyle('Sal','salt'),

        'snow-name': "Neve comprimida",
        'snow-costName': toTextStyle('Neve comprimida','snow'),

        'kelp-name': "Alga",
        'kelp-costName': toTextStyle('Alga','kelp'),

        'core-name': "Fragmentos Magmáticos",
        'core-costName': 'Fragmentos '+toTextStyle('Magmáticos','core'),
        
        'humanoid-name': "Homens-Tubarões",
        'humanoid-costName': toTextStyle('Homens','humanoid') + '-Tubarões',

        'remnants-name': "Restos",
        'remnants-costName': toTextStyle('Restos','black-hole'),

        'dark-matter-name': "Matéria Negra",
        'dark-matter-costName': toTextStyle('Matéria Negra','black-hole'),

        'observ-name': "Observatórios",
        'observ-costName': toTextStyle('Observatórios','observ'),

        'reserv-name': "Reservatórios",
        'reserv-costName': toTextStyle('Reservatórios','reserv'),

        'full-shark-level': 'Nível do ' + toTextStyle('Tubarão', 'shark'),
        'full-shark-rank': 'Rank do ' + toTextStyle('Tubarão', 'shark'),
        
        'sharkoid-faith': toTextStyle('Fé Sharkoid','humanoid'),

        'traject-name': "Trajetos",
        'traject-costName': toTextStyle('Trajetos','traject'),

        'curr-top-0-req': x => `Alcançe <b>${format(x)}</b>  ${toTextStyle('Peixes','fish')} totais`, 
        'curr-top-0-reset': x => `Prestigie por <b>${x.format(0)}</b> Fragmentos de ${toTextStyle('Prestígio','prestige')}`,

        'curr-top-0-req': x => `Alcançe <b>${format(x)}</b>  Fragmentos de ${toTextStyle('prestígio','prestige')} totais`, 
        'curr-top-1-reset': x => `Entre no núcleo por <b>${x.format(0)}</b> Fragmentos ${toTextStyle('Magmáticos','core')}`,
        
        'curr-top-2-req': x => `Alcançe <b>${format(x)}</b> ${toTextStyle('Peixes','fish')}`, 
        'curr-top-2-reset': (x,next) => `Evolua seus ${toTextStyle('Tubarões','shark')} para <b>${format(x,0)}</b> ${toTextStyle('Homens','humanoid')}-Tubarões (Próximo em <b>${format(next)}</b> ${toTextStyle('Peixes','fish')})`,

        'curr-top-3-req': x => `Alcançe <b>${format(x)}</b> ${toTextStyle('Peixes','fish')} & <b>8</b> ${toTextStyle('Buracos Negros','black-hole')}`, 
        'curr-top-3-reset': x => `Sacrifique seus ${toTextStyle('Tubarões','shark')} para <b>${format(x,0)}</b> ${toTextStyle('Matéria Negra','black-hole')}`,

        'curr-top-4-req': x => `Alcançe <b>${format(x)}</b> ${toTextStyle('Observatórios','observ')}`, 
        'curr-top-4-reset': x => `Reserve seus observatórios para <b>${format(x,0)}</b> ${toTextStyle('Reservatórios','reserv')}`,

        'curr-top-5-req': x => `Alcançe <b>${format(x)}</b> ${toTextStyle('Reservatórios','reserv')}`, 
        'curr-top-5-reset': x => `Viaje para <b>${format(x,0)}</b> ${toTextStyle('Trajetos','traject')}`,
        
        'radioactive-name': toTextStyle('Radiação '+icon("radioactive"),'core'),

        // Tabs

        'tab-shark': toTextStyle('Tubarão','shark'),
        'tab-options': "Opções",
        'tab-scalings': "Escalas",
        'tab-auto': "Automação",
        'tab-research': toTextStyle('Pesquisa','prestige'),
        'tab-explore': "Exploração",
        'tab-space-base': toTextStyle('Base Espacial','observ'),

        'tab-core': toTextStyle('Núcleo','core'),
        'tab-core-reactor': "Reator do"+toTextStyle(' Núcleo','core'),
        'tab-core-radiation': "Radiação do"+toTextStyle(' Núcleo','core'),
        'tab-core-assembler': "Montador do"+toTextStyle(' Núcleo','core'),

        'tab-evolution': toTextStyle('Evolução','humanoid'),
        'tab-shark-rank': "Rank do"+toTextStyle(' Tubarão','shark'),
        'tab-evolution-tree': "Árvore da"+toTextStyle(' Evolução','humanoid'),
        'tab-evolution-goal': "Objetivos da"+toTextStyle(' Evolução','humanoid'),
        'tab-cultivation': "Cultivação",
        'tab-forge': "Forja",
        'tab-particle-accel': "Acelerador de Partículas",

        'tab-singularity': toTextStyle('Singularidade','black-hole'),
        'tab-black-hole': toTextStyle('Buraco Negro','black-hole'),
        'tab-singularity-milestones': "Marcos Importantes da"+toTextStyle(' Singularidade','black-hole'),
        'tab-solar-system': "Sistema Solar",

        // Elements

        'fish-div': `Seu ${toTextStyle('Tubarão','shark')} comeu <h2>${toTextStyle('0','fish','fish-amount')}</h2> <span id="fish-gain"></span> peixes.`,
        'shark-stats': `Estatisticas do ${toTextStyle(' Tubarão','shark')}<br>Nivél: <h4 id="shark-level">???</h4><br>Rank: <h4 id="shark-tier">???</h4> <span id="shark-next-rank"></span>`,

        'shark-elo-div': `O ELO do ${toTextStyle('Tubarão','shark')} ELO é<h3>${toTextStyle('0','humanoid','shark-elo')}</h3>.`,
        'shark-rank-div': `O Rank do ${toTextStyle('Tubarão','shark')} é <h3 id="shark-rank">0</h3>.`,
        'shark-rank-req-div': `O próximo rank precisa do ELO do ${toTextStyle('Tubarão','shark')}<h4>${toTextStyle('0','humanoid','shark-rank-req')}</h4>.`,
        'shark-rank-note': `Nota: Rank do Tubarão vai ser resetado quando você fazer um reset para Evolução.`,

        'option-title-1': "Opções Principais",
        'option-title-2': "Notações",
        'option-title-3': "Confirmações",
        'option-title-4': "Idiomas",

        'offline-speed': "Acelera o tempo que ficou em off",
        'offline-done': "Pronto",

        'radioactive-div': `O ${toTextStyle('Núcleo','core')} já produziu <h3>${toTextStyle('0 / 1,000 '+icon("radioactive"),'core','radioactive-amount')}</h3> <span id="radioactive-gain"></span>.`,
        get 'radioactive-summary'() {
            var c = toTextStyle('Núcleo','core'), rf = toTextStyle('Peixe '+icon("radioactive"),'fish')
            return `
            <summary>O ${c} experimento da radiação</summary>
            Experimentar uma radiação do núcleo força o reset do ${toTextStyle('Núcleo','core')}.
            Enquanto esta no experimento, os reatores do núcleo core não funcionam. ${toTextStyle('Peixe','fish')}, Fragmentos de ${toTextStyle('Prestígio','prestige')} , e os recursos dos primeiros 4 oceanos sofrem uma raiz cúbica.
            O experimento força seu ${toTextStyle('Tubarão','shark')} a comer ${rf}.<br>
            Melhore com radioativo${rf} para gerar mais ${toTextStyle('Radiação '+icon("radioactive"),'core')}, que dá a voce boosts adicionais.
            `
        },
        'radioboost-div': `Você tem <h3 id="radioactive-boost">0</h3> boosts de radiação.`,

        'core-temp-div': `A temperatura do ${toTextStyle('Núcleo','core')} é <h3>${toTextStyle('6,150','core','core-temperature')}</h3>, que faz impulsionadores de radiação <h4 id="core-temp-effect">100%</h4> melhores.`,
        'core-temp-after-div': `(A temperatura do ${toTextStyle('Núcleo','core')} vai ser <span id="core-temp-after">???</span> depois de um reset do ${toTextStyle('Núcleo','core')})`,
        
        'sharkoid-faith-div': `Você tem <h3 id="sharkoid-faith-spent">0</h3> / <h3 id="sharkoid-faith-total">0</h3> ${toTextStyle('Fé Sharkoid','humanoid')}.`,
        'respec-evolution-tree': `Reseta a sua árvore da ${toTextStyle('evolução','humanoid')}`,
        'export-evolution-tree': `Exporta a sua árvore da ${toTextStyle('evolução','humanoid')}`,
        'import-evolution-tree': `Importa a sua árvore da ${toTextStyle('evolução','humanoid')}`,
        'evolution-tree-preset': `Árvores de ${toTextStyle('evolução','humanoid')} salvas`,
        
        'rerun-evolution': `Faz outra run de ${toTextStyle('evolução','humanoid')}, resetando a árvore`,
        
        'mining-text': `Minerando... <b id="mining-progress">???</b> | Dano <b id="mining-damage">???</b> | ${toTextStyle(`Fortuna da Mineração <span id="mining-fortune">0</span>`+icon("luck"),'gold')}`,
        'super-mining-text': `Super Dano <b id="super-mining-damage">???</b> | ${toColoredText(`Super Fortuna da Mineração <span id="super-mining-fortune">0</span>`+icon("luck"),'orange')}`,
        'mining-tier-div': `Tier da Mineração: <h3 id="mining-tier">0</h3>`,
        'mining-ascend-div': `Ascensão da Mineração: <h3 id="mining-ascend">0</h3>`,
        'mining-note': `Observação: Se você ficar preso enquanto minerar minério com alta saúde (levando muito tempo), você deve recarregar a página.`,
        'mining-tier-undo-btn': `Reduz o Tier de Mineração por 1 se você ficar preso enquanto minerar.`,

        'black-hole-button': `Porque você maximizou todos os aceleradores de partículas, você precisa formar um buraco negro caso entre em outro universo.`,
        'black-hole-html': `Você formou <h2>${toTextStyle('0','black-hole','black-hole-amount')}</h2> buracos negros, que reduz o expoente de peixe & fragmento de prestígio e o multiplicador de fragmentos magmáticos por<h3 id="black-hole-effect">^???</h3>.`,

        'remnant-html': `Você tem <h3>${toTextStyle('0','black-hole','remnant-amount')}</h3> <span id="remnant-gain"></span> sobras.`,

        'rocket-part-div': `Você criou o total de <h3 id="total-rocket-part">0</h3> Partes do Foguete.`,
        'observ-div': `Você tem <h3>${toTextStyle('0','observ','observ-amount')}</h3> <span id="observ-gain"></span> observatórios. (<h3>${toTextStyle('0','observ','observ-total')}</h3> total)`,
        'reserv-div': `Você tem <h3>${toTextStyle('0','reserv','reserv-amount')}</h3> <span id="reserv-gain"></span> reservatórios.`,
        'traject-div': `You have <h3>${toTextStyle('0','traject','traject-amount')}</h3> <span id="traject-gain"></span> trajectories.`,
        
        // Upgrades

        'su-s1-req': "Nível 3",
        'su-s1-name': 'Força do Tubarão',
        'su-s1-desc': `Aumenta a quantidade de ${toTextStyle('Peixes','fish')} comidos por <b>+1</b> por nível.`,

        'su-s2-req': "Nível 7",
        'su-s2-name': 'Agilidade do Tubarão',
        'su-s2-desc': `Aumenta a base do bônus de ${toTextStyle('Peixe','fish')}, referente ao nível do ${toTextStyle('tubarão','shark')} por <b>+1</b> por nível.`,

        'su-s3-req': "Nível 15",
        'su-s3-name': 'Dente do Tubarão',
        'su-s3-desc': `Aumenta o expoente da primeira melhoria do ${toTextStyle('Tubarão','shark')} por <b>+50%</b> por nível.`,

        'su-s4-req': "Nível 38",
        'su-s4-name': 'Expoente do Tubarão',
        'su-s4-desc': `Aumento o expoente do ${toTextStyle('Peixe','fish')} por <b>+1%</b> por nível.`,

        'su-s5-req': "Nível 640",
        'su-s5-name': 'Tubarão Radioativo',
        'su-s5-desc': `Aumenta  a produção de ${toTextStyle('Radiação '+icon("radioactive"),'core')} por <b>x2</b> por nível.`,

        'su-p1-req': "Primeiro prestígio",
        'su-p1-name': 'Super Força do Tubarão',
        'su-p1-desc': `Aumenta a quantidade de ${toTextStyle('Peixes','fish')} comidos por <b>×3</b> por nível.`,

        'su-p2-req': "Primeiro prestígio",
        'su-p2-name': 'Impulsionador de Prestígio',
        'su-p2-desc': `Aumenta a quantidade de ${toTextStyle('Peixes','fish')} comidos por <b>×log10(${toTextStyle('Peixes','fish')})</b> por nível.`,

        'su-p3-name': 'Tubarão Escalonado',
        'su-p3-desc': `Atrasa o primeiro nível do ${toTextStyle('Tubarão','shark')} escala por <b>+1</b> por nível.`,

        'su-m1-name': 'Dano da Mineração',
        'su-m1-desc': `Aumenta o dano da mineração por <b>×2</b> por nível.`,

        'su-m2-name': 'Velocidade da Mineração',
        'su-m2-desc': `Aumenta a velocidade da mineração por <b>+10%</b> por nível.`,

        'su-m3-req': 'Tier 3 da Mineração',
        'su-m3-name': 'Pedra comprimida',
        'su-m3-desc': `Aumenta <b>Pedra</b> minerada por <b>×2</b> por nível.`,

        'su-m4-req': 'Tier 6 da Mineração',
        'su-m4-name': 'Fortuna da Mineração',
        'su-m4-desc': `Aumenta a ${toTextStyle('Fortuna da Mineração '+icon('luck'),'gold')} por <b>+5</b> por nível.`,

        'su-m5-req': 'Tier 9 da Mineração',
        'su-m5-name': 'Minérios Básicos',
        'su-m5-desc': `Aumenta os primeiros 4 minérios minerados por <b>×2</b> por nível.`,

        'su-m6-req': 'Ascensão da Mineração 1',
        'su-m6-name': 'Super Dano da Mineração',
        'su-m6-desc': `Aumenta o super dano da mineração por <b>×2</b> por nível.`,

        'su-m7-req': 'Ascensão da Mineração 3',
        'su-m7-name': 'Super Velocidade da Mineração',
        'su-m7-desc': `Aumenta a normal e super velocidade da mineração por <b>+25%</b> por nível.`,
        
        // Researches

        'research-p1-name': "Agilidade Prestigiosa",
        'research-p1-desc': `'Agilidade de tubarão' agora afeta a base do bônus de Fragmentos de ${toTextStyle('prestígio','prestige')} do nível do ${toTextStyle('Tubarão','shark')} em uma taxa reduzida.`,

        'research-p2-name': "Melhoria EL de tubarão",
        'research-p2-desc': `as melhorias de ${toTextStyle("Peixe",'fish')} do ${toTextStyle("Tubarão",'shark')} não mais gastam ${toTextStyle("Peixes",'fish')}.`,

        'research-p3-name': "Nível de tubarão melhorado",
        'research-p3-desc': `Reduz a base do requerimento do nível do ${toTextStyle("Tubarão",'shark')} em <b>1</b>,
        mas força um reinício de ${toTextStyle("prestígio",'prestige')}, redefinindo seus Fragmentos de ${toTextStyle('prestígio','prestige')} e Melhorias de ${toTextStyle('prestígio','prestige')}
        Desbloqueie novas melhorias de ${toTextStyle("Tubarão",'shark')}.`,

        'research-p4-name': "Reinício melhor",
        'research-p4-desc': `Levemente melhore a formula do ganho de Fragmentos de ${toTextStyle('prestígio','prestige')}.`,

        'research-p5-name': "Mega Força",
        'research-p5-desc': `'Superforça de tubarão' é <b>1%</b> mais forte para cada nível do${toTextStyle("Tubarão",'shark')} , começando em 100.`,

        'research-p6-name': "Tubarão Superescalonado ",
        'research-p6-desc': `'Tubarão escalonado' é <b>duas veses</b> mais forte.`,

        'research-p7-name': "Melhores Recursos I",
        'research-p7-desc': `o efeito de ${toTextStyle("Corais",'coral')} e ${toTextStyle("Gelo",'ice')}  é melhor.`,

        'research-p8-name': "Nível do Tubarão 3.0",
        'research-p8-desc': `Reduz ainda mais a base do requerimento do Nível do ${toTextStyle("Tubarão",'shark')} por 1.`,

        'research-p9-name': "Impulsionador de Prestígio mais barato",
        'research-p9-desc': `Reduz o escalonamento da dilatação do 'Impulsionador de Prestígio' por <b>-0.05</b> por nível.`,

        'research-e1-name': "Sinergia oceânica I",
        'research-e1-desc': `${toTextStyle("Sal",'salt')} Impulsiona a quantidade de ${toTextStyle("Corais",'coral')} gerada.`,

        'research-e2-name': "Sinergia oceânica II",
        'research-e2-desc': `${toTextStyle("Neve Comprimida",'snow')} Impulsiona a quantidade de ${toTextStyle("Gelo",'ice')} gerado.`,

        'research-e3-name': "Automação da Exploração",
        'research-e3-desc': `Automaticamente ganha a base dos primeiros <b>X</b> oceanos sem precisar explorar.`,

        'research-c1-name': "Mantedor C de pesquisa",
        'research-c1-desc': `Mantenha ${toTextStyle("Pesquisa",'prestige')} ao entrar no ${toTextStyle('Núcleo','core')}.`,

        'research-c2-name': "Mantedor C de exploração",
        'research-c2-desc': `Mantenha os primeiros <b>X</b> oceanos desbloqueados e a profundidade deles ao entrar no  ${toTextStyle('Núcleo','core')}.`,

        'research-c3-name': "Afeição I do neon",
        'research-c3-desc': `<b>Neon</b> agora afeta 'Dente de tubarão', 'Expoente de tubarão', and 'Tubarão escalonado'.`,

        'research-c4-name': "Nickel Aprimorado",
        'research-c4-desc': `o poder do efeito do <b>Nickel</b> é <b>dobrado</b> `,

        // Exploration

        'explore-while': `Enquanto se explora`,
        'explore-inside': (a,b,c)=>`Base ${a.format()}/s`+(b.gt(a) ? " ➜ " : " ~ ")+`${b.format()}/s`+`.<br>Alcançe mais do que ${format(c,0)}  ${toTextStyle("Peixes",'fish')}.`,
        'explore-outside': x=>`Seu valor base atual é ${x.format()}/s.<br>Explore o oceano!`,

        'explore-next': x=>`Próximo oceano no nível <h3>${format(x,0)}</h3> do ${toTextStyle("Tubarão",'shark')}`,

        'explore-doubler-1': x=>`Dobra ${x} ganho(s).`,
        'explore-doubler-2': `Dobra profundidade de progresso ganha.`,

        'explore-0-name': `Oceano Pacífico`,
        'explore-0-desc': `${toTextStyle('Peixes','fish')} gain is rooted by 2.`,
        'explore-0-milestone': [
            `Incremente Fragmentos de ${toTextStyle('prestígio','prestige')} ganhos à potencia de 1.05.`,
            `Aumenta o recurso e a profundidade de progresso em 1.25 elevado à raiz quadrada do nível de ${toTextStyle('Tubarão','shark')} .`,
            `Melhorar o ${toTextStyle('Tubarão','shark')} não vai mais gastar ${toTextStyle('Peixes','fish')}.`,
            `Incremente ${toTextStyle('Peixes','fish')} comidos à potencia de 1.05.`,
            `Desbloqueie o ${toTextStyle('Núcleo','core')}.`,
        ],

        'explore-1-name': `Oceano ártico`,
        'explore-1-desc': `Redefine seus Fragmentos de ${toTextStyle('prestígio','prestige')} e Melhorias de ${toTextStyle('prestígio','prestige')}. O ganho de Fragmentos de ${toTextStyle('prestígio','prestige')}  é enraizado em 2.`,
        'explore-1-milestone': [
            `Desbloqueia Auto melhorias de ${toTextStyle('Prestígio','prestige')} de ${toTextStyle('Tubarão','shark')}.`,
            `Aumenta o recurso e a profundidade de progresso em 1.25 elevado à raiz quadrada do nível de ${toTextStyle('Tubarão','shark')} .`,
            `Melhorias de ${toTextStyle('Prestígio','prestige')} de ${toTextStyle('Tubarão','shark')} não mais irão gastar Fragmentos de ${toTextStyle('prestígio','prestige')}.`,
            `Passivamente gere 100% dos Fragmentos de ${toTextStyle('prestígio','prestige')} ganhos no ${toTextStyle('Prestígio','prestige')}.`,
        ],

        'explore-2-name': `Atlantic Ocean`,
        'explore-2-desc': `Redefine seus Fragmentos de ${toTextStyle('prestígio','prestige')} e Melhorias de ${toTextStyle('prestígio','prestige')}. O escalonamento do nível do ${toTextStyle('Tubarão','shark')} tem 10x sua força normal` ,
        'explore-2-milestone': [
            `Os escalonamentos de 'Dentes de Tubarão' and 'Expoente de Tubarão' são levemente mais fracos.`,
            `Aumenta o recurso e a profundidade de progresso em 1.25 elevado à raiz quadrada do nível de ${toTextStyle('Tubarão','shark')} .`,
            `O primeiro escalonamento do nível de ${toTextStyle('Tubarão','shark')} começa +1 mais tarde por 500m de profundidade.`,
            `O poder do efeito do oceano é reduzido à metade.`,
        ],

        'explore-3-name': `Southern Ocean`,
        'explore-3-desc': `Redefine seus Fragmentos de ${toTextStyle('prestígio','prestige')} e Melhorias de ${toTextStyle('prestígio','prestige')}. Você não consegue comprar melhorias de${toTextStyle('Tubarão','shark')}, ${toTextStyle('Peixes','fish')}, e ${toTextStyle('Prestige','prestige')}.`,
        'explore-3-milestone': [
            `Aumenta a base da exploração em 10x.`,
            `Aumenta o recurso e a profundidade de progresso em 1.25 elevado à raiz quadrada do nível de ${toTextStyle('Tubarão','shark')} .`,
            `O poder do efeito do oceano é reduzido à metade.`,
        ],

        // Core Reactor

        'core-0-name': `Ferro`,
        'core-0-desc': `${toTextStyle("Peixes",'fish')} se elevam baseado no nível do <b>Ferro</b>.`,

        'core-1-name': `Nickel`,
        'core-1-desc': `Fragmentos de ${toTextStyle('prestígio','prestige')} elevam a sua base baseado no nível do <b>Nickel</b>.`,

        'core-2-name': `Oxigênio`,
        'core-2-desc': `Produto da multiplicação dos recursos dos 4 primeiros oceanos Impulsiona a produção deles baseado no nível do <b>Oxigênio</b>.`,

        'core-3-name': `Neon`,
        'core-3-desc': `Nível do ${toTextStyle("Tubarão",'shark')} reduz o seu requerimento baseado no nível do <b>Neon</b>.`,

        'core-bonus': x => `Produto dos reatores do núcleo Impulsiona a produção de ${toTextStyle("Peixes",'fish')} em <h4>${formatMult(x)}</h4>.`,

        // Automation

        'auto-shark-name': `Auto melhoria do nível de ${toTextStyle("Tubarão",'shark')}`,
        'auto-su-name': `Auto melhoria '${toTextStyle("Peixe","fish")}' de ${toTextStyle("Tubarão",'shark')}  `,
        'auto-spu-name': `Auto melhoria '${toTextStyle("Prestígio","prestige")}' de ${toTextStyle("Tubarão",'shark')} `,
        'auto-eu-name': `Auto melhoria de Exploração`,
        'auto-core_reactor-name': `Auto-${toTextStyle("Núcleo","core")} do Reator`,
        'auto-core_radiation-name': `Auto-Radiação do ${toTextStyle("Núcleo","core")}`,
        'auto-radioactive_boosts-name': `Auto-Impulsionadores Radioativos`,
        'auto-mining_upgs-name': `Auto-Melhoria de Mineração do ${toTextStyle("Tubarão","shark")}`,
        'auto-humanoid-name': `Auto-${toTextStyle("Homens","humanoid")}-Tubarões`,
        'auto-research-name': `Auto-Pre-Pesquisa da ${toTextStyle("Singularidade","black-hole")}`,
        'auto-mining_tier-name': `Auto-Tier da Mineração`,
        'auto-remnant-name': `Auto-Melhorias de ${toTextStyle("Sobras","black-hole")}`,
        'auto-faith-name': `Auto-${toTextStyle("Fé Sharkoid","humanoid")}`,

        'auto-cost': (D,cost,name) => `Diminua o intervalo em ${formatReduction(D,0)}.<br>Custo: ${format(cost,0)} ${name}`,
        'auto-interval': (a,b,maxed) => `Intervalo: ${format(a,3)}s`+(maxed ? "" :` ➜ ${format(b,3)}s`),

        // Progress

        'progress-0-text': r => `Alcançe ${format(r)} ${toTextStyle('Peixes','fish')} no total `, 
        get 'progress-0-cond-text'() { return `Faça um ${toTextStyle('Prestígio','prestige')}` },

        'progress-1-text': r => `Alcançe ${format(r)} Fragmentos de ${toTextStyle('prestígio','prestige')} para desbloquear Automação`,
        'progress-2-text': r => `Alcançe ${format(r)} Fragmentos de ${toTextStyle('prestígio','prestige')} para desbloquear Research`,
        'progress-3-text': r => `Alcançe nível de ${toTextStyle('Tubarão','shark')} ${format(r,0)} para desbloquear Exploração`,
        'progress-4-text': r => `Alcançe ${format(r)}m of Pacific ocean's depth para desbloquear the ${toTextStyle('Núcleo','core')}`,

        'progress-5-text': r => `Alcançe ${format(r)} Fragmentos de ${toTextStyle('prestígio','prestige')} totais`, 
        get 'progress-5-cond-text'() { return `Entre o ${toTextStyle('Núcleo','core')}` },

        'progress-6-text': r => `Alcançe ${format(r)} Fragmentos ${toTextStyle('Magmaticos','core')} para desbloquear o proximo conteudo do ${toTextStyle('Núcleo','core')}`, 
        'progress-7-text': r => `Alcançe o Nível do ${toTextStyle('Tubarão','shark')} ${format(r,0)} para desbloquear o proximo tipo de oceano`, 
        'progress-8-text': r => `Alcançe ${format(r)} Fragmentos ${toTextStyle('Magmaticos','core')} para desbloquear o proximo conteudo do ${toTextStyle('Núcleo','core')}`, 
        'progress-9-text': r => `Alcançe ${format(r)} ${toTextStyle('Peixes','fish')} no total para desbloquear os novos reatores do ${toTextStyle('Núcleo','core')}`, 

        'progress-10-text': r => `Alcançe ${format(r)} ${toTextStyle('Peixes','fish')} no total`, 
        get 'progress-10-cond-text'() { return `Evolua seus ${toTextStyle('Tubarões','shark')}` },

        'progress-11-text': r => `Alcançe ${format(r,0)} ${toTextStyle('Homens','humanoid')}-tubarões para desbloquear o proximo conteudo da ${toTextStyle('Evolução','humanoid')}`, 
        'progress-12-text': r => `Alcançe ${format(r,0)} ${toTextStyle('Homens','humanoid')}-tubarões para desbloquear o proximo conteudo da ${toTextStyle('Evolução','humanoid')}`, 
        'progress-13-text': r => `Chega ao Tier de Mineração ${format(r,0)} para desbloquear a proxima linha da árvore da ${toTextStyle('Evolução','humanoid')}`, 
        'progress-14-text': r => `Chega ao Tier de Mineração ${format(r,0)} para desbloquear o proximo conteudo da ${toTextStyle('Evolução','humanoid')}`, 
        'progress-15-text': r => `Chega ao Tier de Mineração ${format(r,0)} para desbloquear o proximo conteudo da ${toTextStyle('Evolução','humanoid')}`,

        'progress-16-text': r => `Encha ${format(r,0)} aceleradores de particula`, 
        get 'progress-16-cond-text'() { return `Forma ${toTextStyle('Buraco Negro','black-hole')}` },

        'progress-17-text': r => `Forma ${format(r,0)} ${toTextStyle('Buracos Negros','black-hole')}`,

        'progress-18-text': r => `Alcançe ${format(r)} ${toTextStyle('Peixe','fish')} no total`, 
        get 'progress-18-cond-text'() { return `Faça um ${toTextStyle('Sacrificio','black-hole')}` },

        'progress-19-text': r => `Alcançe ${format(r)} ${toTextStyle('Matéria Negra','black-hole')} no total`,

        'maxed-progress': "Todas as funcionalidades desbloqueadas!",

        // Reset

        get 'reset-prestige-message'() {
            let p = toTextStyle('Prestígio','prestige'), s = toTextStyle('Tubarão','shark'), f = toTextStyle('Peixes','fish')
            return `
            <h3>${p}</h3><br>
            ${p} é a primeira camada de reinício. Prestigiar redefine seu ${s}, melhorias de ${s} , e ${f} por Fragmentos de ${p}.
            Primeiro ${p} Desbloqueia novas melhorias de ${s}.<br>
            <img src="textures/PrestigeShard.png"><br>
            Você tem certeza que você gostaria de prestigiar?
            `
        },
        get 'reset-core-message'() {
            let c = toTextStyle('Núcleo','core'), m = toTextStyle('Magmáticos','core'), p = toTextStyle('Prestígio','prestige')
            return `
            <h3>O ${c}</h3><br>
            O ${c} é a segunda camada de reinício. Entrar no núcleo redefine tudo que ${p} redefine, quanto Fragmentos de ${p}, melhorias de ${p}, ${toTextStyle('Pesquísa','prestige')} (quase), and Exploração por Fragments ${m} ,
            desbloqueando o reator do ${c} pela primeira vez.<br>
            <img src="textures/Magmatic.png"><br>
            Você tem certeza que gostaria de entrar no núcleo?
            `
        },
        
        // Other
        
        'scalings': {
            'shark_level' : `Nível do Tubarão`,
            'shark_rank' : `Rank do Tubarão`,
            'su_s3' : `Melhoria "Dente do Tubarão"`,
            'su_s4' : `Melhoria "Expoente do Tubarão"`,
            'su_m1' : `Melhoria "Dano da Mineração"`,
            'su_m3' : `Melhoria "Pedra comprimida"`,
            'su_m5' : `Melhoria "Minérios Basicos"`,
            'cr_boost' : `Impulsos Radioativos`,
            'mining_tier' : `Tier da Mineração`,
            'mining_ascend' : `Ascensão da Mineração`,
            'remnant_upg' : `Melhorias de Sobra`,
        },
        'scaling-start': "Começa em",
        'scaling-mode': {
            "L": x => `<b>${x}</b> linearmente`,
            "D": x => `<b>${x}</b> ao expoente`,
        },
        'scaling-info': `Escalas vão aparecer quando você chegar nelas. <b>N</b> - Quantidade, <b>S</b> - Começo`,

        'shark-bonus-remnants': x => `+${x.format(0)} ${toTextStyle('Sobras','black-hole')}`,

        'shark-overpopulation': (x,y) => `Por causa da superpopulação do ${toTextStyle('Tubarão','shark')} em <h4>${toTextStyle(format(y),'fish')}</h4>, ${toTextStyle('Peixe','fish')} comido, ganho de ${toTextStyle('Peixe','fish')} é reduzido por <h4>${format(x,3)}√</h4>.`,

        'shark-rank-bonuses': {
            fish: x => `${formatPow(x)} ${toTextStyle('Peixe','fish')}`,
            prestige: x => `${formatPow(x)} Fragmento de ${toTextStyle('Prestígio','prestige')}`,
            mining_damage: x => `${formatMult(x)} Dano da Mineração`,
            so: x => `${formatPow(x)} Atraso da superpopulação do ${toTextStyle('Tubarão','shark')}`,
            vibranium: x => `${formatMult(x)} <b>Vibranium</b>`,
            remnants: x => `${formatMult(x)} ${toTextStyle('Sobras','black-hole')}`,
        },

        'reward': "Recompensa",
        'new-preset': "Novo Preset",
        'maxed': "Maximizado",
        'difficulty': "Dificuldade",

        'remove': "Remova",
        'overwrite-current': "Substitir Atual",
        'load': "Carregar",
        'force-load': "Forcar Carregamento",

        'upgrade-shark': x => `Melhore nível de ${toTextStyle('Tubarão','shark')}<br>Custo: ${x.format(0)} ${toTextStyle('Peixes','fish')}`,
        'shark-bonus-fish': x => `+${x.format(0)} produção base dos ${toTextStyle('Peixes','fish')} `,
        'shark-bonus-prestige': x => `${formatMult(x)} Fragmento de ${toTextStyle('Prestígio','prestige')} `,
        'shark-bonus-core': x => `${formatMult(x)}  Fragmentos ${toTextStyle('Magmáticos','core')}`,

        'level': "Nível",
        'effect': "Efeito",
        'cost': "Custo",
        'buyMax': "Comprar max",
        'require': "Requer",
        'next-at': "Próximo em",
        'depth': "Profundidade",

        'research-afford': bool => bool ? "Comprar" : "Não se pode pagar",
        'research-bought': bool => bool ? `<b>Comprado</b>` : `<b>Não comprado</b>`,

        'off-on': bool => bool ? "Ligado" : "Desligado",

        'popup-buttons': [
            ["Sim","Não"],
            ["Ok","Cancelar"],
        ],

        'popup-desc' : {
            import: `Copie seu save. CUIDADO: IRÁ SUBSTITUIR SEU SAVE ATUAL!`,
            wipe: ` Você tem certeza que gostaria de limpar seu save? Para limpar, digite "<span class="free-select">I'm sorry what I don't want sharks!</span>"`,
        },

        'notify-desc' : {
            save: "Jogo salvo!",
        },

        'radio-desc' : {
            'notation': ['Notação de formatação',['Científico','Padrão','Científico mixo']],
            'comma-format': ['Maximas OdM com vírgulas',['3','6','9','12','15']],
            'autosave': ['Autosave',['Desabilitado','Habilitado']],
            'autosave-time': ['Intervalo de autosave ',['15s','30s','60s','120s']],
            'offline': ['Progresso Offline',['Desabilitado','Habilitado']],
        },

        'radio-desc-default' : ['Desabilitado','Habilitado'],

        'prompt-placeholder': "Digite texto aqui...",

        'option-buttons-text': ["Salve","Exportar via área de transferência","Exportar via arquivo","Importar via área de transferência","Exportar via arquivo","LIMPAR!!!"],

        'confirm-prestige': "Prestígio",
        'confirm-core': "Entre no núcleo",
        'confirm-humanoid': "Evolua seu Tubrão",
        'confirm-black-hole': "Forma o Buraco Negro",
        'confirm-sacrifice': "Sacrifica seus Tubarões",
    },
}
