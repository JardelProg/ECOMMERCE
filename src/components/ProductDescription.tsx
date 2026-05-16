import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Zap, Shield, Star, Wrench } from 'lucide-react';
import { Product } from '../types';

// ─── Textos por subcategoria ───────────────────────────────────────────────

type SubcatData = {
  intro: (p: Product) => string;
  body: (p: Product) => string;
  benefits: (p: Product) => string[];
  applications: (p: Product) => string;
  tips: string;
};

const specs = (p: Product) => p.specs || {};
const sv = (p: Product, key: string) => (specs(p)[key] as string) || '';

const SUBCAT_DATA: Record<string, SubcatData> = {
  'Compressores': {
    intro: p => `O ${p.name} é um compressor de ar projetado para atender às mais exigentes demandas de ambientes industriais, oficinas mecânicas e uso profissional intensivo. Com reservatório${sv(p,'Capacidade') ? ` de ${sv(p,'Capacidade')}` : ''} e motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''}, este equipamento entrega pressão constante e fluxo de ar contínuo, garantindo produtividade máxima durante toda a jornada de trabalho.`,
    body: p => `Fabricado com materiais de alta resistência e aprovado por rigorosos padrões de qualidade, o compressor${sv(p,'Marca') ? ` ${sv(p,'Marca')}` : ''} oferece baixo nível de ruído, partida suave e manutenção simplificada. O sistema de válvulas de segurança e o termostato de proteção garantem operação segura mesmo em ciclos contínuos prolongados. A construção robusta do bloco compressor assegura longa vida útil sem perda de performance.${sv(p,'Tensão') ? ` Opera em tensão ${sv(p,'Tensão')}, facilitando a instalação em qualquer ambiente.` : ''}`,
    benefits: p => [
      `Reservatório${sv(p,'Capacidade') ? ` de ${sv(p,'Capacidade')}` : ''} para maior autonomia de trabalho`,
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} para alta eficiência energética`,
      'Manômetro de fácil leitura integrado ao painel',
      'Válvula de segurança e reguladora de pressão inclusas',
      'Suportes de borracha antivibração para menor ruído',
      'Pés com rodas para fácil mobilidade na oficina',
    ],
    applications: p => `Ideal para pistolas de pintura, equipamentos de limpeza a ar, ferramentas pneumáticas (parafusadeiras, chaves de impacto, lixadeiras), inflagem de pneus e câmaras, sistemas de automação industrial e limpeza de peças mecânicas. Indicado para oficinas mecânicas, serralherias, marcenarias, postos de combustível e uso industrial em geral.`,
    tips: 'Drene a água do reservatório após cada uso para prolongar a vida útil. Verifique o óleo do bloco regularmente conforme manual do fabricante.',
  },
  'Esmerilhadeiras': {
    intro: p => `A ${p.name} é uma esmerilhadeira angular de alta performance desenvolvida para corte, desbaste e polimento de metais, concreto e outros materiais. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} e disco${sv(p,'Diâmetro') ? ` de ${sv(p,'Diâmetro')}` : ''}, proporciona resultados profissionais com maior controle e precisão de acabamento.`,
    body: p => `Equipada com proteção antirrebote, embreagem de segurança e chave liga/desliga de trava, a esmerilhadeira${sv(p,'Marca') ? ` ${sv(p,'Marca')}` : ''} foi projetada para garantir segurança mesmo nas operações mais exigentes. O corpo ergonômico reduz a fadiga em trabalhos prolongados, e o sistema de extração de poeira protege os rolamentos internos, aumentando a durabilidade do equipamento.${sv(p,'Tensão') ? ` Compatível com rede elétrica ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} com alto torque para trabalhos intensivos`,
      `Compatível com discos${sv(p,'Diâmetro') ? ` de ${sv(p,'Diâmetro')}` : ''} de corte, desbaste e polimento`,
      'Chave de travamento para substituição rápida de disco',
      'Proteção ajustável para maior segurança operacional',
      'Cabo antitorção que reduz torções perigosas',
      'Carcaça em material resistente a impactos',
    ],
    applications: p => `Utilizada para corte de barras metálicas, perfis de aço, tubos, tijolos e cerâmica; desbaste de rebarbas e soldas; lixamento e polimento de superfícies metálicas; remoção de ferrugem; preparação de superfícies para pintura ou galvanização. Essencial em serralherias, construção civil, indústria automobilística e manutenção industrial.`,
    tips: 'Sempre use EPI adequado: óculos de proteção, luvas e protetor facial. Inspecione os discos antes de cada uso e jamais exceda a rotação máxima especificada.',
  },
  'Furadeiras': {
    intro: p => `A ${p.name} é uma furadeira de alta potência projetada para perfuração em madeira, metal, concreto e alvenaria com precisão e durabilidade excepcionais. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''}, garante desempenho consistente em todos os materiais, mesmo nas condições de trabalho mais adversas.`,
    body: p => `O sistema de engrenagens de aço endurecido e o mandril de precisão garantem centragem perfeita da broca e transmissão eficiente de torque. A empunhadura auxiliar ajustável e o cabo ergonômico proporcionam total controle sobre a ferramenta, reduzindo a fadiga em uso prolongado. O sistema de regulagem de profundidade assegura perfurações uniformes e repetíveis.${sv(p,'Tensão') ? ` Opera em ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} com dupla isolação elétrica`,
      'Mandril com sistema de aperto rápido',
      'Controle de velocidade variável por gatilho progressivo',
      'Função reversão para parafusar e desparafusar',
      'Trava de rotação contínua para operações longas',
      'Empunhadura auxiliar para maior controle e segurança',
    ],
    applications: p => `Perfeita para instalações elétricas e hidráulicas (perfuração em lajes e alvenaria), marcenaria (furação de madeira maciça e compensada), metalurgia (perfuração de chapas e perfis), montagem de móveis, fixação de suportes e prateleiras, instalação de sistemas de ar-condicionado e muito mais.`,
    tips: 'Use brocas adequadas para cada material. Redobre a velocidade ao perfurar materiais duros e aplique pressão constante sem sobrecarregar o motor.',
  },
  'Marteletes': {
    intro: p => `O ${p.name} é um martelete rotopercutor de alto desempenho desenvolvido para perfuração em concreto armado, pedra, tijolo e demais superfícies de alta dureza. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} e encaixe${sv(p,'Encaixe') ? ` ${sv(p,'Encaixe')}` : ''}, combina rotação e percussão em um sistema de alta energia por impacto.`,
    body: p => `O sistema eletropneumático de percussão proporciona alta energia de impacto com baixo esforço do operador, reduzindo a vibração transmitida às mãos e braços. A embreagem de segurança protege o operador em caso de travamento da broca, evitando acidentes. Com função somente percussão (demolição), somente rotação (furação) e rotopercussão combinada, adapta-se a diferentes aplicações com facilidade.${sv(p,'Encaixe') ? ` Sistema de encaixe ${sv(p,'Encaixe')} para compatibilidade com vasta gama de acessórios.` : ''}`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} com sistema eletropneumático eficiente`,
      `Encaixe${sv(p,'Encaixe') ? ` ${sv(p,'Encaixe')}` : ''} para fácil troca de brocas e ponteiros`,
      '3 modos de operação: rotação, percussão e rotopercussão',
      'Embreagem de segurança antitravamento',
      'Sistema antivibração para maior conforto',
      'Indicador de carbono para manutenção preventiva',
    ],
    applications: p => `Indicado para demolição de piso cerâmico, azulejo e revestimentos; remoção de reboco; abertura de rasgos para instalações elétricas e hidráulicas; perfuração de concreto armado para passagem de tubulações; instalação de âncoras e chumbadores em estruturas de concreto. Essencial para construtoras, reformas e manutenção predial.`,
    tips: 'Lubrifique regularmente o encaixe e as hastes com graxa específica para martelete. Verifique o estado das escovas de carvão periodicamente.',
  },
  'Parafusadeiras': {
    intro: p => `A ${p.name} é uma parafusadeira/furadeira sem fio de última geração, desenvolvida para oferecer máxima performance em trabalhos de fixação, montagem e perfuração. Com tecnologia${sv(p,'Tipo') ? ` ${sv(p,'Tipo')}` : ' brushless'} e bateria${sv(p,'Tensão') ? ` de ${sv(p,'Tensão')}` : ''}, entrega torque elevado com menor consumo de energia e vida útil estendida do motor.`,
    body: p => `O motor brushless (sem escovas) elimina as perdas por atrito e calor, oferecendo até 50% mais vida útil em relação aos modelos convencionais. O sistema de embreagem com múltiplas posições garante o torque exato para cada aplicação, evitando danos às superfícies. O mandril de aperto rápido${sv(p,'Encaixe') ? ` de ${sv(p,'Encaixe')}` : ''} facilita a troca de bits sem a necessidade de ferramentas adicionais.`,
    benefits: p => [
      `Motor${sv(p,'Tipo') ? ` ${sv(p,'Tipo')}` : ' brushless'} para maior durabilidade e eficiência`,
      `Bateria${sv(p,'Tensão') ? ` de ${sv(p,'Tensão')}` : ''} de alta capacidade com carregamento rápido`,
      'Sistema de embreagem ajustável em múltiplas posições',
      'LED frontal para iluminação da área de trabalho',
      'Indicador de carga da bateria em tempo real',
      'Portabit integrado no corpo da ferramenta',
    ],
    applications: p => `Ideal para montagem de móveis, instalação de divisórias e forros, fixação de estruturas metálicas, instalações elétricas e hidráulicas, carpintaria e marcenaria, montagem de equipamentos industriais e manutenção em geral. A ausência de fio garante liberdade de movimento em qualquer ambiente de trabalho.`,
    tips: 'Carregue as baterias antes de armazenar por longos períodos. Ajuste sempre a embreagem ao menor torque necessário para preservar superfícies e fixações.',
  },
  'Serras Elétricas': {
    intro: p => `A ${p.name} é uma serra elétrica profissional projetada para cortes precisos e eficientes em madeira, derivados, metais e outros materiais. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''}, combina velocidade de corte, precisão e segurança para aplicações exigentes em obra e indústria.`,
    body: p => `O sistema de guia de corte ajustável e a base antirriscos garantem cortes retos e angulares com máxima precisão. A proteção da lâmina por mola atua automaticamente, reduzindo riscos ao operador. O sistema de extração de serragem mantém o campo de corte limpo para maior visibilidade e precisão. Projetada para uso intensivo, a carcaça reforçada protege os componentes internos de impactos e poeira.${sv(p,'Tensão') ? ` Rede elétrica ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} de alto desempenho para cortes rápidos`,
      'Guia de paralelo incluso para cortes sequenciais precisos',
      'Ajuste de profundidade e ângulo de corte facilitado',
      'Proteção automática da lâmina integrada',
      'Saída de serragem compatível com aspirador de pó',
      'Placa de base resistente antiarranhões',
    ],
    applications: p => `Perfeita para corte de painéis MDF, compensado e madeira maciça; corte de portas, rodapés e molduras; serragem de ripas e caibros em obra; corte de chapas de PVC e alumínio; trabalhos de marcenaria, carpintaria e construção civil em geral.`,
    tips: 'Use sempre lâminas com o número de dentes adequado ao material. Regule a profundidade de corte para que a lâmina ultrapasse o material em apenas 5mm.',
  },
  'Máquinas de solda': {
    intro: p => `A ${p.name} é uma máquina de solda profissional desenvolvida para soldagem de alta qualidade em aços carbono, inox e outros metais. Com tecnologia${sv(p,'Tipo') ? ` ${sv(p,'Tipo')}` : ' inversora'} e capacidade${sv(p,'Amperagem') ? ` de ${sv(p,'Amperagem')}` : ''}, oferece arco estável, penetração uniforme e excelente acabamento nos cordões de solda.`,
    body: p => `O circuito inversor de última geração proporciona menor consumo de energia, partida de arco suave e estável e reduzido respingo. O sistema de controle digital permite ajuste fino da corrente e da tensão, adaptando-se a eletrodos de diferentes bitolas e processos de soldagem. A carcaça com grau de proteção IP21 garante resistência à poeira e umidade em ambientes industriais exigentes.${sv(p,'Tensão') ? ` Opera em ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      `Processo${sv(p,'Tipo') ? ` ${sv(p,'Tipo')}` : ''} com arco estável e baixo respingo`,
      `Corrente ajustável${sv(p,'Amperagem') ? ` até ${sv(p,'Amperagem')}` : ''} para diferentes materiais e espessuras`,
      'Proteção contra superaquecimento com desligamento automático',
      'Ciclo de trabalho elevado para soldagem contínua',
      'Indicadores LED de status e temperatura',
      'Cabo de solda e eletrodo de alta condutividade inclusos',
    ],
    applications: p => `Utilizada para fabricação e manutenção de estruturas metálicas, solda em chapas de caldeiraria, reparo de equipamentos agrícolas e máquinas pesadas, soldagem de grades, portões e guardrails, fabricação de mobiliário metálico e estruturas de alumínio. Indicada para indústrias metalúrgicas, serralherias, construtoras e manutenção industrial.`,
    tips: 'Limpe e lixe sempre a área a ser soldada para garantir a qualidade do cordão. Utilize EPI completo: máscara de solda, luvas e avental de raspa.',
  },
  'Lavadoras de Alta Pressão': {
    intro: p => `A ${p.name} é uma lavadora de alta pressão desenvolvida para limpeza profunda de veículos, pisos, fachadas, equipamentos e superfícies industriais. Com pressão${sv(p,'Pressão') ? ` de ${sv(p,'Pressão')}` : ''} e motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''}, remove sujeiras incrustadas, gordura, mofo e resíduos com eficiência e economia de água.`,
    body: p => `O sistema de bomba de alta pressão com pistão em latão e vedações reforçadas garante longa vida útil mesmo em uso intensivo. O conector rápido para troca de lança e bicos sem ferramentas permite mudar de função em segundos. A mangueira de${sv(p,'Mangueira') ? ` ${sv(p,'Mangueira')}` : ' alta resistência'} com encaixe girante elimina torções durante o uso. O sistema de proteção térmica desliga automaticamente o motor em caso de superaquecimento.`,
    benefits: p => [
      `Pressão${sv(p,'Pressão') ? ` de ${sv(p,'Pressão')}` : ''} para remoção de sujeiras incrustadas`,
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} com proteção térmica automática`,
      `Mangueira de${sv(p,'Mangueira') ? ` ${sv(p,'Mangueira')}` : ''} flexível e resistente`,
      'Lança e bicos intercambiáveis para diferentes usos',
      'Entrada para detergente para limpeza aprimorada',
      'Gatilho ergonômico com trava de segurança',
    ],
    applications: p => `Limpeza de veículos leves e pesados, máquinas agrícolas e de construção, pisos de garagem e pátio, fachadas de edifícios, calçadas, churrasqueiras, piscinas, quadras esportivas, equipamentos industriais e estruturas metálicas. Ideal para uso em condomínios, lava-rápidos, frotas e empresas de limpeza.`,
    tips: 'Nunca aponte o jato para pessoas ou animais. Inicie sempre com o bico de menor pressão para superfícies delicadas e aumente conforme necessário.',
  },
  'Lavadoras de média pressão': {
    intro: p => `A ${p.name} é uma lavadora de média pressão${sv(p,'Pressão') ? ` de ${sv(p,'Pressão')}` : ''} projetada para limpeza eficiente de veículos, quintais, pisos e superfícies que exigem menor pressão de água. Com vazão${sv(p,'Vazão') ? ` de ${sv(p,'Vazão')}` : ''} e motor${sv(p,'Potência Motor') ? ` de ${sv(p,'Potência Motor')}` : ''}, equilibra potência e delicadeza para limpeza sem danos.`,
    body: p => `Ideal para limpeza de superfícies sensíveis que poderiam ser danificadas por alta pressão, como pinturas automotivas, vidros, madeiras tratadas e jardins. O sistema de regulagem de pressão permite ajuste fino conforme a necessidade, enquanto a bomba de precisão garante fluxo constante e estável. A construção compacta e leve facilita o transporte e manuseio em diferentes ambientes.${sv(p,'Tensão') ? ` Opera em ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      `Pressão${sv(p,'Pressão') ? ` de ${sv(p,'Pressão')}` : ''} controlada para superfícies delicadas`,
      `Vazão${sv(p,'Vazão') ? ` de ${sv(p,'Vazão')}` : ''} constante para limpeza eficiente`,
      'Regulagem de pressão integrada ao painel',
      'Design compacto para fácil armazenamento',
      'Mangueira flexível de alta resistência',
      'Bico ajustável para leque ou jato concentrado',
    ],
    applications: p => `Limpeza de veículos de passeio, motocicletas, bicicletas, áreas externas de casas, varandas, jardins e hortas, calçadas, pisos cerâmicos, cadeiras de plástico e equipamentos delicados. Excelente para condomínios residenciais, pequenas empresas e uso doméstico frequente.`,
    tips: 'Mantenha a pressão mínima ao lavar vidros e pinturas. Aplique detergente adequado antes do enxágue para melhor resultado.',
  },
  'Geradores a Gasolina': {
    intro: p => `O ${p.name} é um gerador a gasolina de alta potência projetado para fornecimento de energia elétrica confiável em locais sem rede elétrica ou durante interrupções no fornecimento. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''}${sv(p,'Ciclo') ? ` ${sv(p,'Ciclo')}` : ''} e capacidade${sv(p,'Potência (KVA)') ? ` de ${sv(p,'Potência (KVA)')}` : ''}, garante autonomia e segurança para residências, obras e eventos.`,
    body: p => `O motor a gasolina 4 tempos de baixo consumo oferece partida facilitada com sistema manual ou elétrico (conforme modelo), alta confiabilidade e manutenção simples. O alternador de cobre puro garante energia de qualidade com baixa distorção harmônica, protegendo equipamentos eletrônicos sensíveis. O painel de controle completo inclui voltímetro, horímetro e disjuntores de proteção.`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} de alto desempenho e baixo consumo`,
      `Capacidade de geração${sv(p,'Potência (KVA)') ? ` de ${sv(p,'Potência (KVA)')}` : ''} para múltiplas cargas`,
      'Alternador com enrolamento de cobre 100% puro',
      'Regulador automático de tensão (AVR)',
      'Painel com saídas 110V e/ou 220V e USB',
      'Sistema de baixo nível de óleo com desligamento automático',
    ],
    applications: p => `Indispensável em obras de construção civil (iluminação, ferramentas e equipamentos), áreas rurais e fazendas, eventos ao ar livre, camping, residências e empresas como backup energético durante falhas na rede. Também utilizado em missões de emergência, embarcações e expedições remotas.`,
    tips: 'Nunca opere o gerador em ambientes fechados. Realize as trocas de óleo conforme o manual e use sempre combustível limpo e de qualidade.',
  },
  'Geradores a Diesel': {
    intro: p => `O ${p.name} é um grupo gerador a diesel de alta capacidade, desenvolvido para fornecimento contínuo e estável de energia elétrica em aplicações industriais, comerciais e de infraestrutura. Com potência${sv(p,'Potência (KVA)') ? ` de ${sv(p,'Potência (KVA)')}` : ''}${sv(p,'Tensão') ? ` em ${sv(p,'Tensão')}` : ''}, atende demandas críticas onde a confiabilidade é fundamental.`,
    body: p => `O motor diesel de injeção direta com alta eficiência de combustão garante consumo reduzido e longa vida útil entre revisões. O gerador sínccrono sem escovas (brushless) produz energia limpa com baixa distorção harmônica, protegendo equipamentos eletrônicos sensíveis. O painel de controle digital com AMF (partida automática em falta de rede) garante operação autônoma sem intervenção humana.`,
    benefits: p => [
      `Potência${sv(p,'Potência (KVA)') ? ` de ${sv(p,'Potência (KVA)')}` : ''} para demandas industriais e comerciais`,
      'Motor diesel de alta confiabilidade e baixo consumo',
      'Gerador brushless com regulação automática de tensão',
      'Painel de controle com AMF para partida automática',
      'Proteções contra sobretensão, subtensão e sobretemperatura',
      'Estrutura metálica reforçada com amortecedores de vibração',
    ],
    applications: p => `Utilizado como fonte de energia principal ou backup em hospitais, data centers, indústrias, supermercados, hotéis, torres de telecomunicação, sistemas de bombeamento e projetos de construção de grande porte. Ideal onde a interrupção de energia representa perdas operacionais ou riscos à segurança.`,
    tips: 'Realize o aquecimento do motor por alguns minutos antes de conectar carga plena. Mantenha o tanque de diesel limpo e livre de contaminação por água.',
  },
  'Betoneiras': {
    intro: p => `A ${p.name} é uma betoneira profissional desenvolvida para mistura homogênea e eficiente de concreto, argamassa, rebocos e outros materiais de construção. Com capacidade${sv(p,'Capacidade') ? ` de ${sv(p,'Capacidade')}` : ''} e motor${sv(p,'Potência Motor') ? ` de ${sv(p,'Potência Motor')}` : ''}, atende desde pequenas obras residenciais até grandes projetos de construção civil.`,
    body: p => `O tambor de mistura em chapa de aço tratada garante resistência à abrasão e longa durabilidade mesmo em uso contínuo intensivo. O sistema de redução de engrenagens proporciona torque elevado para misturar materiais densos sem sobrecarregar o motor. O mecanismo de inclinação ajustável facilita o despejo do material misturado com precisão no ponto desejado. O motor${sv(p,'Tensão') ? ` ${sv(p,'Tensão')}` : ''} com partida suave protege a rede elétrica da obra.`,
    benefits: p => [
      `Capacidade${sv(p,'Capacidade') ? ` de ${sv(p,'Capacidade')}` : ''} de carga para alta produtividade`,
      `Motor${sv(p,'Potência Motor') ? ` de ${sv(p,'Potência Motor')}` : ''} com proteção térmica`,
      'Tambor em aço tratado resistente à corrosão',
      'Redutor de engrenagens para torque elevado',
      'Rodas para fácil mobilidade no canteiro de obras',
      'Pás de mistura internas para homogeneização perfeita',
    ],
    applications: p => `Utilizada em obras de construção civil para mistura de concreto para fundações, pilares, lajes e calçadas; preparo de argamassa para assentamento de tijolos e revestimentos; mistura de massa para rebocos e contrapiso; preparação de argamassa refratária e outros compostos especiais.`,
    tips: 'Adicione a água gradualmente ao material seco para obter a consistência ideal. Lave o tambor ao final de cada uso para evitar endurecimento do material.',
  },
  'Motoserras': {
    intro: p => `A ${p.name} é uma motosserra profissional desenvolvida para corte eficiente de madeira em reflorestamentos, desmatamentos, poda de árvores e processamento de lenha. Com sabre${sv(p,'Comprimento do Sabre') ? ` de ${sv(p,'Comprimento do Sabre')}` : ''} e motor${sv(p,'Motor') ? ` ${sv(p,'Motor')}` : ''}, combina potência de corte, leveza e segurança para uso profissional em campo.`,
    body: p => `O sistema de corrente automático lubrifica continuamente a corrente e o sabre, garantindo menor desgaste e corte mais suave. O freio de corrente por inércia atua instantaneamente em caso de rebote, protegendo o operador. O filtro de ar de alta eficiência prolonga a vida útil do motor mesmo em ambientes com muita serragem. O sistema antivibração reduz a fadiga do operador em longas jornadas de trabalho.`,
    benefits: p => [
      `Sabre${sv(p,'Comprimento do Sabre') ? ` de ${sv(p,'Comprimento do Sabre')}` : ''} para cortes eficientes em troncos de grande diâmetro`,
      'Freio de corrente automático de segurança',
      'Sistema de lubrificação automática da corrente',
      'Filtro de ar de fácil acesso para limpeza rápida',
      'Amortecedores antivibração para maior conforto',
      'Protetor de mão dianteiro e traseiro integrado',
    ],
    applications: p => `Indicada para corte de árvores e troncos em reflorestamentos, poda e remoção de árvores em áreas urbanas, processamento de madeira para lenha e biomassa, abertura de trilhas e clareiras, trabalhos de manutenção em propriedades rurais e serviços de arboricultura urbana.`,
    tips: 'Use sempre capacete, protetor facial, luvas anticorte, calça anticorte e botinas de segurança. Afie a corrente regularmente para manter o desempenho de corte.',
  },
  'Elevadores automotivos': {
    intro: p => `O ${p.name} é um elevador automotivo profissional desenvolvido para içamento seguro e eficiente de veículos em oficinas mecânicas, concessionárias e centros de serviço automotivo. Com capacidade de carga elevada e sistema de segurança múltiplo, garante operações seguras e produtivas.`,
    body: p => `O sistema hidráulico de alta pressão com válvula de segurança de descida lenta garante que o veículo permaneça estável durante todo o procedimento de manutenção. Os travas mecânicas de segurança atuam automaticamente em diferentes posições de elevação, impedindo descidas acidentais. A sincronização hidráulica entre os pistões garante elevação nivelada do veículo em todos os pontos de apoio.`,
    benefits: p => [
      'Capacidade de carga para veículos leves e médios',
      'Sistema hidráulico com descida lenta controlada',
      'Travas de segurança mecânicas em múltiplas posições',
      'Patolas de borracha para proteção da lataria',
      'Bomba hidráulica de baixo ruído',
      'Instalação simplificada no piso da oficina',
    ],
    applications: p => `Utilizado em oficinas mecânicas para manutenção preventiva e corretiva de veículos (troca de óleo, revisão de freios, suspensão e câmbio), alinhamento e balanceamento, inspeção de cárcaça e escapamento, instalação de acessórios e customizações automotivas.`,
    tips: 'Inspecione o nível do fluido hidráulico mensalmente. Verifique as travas de segurança antes de trabalhar sob o veículo.',
  },
  'Equipamentos hidráulicos': {
    intro: p => `O ${p.name} é um equipamento hidráulico de alta performance projetado para aplicações de força e pressão em ambientes industriais, oficinas e manutenção de máquinas. Desenvolvido com componentes hidráulicos de precisão, oferece operação suave, confiável e segura.`,
    body: p => `O sistema hidráulico de alta eficiência com cilindros de precisão e vedações de longa duração garante desempenho constante mesmo sob cargas máximas. A válvula de alívio de pressão integrada protege o equipamento e o operador contra sobrecarga. A construção em aço de alta resistência assegura durabilidade excepcional em condições de trabalho intensivas.`,
    benefits: p => [
      'Cilindro hidráulico de alta pressão e precisão',
      'Válvula de alívio automática de segurança',
      'Vedações de longa duração resistentes a temperatura',
      'Carcaça em aço de alta resistência',
      'Operação suave e controlada',
      'Manutenção simples e econômica',
    ],
    applications: p => `Aplicado em prensagem de rolamentos e buchas, endireitamento de eixos e estruturas, extração de componentes prensados, trabalhos de metalurgia e caldeiraria, e manutenção de máquinas pesadas em geral.`,
    tips: 'Verifique o nível e a qualidade do fluido hidráulico regularmente. Substitua as vedações ao primeiro sinal de vazamento.',
  },
  'Macacos hidráulicos': {
    intro: p => `O ${p.name} é um macaco hidráulico profissional desenvolvido para elevação segura e estável de veículos, máquinas e equipamentos pesados. Com capacidade de carga elevada e sistema de descida controlada, é indispensável em oficinas e operações de campo.`,
    body: p => `O sistema hidráulico com bomba de dupla velocidade permite elevação rápida em vazio e lenta sob carga, otimizando o tempo de trabalho. O chassi em aço reforçado com rodas para fácil deslocamento garante estabilidade e mobilidade em diferentes superfícies. A válvula de alívio de sobrecarga protege o equipamento e o veículo em qualquer situação.`,
    benefits: p => [
      'Alta capacidade de carga para veículos pesados',
      'Bomba de dupla velocidade para elevação eficiente',
      'Válvula de alívio de sobrecarga de segurança',
      'Chassi reforçado com baixo perfil de entrada',
      'Rodas giratórias para fácil manuseio',
      'Sela de borracha para proteção do veículo',
    ],
    applications: p => `Utilizado para troca de pneus e rodas, manutenção de freios e suspensão, substituição de escapamento e câmbio, elevação de veículos em situações de emergência na estrada e trabalhos de manutenção preventiva em frotas.`,
    tips: 'Nunca trabalhe sob um veículo sustentado somente pelo macaco. Use cavaletes de segurança como suporte adicional.',
  },
  'Guinchos': {
    intro: p => `O ${p.name} é um guincho profissional desenvolvido para içamento, tração e movimentação de cargas pesadas em ambientes industriais, obras e operações de resgate. Com capacidade de carga superior e motor de alta potência, garante operações seguras e eficientes.`,
    body: p => `O sistema de redução de engrenagens de múltiplos estágios multiplica a força do motor, permitindo içar cargas muito pesadas com consumo de energia reduzido. O freio automático integrado mantém a carga suspensa com segurança mesmo em caso de falha elétrica. O cabo de aço de alta resistência com proteção anticorrosão garante longa vida útil mesmo em ambientes agressivos.${sv(p,'Tensão') ? ` Opera em ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      'Alta capacidade de carga para içamento industrial',
      'Sistema de redução de engrenagens de múltiplos estágios',
      'Freio automático de segurança em caso de falha elétrica',
      'Cabo de aço galvanizado de alta resistência',
      'Controle por pendente ou controle remoto',
      'Gancho giratório com trava de segurança',
    ],
    applications: p => `Utilizado para içamento de máquinas e equipamentos em fábricas, movimentação de cargas em armazéns, resgate de veículos e máquinas empacadas, içamento de materiais em construção civil e operações de içamento em embarcações e plataformas.`,
    tips: 'Nunca exceda a capacidade máxima de carga. Inspecione o cabo de aço regularmente para identificar desgaste ou fios partidos.',
  },
  'Pistolas de pintura': {
    intro: p => `A ${p.name} é uma pistola de pintura profissional projetada para aplicação uniforme e eficiente de tintas, vernizes, stains e outros revestimentos. Com tecnologia de atomização avançada, garante acabamentos de alta qualidade com menor desperdício de tinta.`,
    body: p => `O sistema de atomização por ar comprimido distribui a tinta em partículas finíssimas e uniformes, resultando em película lisa, sem escorrimentos e com excelente cobertura. O recipiente de fácil acesso e o regulador de fluxo integrado permitem ajuste preciso da quantidade de tinta, largura do leque e pressão de atomização. A construção em alumínio anodizado garante resistência química aos solventes mais agressivos.`,
    benefits: p => [
      'Atomização de alta eficiência para acabamento profissional',
      'Regulagem independente de fluxo, leque e agulha',
      'Recipiente de fácil desmontagem e limpeza',
      'Conexão de ar compatível com engate rápido padrão',
      'Corpo em alumínio resistente a solventes',
      'Agulha e bico inox intercambiáveis',
    ],
    applications: p => `Ideal para pintura automotiva (lataria, rodas, peças plásticas), pintura de móveis e madeiras, acabamento de estruturas metálicas, aplicação de vernizes e primers, pintura de edificações e aplicação de cola de contato em estofados.`,
    tips: 'Diluir a tinta na proporção correta é fundamental para a atomização adequada. Limpe completamente a pistola após cada uso para evitar entupimento.',
  },
  'Alicates': {
    intro: p => `O ${p.name} é uma ferramenta manual de precisão fabricada com aço carbono forjado e tratado termicamente, garantindo resistência mecânica superior e longa vida útil. Desenvolvido para aplicações profissionais em elétrica, mecânica, telecomunicações e uso geral em oficinas.`,
    body: p => `As mandíbulas usinadas com precisão garantem encaixe perfeito e força de aperto uniforme em qualquer posição. O tratamento de cementação e têmpera no aço das queixadas garante dureza superior para corte e aperto de arames, cabos e conexões sem deformação das bordas de corte. As cabos em material plástico ergonômico com revestimento de borracha bicomponente absorvem vibração e melhoram o grip mesmo com mãos suadas.`,
    benefits: p => [
      'Aço carbono forjado com tratamento térmico de alta dureza',
      'Mandíbulas usinadas para encaixe e aperto precisos',
      'Cabos ergonômicos bicomponente antiderrapantes',
      'Articulação com rebite ou parafuso de ajuste de folga',
      'Bordas de corte endurecidas por indução',
      'Acabamento em cromo-vanádio anticorrosão',
    ],
    applications: p => `Utilizados em instalações elétricas (corte e dobra de fios, fixação de conectores), trabalhos de mecânica geral, eletrônica e telecomunicações, torção e corte de arames, manutenção hidráulica, confecção de luminárias e estruturas metálicas leves.`,
    tips: 'Use o alicate correto para cada aplicação. Nunca utilize alicates de corte para apertar porcas ou parafusos — isso danifica as queixadas.',
  },
  'Chaves': {
    intro: p => `O ${p.name} é uma chave de alta qualidade fabricada em aço cromo-vanádio forjado, tratada termicamente para garantir máxima resistência ao torque e longa vida útil em condições de uso profissional intensivo. Desenvolvida para aperto e desaperto de parafusos e porcas em diversas aplicações.`,
    body: p => `O acabamento em cromo-polido facilita a limpeza e oferece proteção superior contra corrosão, ideal para ambientes úmidos e exposição a óleos e graxas. A geometria dos encaixes foi projetada com tolerâncias mínimas para maximizar a transferência de torque e reduzir o escorregamento sobre a cabeça dos fixadores, prevenindo arredondamentos.`,
    benefits: p => [
      'Aço cromo-vanádio forjado de alta resistência ao torque',
      'Acabamento cromado resistente à corrosão e abrasão',
      'Geometria de encaixe que evita arredondamento de parafusos',
      'Bordas polidas que evitam ferimentos nas mãos',
      'Marcação permanente da medida no cabo',
      'Tolerâncias controladas para encaixe preciso',
    ],
    applications: p => `Usadas em montagem e desmontagem de máquinas, manutenção automotiva, instalações industriais, trabalhos de construção civil, instalação de equipamentos de ar-condicionado, montagem de estruturas metálicas e em qualquer situação que exija aperto ou desaperto de fixadores.`,
    tips: 'Aplique torque somente na direção correta da chave fixa. Mantenha as chaves limpas e guarde-as em local seco para evitar oxidação.',
  },
  'Martelos e marretas': {
    intro: p => `O ${p.name} é uma ferramenta de percussão fabricada com cabeça em aço forjado e tratado termicamente, garantindo dureza e resistência a impactos repetitivos sem deformação ou lascamento. Projetado para aplicações profissionais em construção, mecânica, caldeiraria e uso geral.`,
    body: p => `A cabeça balanceada com precisão garante impacto eficiente e controlado em cada golpe, reduzindo o esforço do operador. O cabo em madeira selecionada (ou fibra de vidro/polipropileno, conforme modelo) absorve as vibrações de impacto, protegendo as articulações do operador durante uso prolongado. O encaixe da cabeça ao cabo com cunha metálica garante fixação permanente e segura.`,
    benefits: p => [
      'Cabeça em aço forjado com tratamento de têmpera',
      'Peso balanceado para máxima eficiência de impacto',
      'Cabo antivibração em material de alta resistência',
      'Fixação da cabeça com cunha dupla de segurança',
      'Superfície de impacto plana e polida',
      'Design ergonômico para menor fadiga',
    ],
    applications: p => `Utilizados para cravamento de estacas e pinos, demolição de alvenaria, montagem e desmontagem de componentes mecânicos, martelamento de espigões e cunhas, trabalhos de caldeiraria, construção civil, funilaria e manutenção geral em indústrias e oficinas.`,
    tips: 'Use óculos de proteção ao martelar materiais que possam lascar. Inspecione o cabo e o encaixe da cabeça antes de cada uso.',
  },
  'Soquetes': {
    intro: p => `O ${p.name} é um conjunto de soquetes profissionais fabricados em aço cromo-vanádio forjado, desenvolvido para uso com chave de catraca, torquímetro e impacto em manutenção automotiva, industrial e de máquinas pesadas. Oferece resistência superior ao torque e longa vida útil.`,
    body: p => `O perfil interno de 6 ou 12 pontas com tolerâncias controladas garante encaixe preciso sobre parafusos e porcas de diferentes bitolas, minimizando o risco de arredondamento. O acabamento em fosfato preto ou cromo-polido (conforme modelo) oferece excelente resistência à corrosão e facilita a identificação rápida da medida em campo. O encaixe quadrado de 1/4", 3/8" ou 1/2" conforme a linha.`,
    benefits: p => [
      'Aço cromo-vanádio forjado de alta resistência',
      'Perfil interno de precisão para encaixe perfeito',
      'Múltiplas bitolas para cobertura ampla de fixadores',
      'Acabamento resistente à corrosão e abrasão',
      'Medidas gravadas em relevo para identificação rápida',
      'Compatível com catraca, torquímetro e chave de impacto',
    ],
    applications: p => `Usados em manutenção automotiva (motor, câmbio, suspensão, freios), montagem e desmontagem de máquinas industriais, trabalhos em equipamentos agrícolas e de construção, instalação de estruturas metálicas e em qualquer aplicação que exija torque em espaços confinados.`,
    tips: 'Use soquetes de impacto (revestimento preto) somente com chaves de impacto. Soquetes cromados são para catraca e torquímetro.',
  },
  'Jogos de ferramentas': {
    intro: p => `O ${p.name} é um kit completo de ferramentas profissionais cuidadosamente selecionadas para cobrir as principais necessidades de manutenção, montagem e desmontagem em mecânica, elétrica e uso geral. Com peças fabricadas em materiais de alta qualidade, oferece desempenho e durabilidade excepcionais.`,
    body: p => `Cada ferramenta do kit foi fabricada em aço cromo-vanádio ou aço carbono forjado com tratamento térmico, garantindo resistência ao torque e longa vida útil. O estojo organizador ou maleta de transporte mantém todas as peças organizadas e protegidas, facilitando o transporte e o acesso rápido em campo. A diversidade de peças permite realizar a maior parte das operações de manutenção sem necessidade de ferramentas adicionais.`,
    benefits: p => [
      'Kit completo para as principais operações de manutenção',
      'Ferramentas em aço cromo-vanádio de alta resistência',
      'Estojo ou maleta organizadora para transporte e armazenagem',
      'Compatibilidade entre as peças para máxima versatilidade',
      'Economia em relação à compra individual das peças',
      'Ideal para profissionais que trabalham em campo',
    ],
    applications: p => `Perfeito para mecânicos automotivos, eletricistas, técnicos de manutenção industrial, profissionais de HVAC, encanadores, marceneiros e entusiastas de faça-você-mesmo que precisam de um conjunto versátil e confiável de ferramentas para diversas situações.`,
    tips: 'Organize as ferramentas no estojo após cada uso para facilitar a localização e evitar perdas. Limpe e seque antes de guardar.',
  },
  'Luvas': {
    intro: p => `As ${p.name} são luvas de proteção profissional desenvolvidas para proteção das mãos em ambientes de trabalho com riscos mecânicos, químicos ou térmicos. Fabricadas com materiais de alta performance, combinam proteção eficaz com conforto e destreza para uso prolongado.`,
    body: p => `O material de fabricação (couro, látex, nitrilou NBR, conforme especificação) foi selecionado para oferecer a proteção ideal contra o risco específico de cada aplicação. O design anatômico e a costura reforçada garantem ajuste perfeito às mãos sem restringir os movimentos necessários para trabalhos de precisão. Os requisitos de CA (Certificado de Aprovação) do Ministério do Trabalho garantem conformidade com as normas de segurança brasileiras.`,
    benefits: p => [
      'Proteção superior contra riscos mecânicos e químicos',
      'Design anatômico para conforto e destreza',
      'Costura reforçada nas áreas de maior solicitação',
      'Material respirável para uso prolongado',
      'Certificação CA do Ministério do Trabalho',
      'Tamanhos variados para diferentes mãos',
    ],
    applications: p => `Utilizadas em soldagem, manuseio de peças cortantes e quentes, operação de ferramentas elétricas e manuais, manuseio de produtos químicos e óleos, trabalhos de construção civil, armazéns e logística, e qualquer atividade onde as mãos estejam sujeitas a riscos.`,
    tips: 'Inspecione as luvas antes de cada uso. Substitua imediatamente ao identificar furos, rasgos ou desgaste excessivo que comprometa a proteção.',
  },
  'Luvas de proteção': {
    intro: p => `As ${p.name} são EPI de proteção das mãos para trabalhos de risco mecânico, térmico ou químico. Com certificação CA e materiais de alta resistência, garantem segurança sem comprometer a destreza do operador.`,
    body: p => `Fabricadas com materiais selecionados para cada tipo de risco, oferecem proteção eficaz aliada ao conforto necessário para longas jornadas de trabalho. O design anatômico e o ajuste no punho evitam a entrada de partículas e mantêm a luva no lugar durante movimentos bruscos.`,
    benefits: p => [
      'Certificação CA do Ministério do Trabalho',
      'Material de alta resistência à abrasão e corte',
      'Design anatômico para máxima destreza',
      'Punho ajustável para maior segurança',
      'Resistência química e térmica (conforme modelo)',
      'Lavável e reutilizável',
    ],
    applications: p => `EPI obrigatório em ambientes com risco de cortes, abrasões, queimaduras, contato com produtos químicos e partículas. Utilizado em metalurgia, construção civil, manutenção industrial, setor químico e agropecuário.`,
    tips: 'Verifique sempre o CA e o prazo de validade na etiqueta da luva antes de utilizar como EPI.',
  },
  'Óculos de proteção': {
    intro: p => `Os ${p.name} são óculos de segurança para proteção dos olhos contra partículas, respingos de produtos químicos, poeira e radiação UV em ambientes de trabalho. Com lentes de policarbonato de alta resistência e design anatômico, garantem proteção sem sacrificar o conforto.`,
    body: p => `As lentes em policarbonato atendem às normas de resistência a impacto (ANSI Z87.1 e EN 166), protegendo os olhos de fragmentos e partículas projetadas com alta velocidade. O tratamento antiembaçante e antirisco nas lentes garante visibilidade clara em ambientes úmidos e empoeirados. A armação flexível com hastes ajustáveis se adapta a diferentes formatos de rosto com conforto durante uso prolongado.`,
    benefits: p => [
      'Lentes em policarbonato resistentes a impactos e partículas',
      'Tratamento antiembaçante e antirisco das lentes',
      'Armação flexível para conforto prolongado',
      'Proteção lateral para maior cobertura',
      'Certificação CA e normas internacionais de segurança',
      'Compatível com uso simultâneo de outros EPIs',
    ],
    applications: p => `Obrigatórios em ambientes com risco de projeção de partículas (esmerilhamento, furação, corte), respingos de produtos químicos (laboratórios, indústria química), soldagem (com lentes adequadas) e exposição a pó e poeira em obras e indústrias.`,
    tips: 'Limpe as lentes com pano macio e produto adequado. Substitua ao identificar riscos profundos que comprometam a visibilidade.',
  },
  'Máscaras de proteção': {
    intro: p => `As ${p.name} são EPI de proteção respiratória desenvolvidas para filtrar partículas, poeiras, névoas e gases em ambientes de trabalho com risco de contaminação do ar. Com filtros de alta eficiência e design confortável, garantem proteção eficaz durante longas jornadas.`,
    body: p => `O sistema de filtragem multicamada (conforme especificação PFF1, PFF2 ou PFF3) retém partículas de diferentes granulometrias, protegendo as vias respiratórias de poeiras finas, névoas de tinta e bioaerossóis. A válvula exalatória (nos modelos com válvula) reduz a umidade interna e facilita a respiração, aumentando o conforto em uso prolongado. O clipe nasal ajustável garante vedação perfeita ao rosto.`,
    benefits: p => [
      'Filtragem de alta eficiência para partículas e névoas',
      'Clipe nasal ajustável para vedação facial perfeita',
      'Elásticos confortáveis que não pressionam as orelhas',
      'Válvula exalatória para maior conforto térmico',
      'Certificação CA do Ministério do Trabalho',
      'Design dobrável para fácil armazenagem e transporte',
    ],
    applications: p => `Utilizadas em ambientes com poeiras e partículas (obras, carpintaria, mineração), aplicação de tintas e vernizes com solventes, manuseio de produtos químicos em pó, trabalhos de soldagem e corte de metais, e qualquer ambiente com concentrações de partículas ou gases acima dos limites de tolerância.`,
    tips: 'Substitua a máscara ao perceber dificuldade de respiração, odores ou quando a máscara estiver úmida. Nunca lave máscaras descartáveis.',
  },
  'Máscara de solda': {
    intro: p => `A ${p.name} é uma máscara de solda profissional com proteção facial completa contra a intensa luminosidade do arco de solda, respingos metálicos e radiação UV/IR. Desenvolvida para soldadores profissionais que exigem conforto e segurança em longas jornadas de trabalho.`,
    body: p => `A lente de escurecimento automático (nos modelos auto-escurecimento) detecta o arco de solda em milissegundos e escurece instantaneamente, eliminando a necessidade de levantar e baixar a máscara entre os passes. O grau de escurecimento ajustável (tipicamente DIN 9-13) permite adaptação a diferentes processos de soldagem (MMA, MIG/MAG, TIG). A estrutura em polipropileno de alta resistência protege o rosto de respingos e irradiação.`,
    benefits: p => [
      'Proteção UV/IR total para olhos e rosto',
      'Lente auto-escurecimento de resposta rápida (modelos ADF)',
      'Grau de escurecimento ajustável para diferentes processos',
      'Suspensão de cabeça ajustável para diferentes tamanhos',
      'Campo de visão amplo para maior controle do cordão',
      'Visor em policarbonato resistente a respingos',
    ],
    applications: p => `Obrigatória para todos os processos de soldagem: MMA (eletrodo revestido), MIG/MAG, TIG, solda oxiacetilênica e plasma. Também recomendada para operações de esmerilhamento e corte que gerem faíscas e partículas quentes.`,
    tips: 'Inspecione a lente regularmente. Lentes com riscos profundos devem ser substituídas imediatamente para manter a proteção visual adequada.',
  },
  'Colete refletivo': {
    intro: p => `O ${p.name} é um colete de sinalização com faixas refletivas de alta visibilidade, desenvolvido para proteger trabalhadores em ambientes com tráfego de veículos, obras, logística e trabalho noturno. Com tecido resistente e confortável, garante visibilidade a longas distâncias.`,
    body: p => `As faixas refletivas em microprisma ou microesferas de vidro refletem a luz de veículos em até 300 metros de distância, garantindo a visibilidade do trabalhador em condições de baixa luminosidade. O tecido em poliéster de alta tenacidade resiste a lavagens frequentes sem perder as propriedades refletivas. O design amplo com fechamento por velcro se adapta a diferentes manequins e permite uso sobre uniformes e EPIs.`,
    benefits: p => [
      'Faixas refletivas de alta visibilidade noturna',
      'Tecido em poliéster resistente a lavagens frequentes',
      'Fechamento por velcro para ajuste rápido',
      'Atende às normas NR-6 e ABNT NBR 15292',
      'Certificação CA do Ministério do Trabalho',
      'Leveza para uso prolongado sem desconforto',
    ],
    applications: p => `Obrigatório para trabalhadores em ambientes com tráfego de veículos (obras de estrada, sinalização viária, aeroportos), operações logísticas em armazéns com empilhadeiras, trabalhos noturnos em geral, equipes de emergência e resgate, e atividades de esportes e ciclismo em vias públicas.`,
    tips: 'Lave o colete conforme as instruções da etiqueta. Substitua quando as faixas refletivas perderem a eficiência de reflexão.',
  },
  'Multímetros': {
    intro: p => `O ${p.name} é um multímetro digital profissional desenvolvido para medição precisa de tensão, corrente, resistência, continuidade e outros parâmetros elétricos em instalações residenciais, comerciais e industriais. Com display de alta resolução e proteção CAT II/III, garante medições seguras e confiáveis.`,
    body: p => `O display LCD retroiluminado com grande número de dígitos e escala analógica de barras facilita a leitura em qualquer condição de luminosidade. A seleção automática de faixa (AutoRange) elimina a necessidade de ajustar manualmente a escala de medição, agilizando o trabalho em campo. A proteção contra sobretensão nas ponteiras e a entrada fused para corrente protegem o instrumento e o operador em caso de erro de conexão.`,
    benefits: p => [
      'Medição de tensão AC/DC, corrente e resistência',
      'Seleção automática de faixa (AutoRange)',
      'Display LCD retroiluminado de alta resolução',
      'Proteção contra sobretensão e entrada fused',
      'Funções de diodo, continuidade e capacitância',
      'Holdeira para medir e registrar valores',
    ],
    applications: p => `Utilizado em instalações elétricas residenciais e industriais, manutenção de equipamentos eletrônicos, diagnóstico de sistemas automotivos, controle de qualidade na indústria, ensaios de cabos e conectores, e qualquer aplicação que exija medição elétrica confiável.`,
    tips: 'Conecte sempre a ponteira preta (COM) antes da vermelha. Inspecione as ponteiras e os cabos antes de cada uso para garantir a integridade do isolamento.',
  },
  'Níveis e prumos': {
    intro: p => `O ${p.name} é um instrumento de medição de alta precisão desenvolvido para verificação de horizontalidade, verticalidade e ângulos em obras de construção civil, marcenaria, instalações e trabalhos de alinhamento. Com ampolas de nível calibradas e construção robusta, garante leituras confiáveis em campo.`,
    body: p => `As ampolas de nível em vidro com líquido especial garantem estabilidade da bolha e leitura precisa mesmo em temperaturas extremas. O perfil em alumínio extrudado de alta resistência com proteção de borracha nas extremidades absorve impactos sem comprometer a planeza da régua de referência. A escala de ângulos integrada permite medição direta de inclinações sem instrumentos adicionais.`,
    benefits: p => [
      'Ampolas de nível calibradas para alta precisão',
      'Perfil em alumínio resistente com proteção de borracha',
      'Leitura em diferentes planos (horizontal, vertical e 45°)',
      'Escala de ângulos integrada na régua',
      'Imãs integrados para fixação em superfícies metálicas',
      'Compatível com nivelamento de pisos, paredes e estruturas',
    ],
    applications: p => `Indispensável para nivelamento de pisos e contrapiso, assentamento de revestimentos cerâmicos, instalação de janelas, portas e guarda-corpos, alinhamento de prateleiras e armários, montagem de estruturas metálicas, e qualquer aplicação que exija horizontalidade ou verticalidade precisa.`,
    tips: 'Verifique periodicamente a calibração das ampolas posicionando o nível sobre uma superfície de referência e girando 180°. A bolha deve estar centrada nas duas posições.',
  },
  'Trenas': {
    intro: p => `A ${p.name} é uma trena de medição de alta precisão fabricada com fita em aço temperado e caixa resistente a impactos, desenvolvida para medições precisas em obras, marcenaria, instalações e levantamentos topográficos. Com sistema de trava e retorno automático, oferece praticidade e confiabilidade em qualquer situação.`,
    body: p => `A fita em aço com impressão em tinta resistente à abrasão mantém a legibilidade das graduações mesmo após uso intensivo e exposição a umidade. O gancho de medição flutuante compensa automaticamente a espessura do gancho em medições internas e externas, garantindo precisão em ambos os casos. A trava de fita automática mantém a medida desejada com segurança.`,
    benefits: p => [
      'Fita em aço temperado resistente à abrasão e umidade',
      'Gancho flutuante para precisão em medições internas e externas',
      'Caixa em ABS resistente a impactos e quedas',
      'Retorno automático com freio para maior segurança',
      'Graduação em milímetros e polegadas (mm/pol)',
      'Clip para fixação no cinto ou bolso',
    ],
    applications: p => `Utilizada para medição em obras de construção civil, marcenaria, instalações elétricas e hidráulicas, decoração de interiores, confecção de móveis sob medida, levantamentos imobiliários, projetos de paisagismo e qualquer aplicação que exija medição linear de comprimentos variados.`,
    tips: 'Não force a fita além do comprimento máximo. Ao retrair, segure a fita e deixe-a recolher suavemente para evitar dobras e danos à graduação.',
  },
  'Paquímetros': {
    intro: p => `O ${p.name} é um paquímetro de alta precisão desenvolvido para medição de dimensões externas, internas, profundidade e degraus em peças mecânicas, componentes industriais e trabalhos de usinagem. Com escala vernier ou display digital, oferece leituras rápidas e confiáveis com excelente resolução.`,
    body: p => `As mandíbulas de medição em aço inox endurecido e polido garantem superfícies de medição planas e paralelas, essenciais para medições precisas. A profundidade em régua de aço integrada ao cursor estende a versatilidade do instrumento para medição de ressaltos e cotas profundas. O trava do cursor permite fixar a medição desejada para facilitar a leitura e o registro.`,
    benefits: p => [
      'Mandíbulas em aço inox endurecido para máxima precisão',
      'Resolução de 0,02mm (vernier) ou 0,01mm (digital)',
      'Medição externa, interna, profundidade e degrau',
      'Régua de profundidade integrada ao cursor',
      'Escala em mm e polegadas (dual reading)',
      'Trava de cursor para registro fácil das medições',
    ],
    applications: p => `Utilizado na indústria metalúrgica para controle dimensional de peças usinadas, na mecânica de manutenção para verificação de desgaste, em oficinas de ferramentaria, joalheria, odontologia e em qualquer aplicação que exija medição dimensional de alta precisão.`,
    tips: 'Limpe as mandíbulas antes de cada medição. Calibre o instrumento com bloco padrão regularmente para garantir a exatidão das leituras.',
  },
  'Micrômetros': {
    intro: p => `O ${p.name} é um micrômetro de alta precisão desenvolvido para medição de dimensões externas com resolução de 0,01mm ou 0,001mm (conforme modelo), ideal para controle de qualidade de peças usinadas, controle dimensional em fundição e indústria metal-mecânica.`,
    body: p => `O fuso e a porca de avanço em aço inox endurecido garantem movimento suave e livre de folgas ao longo de toda a faixa de medição. O catraca (trinquete) de avanço garante a aplicação de força de medição constante e repetível, eliminando variações causadas pelo operador. A moldura em aço forjado com isoladores térmicos nas laterais evita a influência da temperatura da mão do operador na medição.`,
    benefits: p => [
      'Resolução de 0,01mm para medições de alta precisão',
      'Fuso e porca de avanço em aço inox endurecido',
      'Catraca de força de medição constante',
      'Isoladores térmicos no arco para leituras precisas',
      'Trava de fuso para fixação da medição',
      'Estojo de proteção e calibrador padrão inclusos',
    ],
    applications: p => `Utilizado no controle dimensional de eixos, buchas, pinos, molas, chapas e peças usinadas; verificação de desgaste de componentes mecânicos; controle de qualidade na indústria de precisão; fundição e tratamento térmico; e qualquer aplicação que exija precisão dimensional de centésimos ou milésimos de milímetro.`,
    tips: 'Armazene em estojo e proteja de impactos. Calibre com padrão de 0mm (superfície plana) e com padrão de comprimento do fabricante regularmente.',
  },
  'Torno mecânico': {
    intro: p => `O ${p.name} é um torno mecânico de alta precisão desenvolvido para usinagem de peças cilíndricas, cônicas, roscas e outros perfis de revolução em aço, ferro fundido, alumínio e outros metais e plásticos de engenharia. Com construção robusta e guias retificadas, garante precisão e repetibilidade nas operações de usinagem.`,
    body: p => `O barramento em ferro fundido retificado oferece alta rigidez e estabilidade dimensional necessárias para usinagem de precisão. O cabeçote fixo com caixa de velocidades de múltipla relação permite ampla variação de rotação e avanço, adaptando-se a diferentes materiais e ferramentas de corte. O carro transversal e longitudinal com escalas micrométricas garantem posicionamento preciso da ferramenta de corte.`,
    benefits: p => [
      'Barramento em ferro fundido retificado de alta rigidez',
      'Caixa de velocidades com múltiplas rotações',
      'Carro cruzado com escala micrométrica para posicionamento preciso',
      'Placa de 3 e 4 castanhas para diferentes geometrias',
      'Caixa de avanços para usinagem de roscas métricas e BSW',
      'Conjunto de ferramentas e acessórios inclusos',
    ],
    applications: p => `Utilizado para usinagem de eixos, buchas, mancais, pinos, parafusos, porcas e peças especiais em oficinas mecânicas de manutenção; ferramentarias; indústrias metalúrgicas; e escolas técnicas de formação profissional em usinagem.`,
    tips: 'Verifique o nível do óleo de lubrificação antes de cada uso. Proteja as guias do barramento com óleo e cobertura quando não estiver em uso.',
  },
  'Prensas hidráulicas': {
    intro: p => `A ${p.name} é uma prensa hidráulica de bancada desenvolvida para prensagem, extração e montagem de rolamentos, buchas, pinos e outros componentes mecânicos em oficinas de manutenção e ferramentarias. Com capacidade hidráulica elevada e mesa ajustável, oferece força e precisão para trabalhos exigentes.`,
    body: p => `O cilindro hidráulico de alta pressão com manômetro integrado permite monitorar a força aplicada em tempo real, evitando danos às peças e ferramentas. A mesa de trabalho ajustável em altura por parafuso central se adapta a peças de diferentes dimensões. A estrutura em aço soldado e pintado eletrostaticamente garante rigidez máxima e resistência à corrosão.`,
    benefits: p => [
      'Capacidade de prensagem hidráulica elevada',
      'Manômetro de pressão para controle da força aplicada',
      'Mesa ajustável para diferentes alturas de peça',
      'Estrutura em aço soldado de alta rigidez',
      'Válvula de alívio de sobrecarga integrada',
      'Manopla de acionamento ergonômica',
    ],
    applications: p => `Utilizada para prensagem e extração de rolamentos, buchas e retentores; endireitamento de eixos e barras; prensagem de pinos de cisalhamento; montagem de juntas e acoplamentos; e qualquer operação que exija aplicação de força linear controlada.`,
    tips: 'Use sempre chapas de proteção entre a prensa e a peça para evitar danos. Nunca exceda a capacidade máxima de prensagem especificada.',
  },
  'Retificadeiras': {
    intro: p => `A ${p.name} é uma retificadora de bancada desenvolvida para afiação e retífica de ferramentas de corte, usinagem de superfícies planas e acabamento de peças metálicas. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} e rebolo de grão fino, oferece acabamento superficial de alta qualidade.`,
    body: p => `O eixo balanceado dinamicamente garante vibração mínima durante a operação, essencial para acabamento de precisão. A proteção de rebolo ajustável e o apoio de ferramenta regulável facilitam o posicionamento correto das peças para afiação e retífica. O motor com proteção térmica garante operação segura em ciclos contínuos prolongados.${sv(p,'Tensão') ? ` Opera em ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} de alto desempenho`,
      'Eixo balanceado para operação suave e precisa',
      'Apoio de ferramenta regulável em ângulo',
      'Proteção de rebolo ajustável',
      'Rebolos de diferentes granulometrias inclusos',
      'Base robusta para fixação em bancada',
    ],
    applications: p => `Utilizada para afiação de brocas, ponteiros, alicates e ferramentas de torno; retífica de pequenas superfícies planas; limpeza de pontas de solda; preparação de superfícies para soldagem; e acabamento de peças metálicas de pequeno porte.`,
    tips: 'Use óculos de proteção e protetor facial ao retificar. Nunca pressione excessivamente a peça contra o rebolo para evitar trincas.',
  },
  'Moto esmeril': {
    intro: p => `O ${p.name} é um moto esmeril de bancada desenvolvido para afiação de ferramentas de corte, desbaste de pequenas peças e polimento de metais. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} e dois rebolos (pedra e feltro), é a ferramenta ideal para manutenção de ferramentas em oficinas.`,
    body: p => `O conjunto de dois rebolos — pedra abrasiva para afiação e disco de feltro/lona para polimento — permite executar operações de acabamento sequenciais sem troca de ferramentas. O apoio regulável em ângulo facilita a afiação de brocas e ponteiros em ângulos precisos e repetíveis. A proteção de rebolo com visor transparente garante segurança ao operador durante o uso.${sv(p,'Tensão') ? ` Opera em ${sv(p,'Tensão')}.` : ''}`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} para operação contínua`,
      'Duplo rebolo: abrasivo e feltro para polimento',
      'Apoio de ferramenta regulável em ângulo',
      'Proteção com visor transparente inclusa',
      'Suporte para afiação de brocas incluso',
      'Base para fixação em bancada',
    ],
    applications: p => `Afiação de brocas helicoidais, ponteiros de cinzel, formões, facas, tesouras e alicates; polimento de superfícies metálicas; desbaste de rebarbas em peças pequenas; e manutenção geral de ferramentas em oficinas e ferramentarias.`,
    tips: 'Mantenha os rebolos dresseados (dressados) para garantir superfície de corte uniforme. Nunca use o lado lateral do rebolo de pedra.',
  },
  'Soprador térmico': {
    intro: p => `O ${p.name} é um soprador de ar quente profissional desenvolvido para aplicações que exigem calor localizado e controlado, como termoretração de embalagens, remoção de adesivos, dobramento de tubos de PVC, soldagem de plásticos e muito mais. Com motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} e temperatura ajustável, oferece versatilidade e precisão.`,
    body: p => `O elemento de aquecimento em espiral de aço inox de longa duração garante temperatura estável e uniforme do fluxo de ar, essencial para aplicações que exigem controle preciso de calor. O motor de alta velocidade de rotação produz vazão de ar constante, mantendo a temperatura mesmo em aplicações que exijam fluxo elevado. As bicos intercambiáveis (redutores, defletores e refletores) adaptam o fluxo de calor a diferentes aplicações.`,
    benefits: p => [
      `Motor${sv(p,'Potência') ? ` de ${sv(p,'Potência')}` : ''} com elemento de aquecimento de aço inox`,
      'Temperatura e fluxo de ar ajustáveis',
      'Kit de bicos intercambiáveis para diferentes aplicações',
      'Suporte integrado para uso em bancada sem mão',
      'Display de temperatura para controle preciso',
      'Proteção contra superaquecimento automática',
    ],
    applications: p => `Termoretração de capas protetoras e embalagens; remoção de adesivos, papéis de parede e stickers; dobramento de tubos de PVC e materiais termoplásticos; solda de PVC e geomembranas; secagem de tintas e vernizes; desobstrução de tubulações com água congelada; e trabalhos de restauração de veículos.`,
    tips: 'Nunca bloqueie a entrada de ar durante o uso. Deixe o soprador esfriar em modo de ventilação por alguns minutos antes de desligar.',
  },
  'Grampeador e pinador': {
    intro: p => `O ${p.name} é uma ferramenta de fixação rápida desenvolvida para cravamento de grampos e pinos em madeira, MDF, compensado, tecidos e outros materiais. Com mecanismo de acionamento eficiente, garante fixação rápida, segura e precisa em aplicações de marcenaria, estofamento e acabamento.`,
    body: p => `O mecanismo de percussão calibrado garante que grampos e pinos sejam cravados com profundidade uniforme em qualquer material dentro do espectro de uso recomendado. O guia de profundidade ajustável previne o excessivo afundamento dos grampos em materiais mais macios. O magazine de alta capacidade reduz as paradas para recarga, aumentando a produtividade em trabalhos sequenciais.`,
    benefits: p => [
      'Mecanismo de percussão calibrado para profundidade uniforme',
      'Compatível com grampos e pinos de diferentes tamanhos',
      'Magazine de alta capacidade para recarga menos frequente',
      'Guia de profundidade ajustável',
      'Escape de grampos encravados facilitado',
      'Construção compacta e leve para uso prolongado',
    ],
    applications: p => `Utilizado em montagem de móveis de madeira e MDF, estofamento de sofás e cadeiras, fixação de forros e lambris, instalação de redes e telas de proteção, embalagem de produtos, aplicação de lonas e coberturas, e trabalhos de marcenaria em geral.`,
    tips: 'Use sempre grampos da bitola adequada ao material. Nunca aponte a ferramenta para pessoas durante o carregamento ou uso.',
  },
};

// Fallback genérico
const defaultData: SubcatData = {
  intro: p => `O ${p.name} é um equipamento${p.subcategory ? ` da categoria ${p.subcategory}` : ''} desenvolvido para atender às mais exigentes demandas profissionais. Fabricado com materiais de alta qualidade e tecnologia de ponta, oferece desempenho confiável, durabilidade excepcional e resultados superiores em todas as aplicações para as quais foi projetado.`,
  body: p => `Com design ergonômico e construção robusta, este produto combina facilidade de uso com alta performance operacional. O controle de qualidade rigoroso em todas as etapas da fabricação garante que cada unidade entregue atenda aos mais altos padrões de desempenho e segurança do setor. ${Object.keys(specs(p)).filter(k => k !== 'SKU').map(k => `${k}: ${specs(p)[k]}`).join('. ')}.`,
  benefits: p => [
    'Fabricação com materiais de alta qualidade selecionados',
    'Design ergonômico para conforto e produtividade',
    'Construção robusta para uso intensivo e prolongado',
    'Controle de qualidade rigoroso de fábrica',
    'Garantia do fabricante para tranquilidade na compra',
    'Suporte técnico especializado disponível',
  ],
  applications: p => `Adequado para uso profissional em ambientes industriais, oficinas, obras e serviços especializados. Versátil o suficiente para atender desde profissionais autônomos até grandes empresas, com performance consistente em todas as situações de uso previstas.`,
  tips: 'Leia o manual de instruções antes do primeiro uso. Realize a manutenção preventiva nos intervalos recomendados pelo fabricante para garantir desempenho e segurança.',
};

// ─── Componente principal ──────────────────────────────────────────────────

interface Props {
  product: Product;
}

const ProductDescription: React.FC<Props> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const data = SUBCAT_DATA[product.subcategory] || defaultData;
  const specEntries = Object.entries(product.specs || {}).filter(([k]) => k !== 'SKU');
  const brand = sv(product, 'Marca');

  return (
    <div className="font-poppins">
      {/* Título/Resumo */}
      <p className="text-[13px] font-black text-gray-900 mb-4 leading-relaxed uppercase tracking-tight">
        {product.description}
      </p>

      {/* Intro paragraph */}
      <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
        {data.intro(product)}
      </p>

      {/* Benefits list */}
      <div className="mb-4">
        <p className="text-[12px] font-black text-[#222] uppercase tracking-widest mb-2 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-[#FF5A00]" />
          Características e Benefícios
        </p>
        <ul className="space-y-1.5">
          {data.benefits(product).map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] text-gray-600">
              <span className="text-[#FF5A00] font-black mt-0.5 shrink-0">›</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable section */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-1.5 text-[12px] font-bold text-[#FF5A00] hover:text-[#cc4a00] transition-colors mt-2 group"
        >
          <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          Ver descrição completa
        </button>
      )}

      {expanded && (
        <>
          {/* Body paragraph */}
          <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
            {data.body(product)}
          </p>

          {/* Applications */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
            <p className="text-[12px] font-black text-[#222] uppercase tracking-widest mb-2 flex items-center gap-2">
              <Zap size={13} className="text-[#FF5A00]" />
              Aplicações e Uso Recomendado
            </p>
            <p className="text-[12px] text-gray-600 leading-relaxed">
              {data.applications(product)}
            </p>
          </div>

          {/* Tips */}
          <div className="border border-[#FF5A00]/20 rounded-lg p-4 mb-4 bg-orange-50/30">
            <p className="text-[12px] font-black text-[#FF5A00] uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <Star size={12} fill="currentColor" />
              Dica Profissional
            </p>
            <p className="text-[12px] text-gray-600 leading-relaxed">
              {data.tips}
            </p>
          </div>

          {/* Brand info if available */}
          {brand && (
            <div className="flex items-center gap-3 py-3 border-t border-gray-100">
              <Shield size={14} className="text-[#FF5A00] shrink-0" />
              <p className="text-[12px] text-gray-500">
                Produto <span className="font-bold text-[#222]">{brand}</span>, marca líder no segmento,{' '}
                com garantia de fábrica e suporte técnico especializado.
              </p>
            </div>
          )}

          <button
            onClick={() => setExpanded(false)}
            className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400 hover:text-[#222] transition-colors mt-2 group"
          >
            <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            Recolher descrição
          </button>
        </>
      )}
    </div>
  );
};

export default ProductDescription;