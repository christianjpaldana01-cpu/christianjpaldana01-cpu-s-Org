import { AnatomicalLayer, ChemicalProcessData, QuizQuestion } from '../types/hair';

export const HAIR_IMAGES = {
  cuticleSem: '/src/assets/images/microscope_cuticle_sem_1793157516322.jpg',
  cortexUltrastructure: '/src/assets/images/hair_cortex_ultrastructure_1793157517425.jpg',
  follicleAnatomy: '/src/assets/images/hair_follicle_anatomy_1793157517965.jpg',
  keratinBonds: '/src/assets/images/keratin_molecular_bonds_1793157518241.jpg',
};

export const ANATOMICAL_LAYERS: AnatomicalLayer[] = [
  {
    id: 'epicuticle',
    name: 'Epicutícula (Capa F / 18-MEA)',
    category: 'shaft',
    depth: '0 - 10 nm',
    magnification: '100,000x',
    scientificName: 'Epicuticula cum acido 18-methyleicosanoico',
    shortDescription: 'Monocapa externa hidrofóbica unida covalentemente mediante enlaces tioéster a la cisteína.',
    detailedFunction: 'Actúa como el escudo impermeabilizante natural del cabello. Confiere hidrofobicidad, suavidad al tacto, brillo natural y reduce la fricción entre fibras capilares en más de un 60%. Es la primera barrera defensiva frente al agua y agresores químicos.',
    biochemicalComposition: 'Ácido 18-metileicosanoico (18-MEA), lípidos libres, ceramidas y cisteína condensada (12% de enlaces azufrados superficiales).',
    clinicalImportance: 'El 18-MEA se destruye irreversivamente en la primera decoloración o aplicación alcalina fuerte (>pH 9.0), transformando el cabello de hidrofóbico (repele agua) a hidrofílico (absorbe agua en exceso, se hincha y se vuelve quebradizo). Requiere reposición de lípidos biomiméticos.',
    phBehavior: 'Estable en pH ácido (3.5 - 5.5). Se hidrolizan los enlaces tioéster con álcalis persistentes a pH > 9.0.',
    imageUrl: HAIR_IMAGES.cuticleSem
  },
  {
    id: 'exocuticle',
    name: 'Exocutícula (Capa A & B)',
    category: 'shaft',
    depth: '10 - 250 nm',
    magnification: '50,000x',
    scientificName: 'Exocuticula keratinosa alta cisteina',
    shortDescription: 'Capa intermedia de cada escama cuticular, altamente reticulada y extraordinariamente rígida.',
    detailedFunction: 'Aporta resistencia mecánica frente a la abrasión, tracción del cepillado y herramientas térmicas. Contiene una subcapa exterior llamada "Capa A", que posee la mayor densidad de azufre de toda la fibra capilar (hasta 30% cistina).',
    biochemicalComposition: 'Queratina ultra-dura rica en cisteína (30-35% de cistina), enlaces disulfuro (-S-S-) transversales densamente empaquetados.',
    clinicalImportance: 'Determina la rigidez y resistencia al desgaste mecánico. Al desgastarse por cepillados agresivos o calor excesivo (>200°C), deja expuesta la vulnerable endocutícula.',
    phBehavior: 'Resistente a deformaciones elásticas; hinchamiento limitado excepto ante agentes queratolíticos o reductores fuertes.',
    imageUrl: HAIR_IMAGES.cuticleSem
  },
  {
    id: 'endocuticle',
    name: 'Endocutícula',
    category: 'shaft',
    depth: '250 - 450 nm',
    magnification: '50,000x',
    scientificName: 'Endocuticula spongiosa humilis cisteina',
    shortDescription: 'Capa basal interna de la célula cuticular, porosa, elástica y baja en cisteína.',
    detailedFunction: 'Amortigua los impactos mecánicos y actúa como esponja hidrófila interna. Al contacto con agua o agentes alcalinos, es la capa que más se expande volumétricamente, provocando el levantamiento angular de las escamas.',
    biochemicalComposition: 'Proteínas no queratínicas con bajo contenido en azufre (~3% cistina), alta concentración de residuos de ácido aspártico y glutámico.',
    clinicalImportance: 'Es el talón de Aquiles de la cutícula. Las soluciones alcalinas (amoníaco, carbonato amónico) la hinchan drásticamente, permitiendo que la cutícula se abra para dar paso al tinte o decolorante. Si se lava repetidamente con champús alcalinos, la endocutícula se degrada enzimática y mecánicamente.',
    phBehavior: 'Hinchamiento exponencial a pH > 8.5. Retrae su volumen a su punto isoeléctrico (pH 3.67).',
    imageUrl: HAIR_IMAGES.cuticleSem
  },
  {
    id: 'cmc',
    name: 'Complejo de Membrana Celular (CMC)',
    category: 'shaft',
    depth: '30 - 40 nm entre células',
    magnification: '80,000x',
    scientificName: 'Complexus membranarum cellularum',
    shortDescription: 'El "cemento intercelular" trilaminar que une escamas cuticulares entre sí y células corticales.',
    detailedFunction: 'Consiste en una capa central proteica (Capa Delta, 15 nm) flanqueada por dos bicapas lipídicas (Capas Beta, 5 nm cada una). Garantiza la adhesión celular continua a lo largo de todo el tallo capilar y regula la difusión de moléculas al interior del córtex.',
    biochemicalComposition: 'Bicapa lipídica de ceramidas tipo 1 a 6, colesterol, ésteres de colesterol, ácidos grasos libres (oleico, palmítico) y glucosilceramidas unidas a la capa delta proteica.',
    clinicalImportance: 'La pérdida de CMC causa deslaminación de las escamas (pérdida de cutícula a trozos) y rotura interna del cabello. Tratamientos de nutrición profunda y selladores con ceramidas restauran la cohesión intercelular.',
    phBehavior: 'Sensible a solventes lipídicos y tensoactivos aniónicos agresivos (SLS sin amortiguar).',
    imageUrl: HAIR_IMAGES.cortexUltrastructure
  },
  {
    id: 'cortex',
    name: 'Córtex o Corteza Capilar',
    category: 'shaft',
    depth: '2 - 70 µm (80-90% de la masa total)',
    magnification: '10,000x',
    scientificName: 'Cortex pilorum fusiformis',
    shortDescription: 'El núcleo de fuerza estructural, elasticidad, color y masa mecánica del cabello.',
    detailedFunction: 'Compuesto por millones de células corticales fusiformes (alargadas, de 100 µm de longitud) orientadas en paralelo al eje longitudinal del cabello. En su interior residen las macrofibrillas, microfibrillas y los gránulos de melanina que confieren el color natural.',
    biochemicalComposition: '85-90% queratina fibrosa dura rica en aminoácidos cisteína, serina y arginina; matriz interfibrilar amorfa rica en azufre; gránulos de eumelanina y feomelanina.',
    clinicalImportance: 'Aquí ocurren el 100% de los procesos químicos permanentes de la peluquería: decoloración (destrucción oxidativa de melaninas), permanente/alisado (ruptura y reformación de puentes disulfuro) y tintes permanentes (polimerización oxidativa de precursores).',
    phBehavior: 'Mantiene máxima resistencia mecánica en el punto isoeléctrico (pH 3.67). A pH muy ácido (<2) o muy alcalino (>10), los enlaces salinos se disocian y la fibra pierde hasta el 50% de su límite elástico.',
    imageUrl: HAIR_IMAGES.cortexUltrastructure
  },
  {
    id: 'macrofibrils',
    name: 'Macrofibrillas & Microfibrillas (Filamentos Intermedios)',
    category: 'shaft',
    depth: '0.1 - 0.4 µm',
    magnification: '150,000x',
    scientificName: 'Macrofibrillae et microfibrillae intermediate filament',
    shortDescription: 'Cilindros de cableado molecular organizados como cuerdas de acero compuestas por queratina.',
    detailedFunction: 'Una célula cortical contiene varios cientos de macrofibrillas. Cada macrofibrilla agrupa de 500 a 800 microfibrillas (filamentos intermedios de queratina de 7-8 nm de diámetro), embebidas en una matriz amorfa rica en proteínas KAP (Keratin-Associated Proteins).',
    biochemicalComposition: 'Queratinas epiteliales K31-K40 tipo I (ácidas) y K81-K86 tipo II (neutras/básicas) asociadas en heterodímeros; matriz de proteínas ricas en cisteína (KAP).',
    clinicalImportance: 'El deslizamiento relativo de estas microfibrillas bajo calor extremo y tracción es la base física del planchado térmico (temporal, altera puentes de H) y de la nanoplastia / alisado químico (permanente, altera enlaces covalentes).',
    phBehavior: 'Sensibles a la combinación sinérgica de calor (>180°C) y medios ácidos o alcalinos.',
    imageUrl: HAIR_IMAGES.cortexUltrastructure
  },
  {
    id: 'protofilaments',
    name: 'Protofilamentos y Dímeros α-Hélice',
    category: 'molecular',
    depth: '2 - 4 nm',
    magnification: '1,000,000x',
    scientificName: 'Protofilamentum et dimerum alpha-helix',
    shortDescription: 'La escala nanoscópica: dos hélices de polipéptidos enrolladas entre sí en superhélice (coiled-coil).',
    detailedFunction: 'Dos hélices alfa de queratina (una ácida y una básica) se asocian en paralelo para formar un dímero. Dos dímeros se asocian de forma antiparalela y escalonada para dar un tetrámero o protofilamento. 8 protofilamentos forman una microfibrilla cilíndrica.',
    biochemicalComposition: 'Cadenas de 400-500 aminoácidos plegadas en espiral dextrógira de 3.6 residuos por vuelta, estabilizadas por puentes de hidrógeno intracadena y enlaces hidrofóbicos.',
    clinicalImportance: 'Cuando se estira el cabello húmedo hasta un 30-50%, la estructura pasa reversiblemente de conformación α-queratina (hélice) a β-queratina (lámina plegada extendida). Si se fuerza más allá del 50%, se rompen enlaces covalentes y sobreviene la fractura plástica.',
    phBehavior: 'Desnaturalización térmica a 230-240°C en cabello seco y a 140-150°C en cabello húmedo (cauterización capilar).',
    imageUrl: HAIR_IMAGES.keratinBonds
  },
  {
    id: 'medulla',
    name: 'Médula Capilar',
    category: 'shaft',
    depth: 'Eje central (0 - 15 µm)',
    magnification: '10,000x',
    scientificName: 'Medulla pilorum spongiosa',
    shortDescription: 'Canal cilíndrico central continuo, discontinuo o ausente, con vacuolas de aire.',
    detailedFunction: 'Se encuentra principalmente en cabellos gruesos, canas y vello terminal masculino. Está compuesta por células queratinizadas esféricas poco cohesionadas separadas por espacios llenos de gas o aire. Su función biológica principal en mamíferos es el aislamiento térmico.',
    biochemicalComposition: 'Queratina amorfa de bajo contenido en cistina, alta presencia de lípidos libres y citrulina; gran volumen de aire intersticial.',
    clinicalImportance: 'No influye en la resistencia mecánica ni en la retención del color del tinte. Sin embargo, en cabellos rubios o canosos, las vacuolas de aire en la médula dispersan la luz, alterando el brillo óptico y la percepción visual del tono.',
    phBehavior: 'Relativamente inerte; los tratamientos cosméticos no tienen como diana la médula.',
    imageUrl: HAIR_IMAGES.cortexUltrastructure
  },
  {
    id: 'dermal_papilla',
    name: 'Papila Dérmica y Bulbo Piloso',
    category: 'follicle',
    depth: '3 - 5 mm (en dermis profunda / hipodermis)',
    magnification: '500x',
    scientificName: 'Papilla dermalis et bulbus pili',
    shortDescription: 'El centro neurálgico metabólico y vascular donde nace y se programa la vida del cabello.',
    detailedFunction: 'Estructura cónica de tejido conectivo invaginada en la base del bulbo. Contiene una densa red de capilares sanguíneos que aportan glucosa, aminoácidos, oxígeno y minerales a las células matriciales de alta proliferación. Produce factores de crecimiento clave (FGF-7, VEGF, Wnt).',
    biochemicalComposition: 'Matriz extracelular rica en colágeno tipo IV, laminina, fibronectina y proteoglicanos con células mesenquimales papilares especializadas.',
    clinicalImportance: 'Es la diana de la nutrición capilar sistémica, mesoterapia, factores de crecimiento y tratamientos contra la alopecia androgenética (receptores de DHT). Sin una papila dérmica sana y oxigenada, la fase anágena se acorta y la fibra nace adelgazada y quebradiza.',
    phBehavior: 'Ambiente fisiológico homeostático estricto (pH sanguíneo 7.35 - 7.45).',
    imageUrl: HAIR_IMAGES.follicleAnatomy
  },
  {
    id: 'germinative_matrix',
    name: 'Matriz Germinativa y Melanocitos Folriculares',
    category: 'follicle',
    depth: 'Base del bulbo sobre la papila',
    magnification: '1,500x',
    scientificName: 'Matrix germinativa folliculi pili',
    shortDescription: 'Células madre pluripotentes en continua mitosis y melanocitos sintetizadores de pigmento.',
    detailedFunction: 'Presenta una de las tasas de división celular más rápidas del cuerpo humano (tiempo de duplicación de ~24 horas). Las células hijas migran hacia arriba, se diferencian, se alargan, sintetizan queratina masivamente y sufren apoptosis programada para formar el tallo muerto queratinizado. Los melanocitos transfieren melanosomas con eumelanina/feomelanina a los queratinocitos corticales en ascenso.',
    biochemicalComposition: 'Queratinocitos basales inmaduros, melanocitos dendríticos con enzimas tirosinasa, TRP-1 y TRP-2.',
    clinicalImportance: 'Sustrato directo de la textura del cabello (forma del bulbo) y del color natural. Cuando los melanocitos agotan su capacidad de biosíntesis (canicie / senescencia melanocítica), el córtex emerge desprovisto de pigmento (pelo blanco/canoso).',
    phBehavior: 'Sensible a citostáticos (quimioterapia) y radiación, lo que explica la caída de anágeno inmediata.',
    imageUrl: HAIR_IMAGES.follicleAnatomy
  },
  {
    id: 'root_sheaths',
    name: 'Vainas Radiculares (Interna y Externa)',
    category: 'follicle',
    depth: 'Desde el bulbo hasta el istmo',
    magnification: '800x',
    scientificName: 'Vagina radicularis interna (Henle, Huxley, cuticula) et externa',
    shortDescription: 'El molde cilíndrico rígido que guía y esculpe la forma transversal del tallo capilar en formación.',
    detailedFunction: 'La Vaina Radicular Interna (IRS) se divide en tres capas: Capa de Henle (la primera en cornificarse), Capa de Huxley (con gránulos de tricohialina) y Cutícula de la vaina (con escamas orientadas hacia abajo que engranan con las escamas hacia arriba del tallo, fijando el pelo al cuero cabelludo). La Vaina Radicular Externa (ORS) contiene el reservorio de células madre en el "bulge" (protuberancia folicular).',
    biochemicalComposition: 'Tricohialina, queratina K6hf, involucrina, transglutaminasa y queratinas foliculares blandas.',
    clinicalImportance: 'La IRS actúa como un troquel o molde rígido: si el canal es circular el cabello es liso; si es curvado y elíptico, el cabello nace rizado. Además, cuando un cabello se arranca en anágeno, la IRS sale pegada al bulbo (la llamada "raíz blanca").',
    phBehavior: 'Cornificación intracelular mediada por calcio y enzimas transglutaminasas.',
    imageUrl: HAIR_IMAGES.follicleAnatomy
  },
  {
    id: 'sebaceous_arrector',
    name: 'Glándula Sebácea y Músculo Erector del Pelo',
    category: 'follicle',
    depth: '1 - 2 mm en dermis reticular',
    magnification: '400x',
    scientificName: 'Glandula sebacea et musculus arrector pili',
    shortDescription: 'Unidad pilosebácea auxiliar: lubricación lipídica ácida y termorregulación refleja.',
    detailedFunction: 'La glándula sebácea secreta sebo al canal folicular por excreción holocrina, formando el manto hidrolipídico ácido epicutáneo (pH 4.5 - 5.5). El músculo liso erector se inserta en la protuberancia (bulge) y en la dermis papilar; al contraerse por frío o estímulo adrenérgico, eriza el pelo ("piel de gallina") y comprime la glándula estimulando la salida de sebo.',
    biochemicalComposition: 'Sebo compuesto por triglicéridos (40-50%), ésteres céreos (25%), escualeno (12%) y ácidos grasos libres (15%).',
    clinicalImportance: 'El sebo es el acondicionador natural del cabello; en cueros cabelludos grasos se acumula y puede generar dermatitis seborreica; en cabellos rizados, la curvatura impide que el sebo se distribuya uniformemente por el tallo, haciéndolo intrínsecamente más seco y vulnerable al frizz.',
    phBehavior: 'Constituye la base del pH ácido cutáneo natural defensivo frente a bacterias patógenas y hongos (Malassezia).',
    imageUrl: HAIR_IMAGES.follicleAnatomy
  }
];

export const CHEMICAL_PROCESSES_DATA: ChemicalProcessData[] = [
  {
    id: 'bleach',
    name: 'Decoloración & Oxidación Extrema',
    category: 'Aclaración de Melaninas y Disolución Química',
    damageLevel: 'Severo',
    summary: 'Proceso de alcalinización agresiva con amoníaco/persulfatos y peróxido de hidrógeno ($H_2O_2$) para hidrolizar y desintegrar gránulos de eumelanina y feomelanina en el córtex.',
    primaryReagents: ['Persulfato de amonio / potasio ((NH4)2S2O8)', 'Peróxido de Hidrógeno (H2O2) a 20-40 Vol.', 'Silicato de sodio / Amoníaco (álcalis reguladores)'],
    affectedBonds: ['Disolución del 18-MEA (enlaces tioéster)', 'Ruptura oxidativa de puentes disulfuro (-S-S- -> Ácido Cisteico)', 'Disociación de enlaces salinos'],
    optimalPhRange: 'pH 10.0 - 11.5',
    counterMeasure: 'Reactivación de puentes sintéticos con enlaces divalentes (Plex / Bis-aminopropil diglicol dimaleato), reacidificación con acondicionadores a pH 3.5 - 4.0 y reposición lipídica de 18-MEA.',
    steps: [
      {
        stepNumber: 1,
        title: 'Disolución de la Capa F (18-MEA) y Apertura Cuticular',
        reagent: 'Persulfatos alcalinos + pH 10.5',
        ph: 10.5,
        duration: '0 - 10 min',
        molecularMechanism: 'Los iones hidróxido (OH-) hidrolizan los enlaces tioéster que anclan el ácido 18-metileicosanoico a la cisteína de la epicutícula. La endocutícula se satura de agua y se hincha más del 30%, forzando las escamas hacia afuera con un ángulo de hasta 45°.',
        structuralImpact: 'Pérdida irreversible de la hidrofobicidad natural. La cutícula queda expuesta a fracturas y deslaminación.',
        stylistRecommendation: 'Nunca sobrepasar tiempos recomendados ni aplicar calor directo con fuentes descontroladas como secadores a máxima potencia.'
      },
      {
        stepNumber: 2,
        title: 'Penetración en el Córtex y Formación de Iones Perhidroxilo',
        reagent: 'H2O2 activado por álcali -> HO2- + H+',
        ph: 10.2,
        duration: '10 - 25 min',
        molecularMechanism: 'El peróxido se disocia en el ion perhidroxilo (HO2-), un potente agente nucleofílico oxidante. Este ion se difunde rápidamente a través del cemento intercelular (CMC) hacia las células corticales, rodeando las macrofibrillas.',
        structuralImpact: 'Debilitamiento de los lípidos intercelulares del CMC. Aumento de la porosidad cortical.',
        stylistRecommendation: 'Utilizar peróxido de menor volumen (20 Vol en lugar de 40 Vol) con mayor tiempo de exposición controlado para preservar la matriz.'
      },
      {
        stepNumber: 3,
        title: 'Oxidación y Lisis de Gránulos de Eumelanina y Feomelanina',
        reagent: 'Oxígeno activo [O] + Radicales hidroxilo (•OH)',
        ph: 9.8,
        duration: '25 - 45 min',
        molecularMechanism: 'Los anillos aromáticos indol-5,6-quinona de la eumelanina (pigmento pardo/negro) se rompen oxidativamente, convirtiéndose en ácido carboxílico pirrólico soluble e incoloro. Posteriormente, la feomelanina (rojo/amarilla, rica en benzotiazinas y azufre) se degrada con mayor lentitud.',
        structuralImpact: 'Pérdida de masa interna: se generan micro-oquedades en el córtex donde antes residían los melanosomas.',
        stylistRecommendation: 'Comprender los fondos de aclaración: a nivel 7 predomina el naranja (feomelanina), a nivel 9 el amarillo pálido. No exigir llegar a nivel 10 en cabellos previamente dañados.'
      },
      {
        stepNumber: 4,
        title: 'Sobreoxidación Colateral: Formación de Ácido Cisteico',
        reagent: 'Exceso de radicales libres oxidantes en cistina',
        ph: 9.5,
        duration: '45 - 55 min',
        molecularMechanism: 'El agente oxidante ataca indiscriminadamente los enlaces disulfuro (-S-S-) de la queratina: R-S-S-R + 5[O] + H2O -> 2 R-SO3H (ácido cisteico). El ácido cisteico es una molécula aniónica ácida que no puede volver a formar puentes azufrados.',
        structuralImpact: 'Pérdida drástica de resistencia elástica a la tracción (efecto "cabello chicle" en húmedo). Reducción de hasta un 50% de la fuerza tensil.',
        stylistRecommendation: 'Enjuagar de inmediato al alcanzar el fondo deseado, aplicar un paso 2 de Plex y lavar con champú ácido para neutralizar la reacción.'
      }
    ]
  },
  {
    id: 'color',
    name: 'Coloración Permanente Oxidativa',
    category: 'Apertura Cuticular y Polimerización Intracortical',
    damageLevel: 'Moderado',
    summary: 'Depósito duradero de color mediante micro-precursores que penetran al córtex e interactúan químicamente para condensarse en pigmentos macromoleculares atrapados estéricamente.',
    primaryReagents: ['Para-fenilendiamina (PPD) / Tolueno-2,5-diamina', 'Acopladores (Resorcinol, m-aminofenol)', 'Amoníaco (NH3) o MEA', 'Peróxido (H2O2 a 20 Vol.)'],
    affectedBonds: ['Apertura reversible de cutícula', 'Oxidación parcial de melanina base', 'Uniones covalentes entre pigmentos artificiales polimerizados'],
    optimalPhRange: 'pH 9.0 - 10.5',
    counterMeasure: 'Cierre cuticular con emulsión post-color a pH 4.0 - 4.5, antioxidantes (vitamina E, té verde) para frenar radicales libres residuales.',
    steps: [
      {
        stepNumber: 1,
        title: 'Alcalinización e Hinchamiento Controlado',
        reagent: 'Amoníaco (NH3) a pH 9.5',
        ph: 9.5,
        duration: '0 - 10 min',
        molecularMechanism: 'El amoníaco gasificado se evapora gradualmente mientras disocia los puentes salinos electrostáticos de la cutícula, provocando un hinchamiento ordenado sin desintegrar completamente la masa queratínica.',
        structuralImpact: 'Separación temporal de las escamas para permitir el paso de moléculas pequeñas.',
        stylistRecommendation: 'Aplicar uniformemente con pincel sin saturar en exceso el cuero cabelludo para evitar irritaciones dérmicas.'
      },
      {
        stepNumber: 2,
        title: 'Difusión de Precursores Monoméricos de Bajo Peso Molecular',
        reagent: 'Diaminas aromáticas y aminofenoles (PPD, resorcinol)',
        ph: 9.3,
        duration: '10 - 20 min',
        molecularMechanism: 'Por tener un peso molecular extremadamente bajo (<150 Da), las moléculas incoloras de precursores se deslizan fácilmente a través de los poros de la cutícula abierta y entran a las microfibrillas del córtex.',
        structuralImpact: 'Ocupación de los espacios interfibrilares sin alterar los enlaces covalentes primarios.',
        stylistRecommendation: 'Respetar los tiempos de pose completos (35-45 minutos) para permitir que la reacción química llegue a su fase de acoplamiento total.'
      },
      {
        stepNumber: 3,
        title: 'Polimerización Oxidativa y Atrapamiento Estérico',
        reagent: 'H2O2 + Diaminas + Acopladores -> Indaminas / Indofenoles',
        ph: 8.8,
        duration: '20 - 40 min',
        molecularMechanism: 'El H2O2 oxida la PPD a quinonadiimina, la cual reacciona inmediatamente con los acopladores en una reacción de adición nucleofílica. Se forman moléculas gigantes coloreadas poliméricas (peso molecular > 500 Da).',
        structuralImpact: 'Por su gran tamaño tridimensional (impedimento estérico), las nuevas moléculas de color ya no caben a través de los poros y quedan físicamente atrapadas en el córtex para siempre.',
        stylistRecommendation: 'Nunca enjuagar antes de tiempo; una interrupción prematura deja precursores sin reaccionar que se deslavan en 2 lavados.'
      },
      {
        stepNumber: 4,
        title: 'Neutralización Ácida y Sellado Cuticular',
        reagent: 'Tratamiento Post-Color a pH 4.0 (Ácido cítrico/láctico)',
        ph: 4.0,
        duration: 'Post-enjuague (5 min)',
        molecularMechanism: 'El pH ácido devuelve la fibra a su punto isoeléctrico, reconstruyendo los enlaces iónicos salinos. La endocutícula se deshidrata y las escamas cuticulares se aplanan herméticamente sobre el tallo.',
        structuralImpact: 'Brillo reflectivo recuperado y máxima retención del pigmento atrapado.',
        stylistRecommendation: 'Obligatorio en todo salón: el uso de mascarilla ácida tras el color es lo que garantiza la durabilidad del tono.'
      }
    ]
  },
  {
    id: 'straightening',
    name: 'Alisados & Ondulación Permanente',
    category: 'Modificación Estructural de Puentes Disulfuro',
    damageLevel: 'Alto',
    summary: 'Ruptura controlada de los enlaces de azufre covalentes (-S-S-), deformación mecánica mediante tensión o calor, y reformación en una nueva configuración tridimensional.',
    primaryReagents: ['Tioglicolato de Amonio / Cisteamina', 'Neutralizante (H2O2 al 2-3% a pH ácido 3.0)', 'O Ácido Glioxílico / Carbocisteína + Calor 230°C'],
    affectedBonds: ['Ruptura de puentes disulfuro (-S-S- -> -SH + HS-)', 'Reorganización de enlaces salinos y puentes de hidrógeno'],
    optimalPhRange: 'Permanente alcalina: pH 8.5 - 9.5 | Ácido Glioxílico: pH 1.5 - 2.5',
    counterMeasure: 'Respetar el tiempo de neutralización oxidativa para garantizar la reformación del 90% de los puentes; sellado con proteínas hidrolizadas.',
    steps: [
      {
        stepNumber: 1,
        title: 'Fase Reductora: Escisión de Puentes de Cistina',
        reagent: 'Ácido tioglicólico a pH 9.0 o Cisteamina',
        ph: 9.0,
        duration: '15 - 25 min',
        molecularMechanism: 'Los iones tiolato (RS-) atacan nucleofílicamente el puente disulfuro (-S-S-) de la queratina: K-S-S-K + 2 R-SH <-> 2 K-SH + R-S-S-R. Cada puente de cistina se rompe rindiendo dos residuos de cisteína libre con grupos tiol (-SH).',
        structuralImpact: 'El cabello pierde su rigidez elástica nativa y se vuelve plástico, moldeable a voluntad.',
        stylistRecommendation: 'Test de elasticidad continuo: controlar el tiempo de acción para no superar la ruptura del 30% de los enlaces totales.'
      },
      {
        stepNumber: 2,
        title: 'Reconfiguración Espacial y Deslizamiento Fibrilar',
        reagent: 'Acción mecánica (Bigudíes para rulos o Plancha térmica a 210-230°C)',
        ph: 7.0,
        duration: '10 - 20 min',
        molecularMechanism: 'Bajo tensión mecánica o compresión plana térmica, las cadenas polipeptídicas de queratina se desplazan unas sobre otras. Los grupos tiol (-SH) libres quedan alineados frente a nuevas parejas de azufre.',
        structuralImpact: 'Desaparición de la memoria molecular previa de la fibra capilar.',
        stylistRecommendation: 'Alinear las hebras con peines de cerdas finas en ángulo de 90° sin doblar la raíz para evitar marcas irreversibles.'
      },
      {
        stepNumber: 3,
        title: 'Fase Neutralizante: Reoxidación y Creación de Nuevos Puentes',
        reagent: 'Peróxido de Hidrógeno estabilizado a pH 3.0',
        ph: 3.0,
        duration: '10 - 15 min',
        molecularMechanism: 'El neutralizante oxidante retira átomos de hidrógeno de los grupos tiol contiguos: 2 K-SH + [O] -> K-S-S-K + H2O. Se forjan nuevos puentes disulfuro covalentes permanentes que congelan la nueva morfología.',
        structuralImpact: 'Recuperación de la solidez y tenacidad mecánica en la nueva forma lisa o rizada.',
        stylistRecommendation: 'Nunca acortar el tiempo del neutralizante. Si se enjuaga antes de tiempo, los enlaces libres se oxidarán con el aire de forma desordenada y el cabello se partirá.'
      }
    ]
  },
  {
    id: 'reconstruction',
    name: 'Hidratación, Nutrición Lipídica & Reconstrucción Plex',
    category: 'Terapia Biomimética y Regeneración de la Fibra',
    damageLevel: 'Bajo',
    summary: 'Protocolo de rescate en 3 dimensiones: restitución hídrica en enlaces de hidrógeno, reposición de lípidos en el CMC (18-MEA) y puenteado macromolecular de enlaces rotos.',
    primaryReagents: ['Ácido hialurónico catiónico & Glicerina', 'Ceramidas & Ácido 18-metileicosanoico vegetal', 'Bis-aminopropil diglicol dimaleato (Plex) & Aminoácidos de queratina'],
    affectedBonds: ['Puentes de hidrógeno hidrofílicos', 'Bicapa lipídica del CMC', 'Puentes covalentes artificiales cruzados'],
    optimalPhRange: 'pH 3.5 - 5.0',
    counterMeasure: 'Rutina domiciliaria de mantenimiento con champú sin sulfatos agresivos y mascarilla con equilibrio proteína-hidratación.',
    steps: [
      {
        stepNumber: 1,
        title: 'Fase 1: Reconexión Macromolecular (Tecnología Plex)',
        reagent: 'Derivados de maleato / Bis-aminopropil dimaleato',
        ph: 4.5,
        duration: '15 min',
        molecularMechanism: 'La molécula bivalente posee dos grupos funcionales reactivos en sus extremos que reaccionan con dos grupos tiol (-SH) huérfanos generados por decoloraciones pasadas, formando un puente artificial estable que sustituye al enlace disulfuro roto.',
        structuralImpact: 'Detiene el punto de rotura y devuelve la tenacidad estructural al córtex.',
        stylistRecommendation: 'Aplicar como tratamiento independiente pre-químico o mezclado en fórmulas decolorantes respetando proporciones exactas.'
      },
      {
        stepNumber: 2,
        title: 'Fase 2: Reposición de Masa Proteica y Aminoácidos',
        reagent: 'Queratina hidrolizada (PM < 1000 Da) + Arginina + Cisteína',
        ph: 4.2,
        duration: '15 min',
        molecularMechanism: 'Péptidos bio-idénticos de bajo peso molecular penetran a través de las microfisuras del córtex, adhiriéndose electrostáticamente a las zonas con carga negativa del cabello dañado y rellenando los huecos porosos.',
        structuralImpact: 'Relleno de masa interna y engrosamiento de la hebra porosa.',
        stylistRecommendation: 'No abusar de proteínas si el cabello carece de elasticidad hídrica, pues el exceso de proteína sin hidratación puede rigidizar la fibra.'
      },
      {
        stepNumber: 3,
        title: 'Fase 3: Restauración Lipídica y Capa F (Nutrición)',
        reagent: 'Ceramidas miméticas + 18-MEA lipídico + Aceite de Argán/Jojoba',
        ph: 3.8,
        duration: '10 min',
        molecularMechanism: 'Las moléculas lipídicas se intercalan en los espacios intercelulares del complejo de membrana celular (CMC), recreando la barrera hidrofóbica que repele la humedad ambiental descontrolada y evita el frizz.',
        structuralImpact: 'Sellado suave, flexibilidad sedosa y restauración de la repelencia natural al agua.',
        stylistRecommendation: 'Sellar con calor tibio moderado (gorro térmico) para fluidificar los lípidos y optimizar su anclaje cuticular.'
      }
    ]
  },
  {
    id: 'haircut',
    name: 'Corte Clínico & Mecánica de la Tricoptilosis',
    category: 'Integridad Mecánica Transversal de la Punta',
    damageLevel: 'Bajo',
    summary: 'Análisis biológico del corte con herramientas profesionales: cómo el ángulo de la cuchilla previene la degradación cuticular apical y las temidas puntas abiertas (tricoptilosis).',
    primaryReagents: ['Tijera de acero japonés cobalto templado', 'Cuchilla de afeitar micrométrica', 'Tijera mellada / desafilada (factor patológico)'],
    affectedBonds: ['Corte mecánico transversal neto de queratina', 'Exposición del córtex al oxígeno ambiental'],
    optimalPhRange: 'Punto de equilibrio en húmedo (pH 5.5)',
    counterMeasure: 'Corte de mantenimiento cada 8-12 semanas; aplicación de sérum polimérico de siliconas ligeras o aceites protectores en las puntas para sellar el extremo expuesto.',
    steps: [
      {
        stepNumber: 1,
        title: 'Corte con Tijera Profesional Afilada (45°-90°)',
        reagent: 'Filo convexo afilado a mano (acero 440C / VG-10)',
        ph: 5.5,
        duration: 'Mecánico instantáneo',
        molecularMechanism: 'El filo microquirúrgico secciona limpiamente el cilindro de queratina sin comprimir ni astillar el tallo. El extremo apical queda plano y la cutícula sella los bordes del córtex como la corteza de un árbol talado con precisión.',
        structuralImpact: 'El córtex queda mínimamente expuesto; las células no se desprenden.',
        stylistRecommendation: 'Mantener las tijeras calibradas profesionalmente; nunca cortar papel con tijeras de cabello.'
      },
      {
        stepNumber: 2,
        title: 'El Peligro de la Tijera Mellada: Machacamiento y Tricoptilosis',
        reagent: 'Cizallamiento mecánico con filo desgastado',
        ph: 5.5,
        duration: 'Progresivo (días a semanas)',
        molecularMechanism: 'Una tijera sin filo no corta: aplasta y fractura la fibra por estrés mecánico de compresión. Las escamas de la cutícula apical saltan desprendidas y el cemento intercelular (CMC) se agrieta, permitiendo que las macrofibrillas del córtex se deshilachen longitudinalmente como una cuerda rota.',
        structuralImpact: 'Aparición de tricoptilosis (horquetillas / puntas abiertas) que avanzan tallo arriba consumiendo la longitud del cabello.',
        stylistRecommendation: 'Descartar navajas oxidadas o tijeras con muescas; educar al cliente en que las puntas abiertas no se pegan con cremas, se cortan limpiamente.'
      }
    ]
  }
];

export const BIOCHEMICAL_COMPOSITION = [
  { component: 'Queratina y Proteínas Estructurales', percentage: '85 - 90%', color: '#38bdf8', description: 'Polímero biológico fibroso insoluble formado por 18 aminoácidos clave. Contiene altísima concentración de cisteína (17.5%), ácido glutámico (14.3%), serina, treonina y arginina.' },
  { component: 'Agua (Balance Hídrico & Higroscópico)', percentage: '10 - 15%', color: '#06b6d4', description: 'Presente como agua libre (que entra y sale según humedad ambiente provocando hinchamiento/frizz) y agua ligada molecularmente a aminoácidos (imprescindible para la elasticidad y flexibilidad).' },
  { component: 'Lípidos & Ácido 18-MEA', percentage: '3 - 5%', color: '#f59e0b', description: 'Ácido 18-metileicosanoico covalentemente anclado a la cutícula, ceramidas (I a VI), colesterol y ácidos grasos libres que componen el complejo de membrana celular intercelular.' },
  { component: 'Pigmentos Melánicos', percentage: '1 - 2%', color: '#d97706', description: 'Eumelanina (polímeros de tirosina, ovalados/granulares, pardos a negros) y Feomelanina (pigmento difuso rico en azufre y benzotiazina, tonos dorados y rojizos).' },
  { component: 'Oligoelementos y Minerales', percentage: '0.5 - 1%', color: '#a855f7', description: 'Hierro, zinc, magnesio, calcio, cobre, silicio y selenio. Actúan como cofactores enzimáticos durante la fase de queratinización en la matriz germinativa del folículo.' }
];

export const CHEMICAL_BONDS_DATA = [
  {
    name: 'Puentes Disulfuro Covalentes (-S-S-)',
    type: 'Enlace Covalente Fuerte',
    strength: 'Energía de enlace: ~250 kJ/mol (Extremadamente fuerte)',
    description: 'Se forman entre dos átomos de azufre de moléculas de cisteína contiguas para constituir el aminoácido cistina.',
    role: 'Aportan el 80% de la fuerza tensil mecánica y la memoria de forma permanente del cabello (liso, ondulado o rizado).',
    stylistAction: 'Inalterables con agua o calor normal. Solo se rompen químicamente mediante agentes reductores (alisados y permanentes) o se sobreoxidan destructivamente con decoloraciones extremas.'
  },
  {
    name: 'Puentes de Hidrógeno Dipolares',
    type: 'Atracción Electrostática Intermolecular',
    strength: 'Energía de enlace: ~20 kJ/mol (Débil individualmente, inmenso en conjunto)',
    description: 'Atracciones electrostáticas entre átomos de hidrógeno con carga parcial positiva (Hδ+) y átomos de oxígeno o nitrógeno con carga parcial negativa (Oδ- / Nδ-) de cadenas polipeptídicas adyacentes.',
    role: 'Confieren la elasticidad y flexibilidad del peinado cotidiano.',
    stylistAction: 'El agua y la humedad rompen temporalmente los puentes de hidrógeno (por eso el pelo mojado se estira más). Al secar y planchar con calor a 180°C, el agua se evapora y los puentes se vuelven a fijar en la forma dada con el cepillo o plancha (peinado temporal).'
  },
  {
    name: 'Puentes Salinos / Iónicos',
    type: 'Enlace Iónico Dependiente de pH',
    strength: 'Energía de enlace: ~50 kJ/mol (Fuerza media dependiente del pH)',
    description: 'Atracción iónica entre los grupos amino cargados positivamente (-NH3+) del aminoácido arginina/lisina y los grupos carboxilo cargados negativamente (-COO-) del ácido glutámico/aspártico.',
    role: 'Mantienen cohesionadas las cadenas laterales de queratina y dictan el comportamiento de hinchamiento de la cutícula.',
    stylistAction: 'Máxima fuerza en el Punto Isoeléctrico del cabello (pH 3.67). En medios alcalinos (tintes, pH 9+) los grupos amino se desprotonan y el puente se rompe, abriendo la cutícula. En medios ácidos (acondicionadores pH 4), el puente se reconstituye cerrando la fibra.'
  }
];

export const TRICHOLOGY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuál es el componente lipídico principal de la Capa F que confiere la hidrofobicidad natural a la cutícula del cabello?',
    options: [
      'Ácido esteárico libre',
      'Ácido 18-metileicosanoico (18-MEA)',
      'Escualeno oxidado',
      'Ceramida tipo 9'
    ],
    correctIndex: 1,
    explanation: 'El ácido 18-metileicosanoico (18-MEA) es el lípido ramificado de 21 carbonos anclado covalentemente por enlaces tioéster a la cisteína de la epicutícula, responsable de que el cabello sano repele el agua.',
    trichologyDomain: 'Bioquímica Cuticular'
  },
  {
    id: 2,
    question: '¿En qué punto del pH se sitúa el "Punto Isoeléctrico" del cabello humano, donde presenta su máxima estabilidad y cierre cuticular?',
    options: [
      'pH 7.00 neutro',
      'pH 5.50 del manto epicutáneo',
      'pH 3.67 isoeléctrico',
      'pH 9.20 alcalino'
    ],
    correctIndex: 2,
    explanation: 'El punto isoeléctrico del cabello se encuentra en pH 3.67. En este valor, las cargas positivas y negativas de los aminoácidos se neutralizan perfectamente, logrando el mínimo hinchamiento y la máxima resistencia estructural.',
    trichologyDomain: 'Físico-Química Capilar'
  },
  {
    id: 3,
    question: 'Durante una decoloración agresiva, ¿qué compuesto secundario e irreversible se forma cuando los enlaces disulfuro de la queratina son sobreoxidados?',
    options: [
      'Ácido tioglicólico libre',
      'Ácido cisteico (R-SO3H)',
      'Tricohialina polimerizada',
      'Glutatión reducido'
    ],
    correctIndex: 1,
    explanation: 'La sobreoxidación de la cistina oxida el enlace azufrado pasando por óxidos intermedios hasta culminar en ácido cisteico (R-SO3H). Este ácido no puede volver a formar puentes disulfuro, causando el daño gomoso o rotura del cabello.',
    trichologyDomain: 'Mecanismos de Decoloración'
  },
  {
    id: 4,
    question: '¿Por qué la coloración permanente requiere un pH alcalino con amoníaco o etanolamina para ser duradera?',
    options: [
      'Para disolver la médula capilar',
      'Para hinchar la endocutícula y permitir que los micro-precursores (PPD) penetren al córtex antes de polimerizarse',
      'Para evaporar toda el agua libre del tallo',
      'Para convertir la eumelanina en queratina dura'
    ],
    correctIndex: 1,
    explanation: 'El álcali hincha la cutícula abriendo sus escamas y neutraliza temporalmente los enlaces salinos, permitiendo el ingreso de moléculas microscópicas (precursores como PPD). Una vez dentro del córtex, el H2O2 las oxida condensándolas en macromoléculas grandes que no pueden salir (atrapamiento estérico).',
    trichologyDomain: 'Colorimetría Oxidativa'
  },
  {
    id: 5,
    question: '¿Qué estructura del folículo piloso es responsable de nutrir a las células matriciales mediante una densa red de capilares sanguíneos?',
    options: [
      'La glándula sebácea',
      'La capa de Henle de la vaina interna',
      'La papila dérmica',
      'El músculo erector del pelo'
    ],
    correctIndex: 2,
    explanation: 'La papila dérmica es la estructura mesenquimal en la base del folículo que contiene los capilares sanguíneos arteriolares y venulares que nutren y oxigenan la matriz celular proliferativa en anágeno.',
    trichologyDomain: 'Anatomía Folicular'
  },
  {
    id: 6,
    question: 'En un alisado químico con tioglicolato de amonio, ¿qué reacción molecular ocurre en la fase neutralizante con peróxido de hidrógeno?',
    options: [
      'Los grupos tiol libres (-SH) son oxidados de nuevo para formar nuevos puentes disulfuro (-S-S-) en la posición lisa',
      'Se elimina el ácido hialurónico del CMC',
      'Se disuelven las macrofibrillas del córtex',
      'Se desnaturaliza irreversiblemente la hélice alfa a lámina beta'
    ],
    correctIndex: 0,
    explanation: 'El agente neutralizante retira átomos de hidrógeno de dos grupos tiol adyacentes (2 K-SH + [O] -> K-S-S-K + H2O), reformando los enlaces disulfuro covalentes para fijar mecánicamente la nueva configuración lacia.',
    trichologyDomain: 'Transformación y Alisados'
  },
  {
    id: 7,
    question: '¿Cuál es la diferencia biológica entre la Eumelanina y la Feomelanina?',
    options: [
      'La eumelanina es rica en queratina y la feomelanina en lípidos',
      'La eumelanina aporta pigmentos pardos/negros granulares insolubles; la feomelanina aporta pigmentos amarillo/rojizos ricos en azufre y benzotiazina',
      'La feomelanina solo se encuentra en la médula y la eumelanina en la cutícula',
      'No existe diferencia, ambas son idénticas ante el decolorante'
    ],
    correctIndex: 1,
    explanation: 'La eumelanina sintetiza polímeros ovales oscuros de 5,6-dihidroxiindol que se aclaran con relativa facilidad oxidativa. La feomelanina contiene cisteinildopa y benzotiazina con alto contenido en azufre, generando los pigmentos residuales cálidos más resistentes a la decoloración.',
    trichologyDomain: 'Pigmentología y Tricología'
  },
  {
    id: 8,
    question: '¿Qué fenómeno físico explica por qué el peinado térmico con secador y plancha es temporal y se revierte con la lluvia o humedad?',
    options: [
      'Porque el calor solo reorganiza los puentes de hidrógeno, los cuales se rompen inmediatamente con el agua ambiente',
      'Porque el calor quema los puentes disulfuro de forma instantánea',
      'Porque la plancha evapora las ceramidas del CMC permanentemente',
      'Porque la médula del cabello absorbe el calor y lo expulsa'
    ],
    correctIndex: 0,
    explanation: 'El peinado térmico temporal actúa exclusivamente sobre los enlaces débiles de hidrógeno. El agua ambiente rompe dichos enlaces por su naturaleza dipolar polarizada, devolviendo el cabello a su conformación ondulada o encrespada nativa.',
    trichologyDomain: 'Físico-Mecánica Capilar'
  }
];
