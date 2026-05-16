import { Product } from './types';

export const CATEGORIES = [
  { 
    id: 'eletricas', 
    name: 'Ferramentas Elétricas', 
    icon: 'Zap',
    subcategories: [
      'Furadeiras', 'Parafusadeiras', 'Esmerilhadeiras', 'Lixadeiras e politrizes', 
      'Marteletes', 'Serras Elétricas', 'Máquinas de solda', 'Retificadeiras', 
      'Moto esmeril', 'Soprador térmico', 'Grampeador e pinador', 'Compressores', 'Motores elétricos'
    ]
  },
  { 
    id: 'manuais', 
    name: 'Ferramentas Manuais', 
    icon: 'Wrench',
    subcategories: [
      'Chaves', 'Jogos de ferramentas', 'Soquetes', 'Alicates', 
      'Martelos e marretas', 'Grampos', 'Rebitadores', 'Ferramentas de medição', 
      'Chave de roda', 'Ferramentas para cano', 'Maletas e organização'
    ]
  },
  { 
    id: 'jardim', 
    name: 'Jardinagem e Agrícola', 
    icon: 'Leaf',
    subcategories: [
      'Roçadeiras', 'Motoserras', 'Cortadores de Grama', 'Aparadores de Grama', 
      'Aparadores de Cerca Viva', 'Trituradores', 'Pulverizadores', 'Motobombas', 
      'Mangueiras e Irrigação', 'Geradores a Diesel', 'Geradores a Gasolina', 
      'Motores Estacionários', 'Motocultivadores', 'Perfuradores de Solo', 
      'Sopradores de Folhas', 'Ferramentas de Jardim', 'Grama sintética'
    ]
  },
  { 
    id: 'autocenter', 
    name: 'Autocenter / Oficina', 
    icon: 'Car',
    subcategories: [
      'Elevadores automotivos', 'Macacos hidráulicos', 'Rampas automotivas', 'Balanceadoras', 
      'Prensas hidráulicas', 'Torno mecânico', 'Carrinhos para oficina', 'Equipamentos hidráulicos', 
      'Móveis para oficina'
    ]
  },
  { id: 'auto-eletrica', name: 'Auto Elétrica', icon: 'Battery', subcategories: ['Carregadores de bateria'] },
  { id: 'pneumaticas', name: 'Ferramentas Pneumáticas', icon: 'Wind', subcategories: ['Chave de impacto', 'Politriz pneumática'] },
  { id: 'limpeza', name: 'Lava-jato e Limpeza', icon: 'Droplets', subcategories: ['Lavadoras de Alta Pressão', 'Lavadoras de média pressão', 'Aspiradores de pó', 'Aspirador água e pó'] },
  { id: 'funilaria', name: 'Funilaria e Pintura', icon: 'Palette', subcategories: ['Pistolas de pintura', 'Equipamentos para pintura automotiva', 'Martelinho de ouro', 'Eletrodos e arames'] },
  { id: 'epi', name: 'EPI (Segurança)', icon: 'ShieldCheck', subcategories: ['Máscaras de proteção', 'Luvas', 'Luvas de proteção', 'Óculos de proteção', 'Máscara de solda', 'Colete refletivo', 'Botas de segurança'] },
  { id: 'construcao', name: 'Construção Civil', icon: 'Hammer', subcategories: ['Betoneiras', 'Escadas', 'Trenas', 'Níveis e prumos', 'Ferramentas de pedreiro', 'Guinchos', 'Serrotes', 'Plainas'] },
  { id: 'medicao', name: 'Instrumentos e Medição', icon: 'Ruler', subcategories: ['Multímetros', 'Paquímetros', 'Micrômetros', 'Scanners automotivos'] },
];

export const OTHER_LINKS = [
  'Compressor de ar 100 litros', 'Parafusadeira vonder 20v', 'Talhadeira manual', 'Tupia de coluna', 
  'Escada 3 degraus', 'Trena a laser Bosch 100m', 'Plaina desengrossadeira industrial', 'Lixadeira de cinta e disco', 
  'Lixadeiras Dewalt', 'Betoneira de 200 litros', 'Nylon para roçadeira', 'Bomba sapo silenciosa', 
  'Pistola de pintura automotiva de baixa pressão', 'Mesa para tupia invertida', 'Caixa de ferramentas Tramontina Pro', 
  'Compressosres Schulz', 'Roçadeira Vulcan', 'Disco para lixadeira 7 polegadas', 'Lanterna tática', 
  'Corrente motosserra', 'Esmerilhadeira Skil', 'Multimetro Minipa profissional', 'Disco para roçadeira', 
  'Fita antiderrapante para piso externo', 'Esquadro de alumínio', 'Plataforma para andaime', 
  'Compressor de ar Chiaperini 150 litros', 'Trena de 50 metros', 'Politriz Bosch', 'Plaina de bancada profissional', 
  'Tomada de 20 amperes', 'Compressor Motomil', 'Soldas Boxer', 'Roda com pneu para carrinho de mão', 
  'Bota EPI Caterpillar', 'Politriz roto orbital', 'Kit saca pino', 'Politriz Dewalt', 'Pneu para carrinho de mão', 
  'Martelete rompedor', 'Roçadeira a gasolina Makita 4 tempos', 'Jogo de formão profissional', 
  'Torquímetro estalo 1 2', 'Roçadeira costal', 'Serra circular Makita a bateria', 'Lixadeira orbital para madeira', 
  'Fresa para tupia 6mm', 'Esmerilhadeira Bosch com controle de velocidade', 'Parafusadeira Bosch 12v', 
  'Alicate prensa terminal', 'Disco para policorte', 'Elevador automotivo de 4 toneladas', 
  'Furadeira e parafusadeira 20v', 'Policorte Makita', 'Talha de 1 tonelada', 'Suporte de esmerilhadeira', 
  'Elevador hidráulico', 'Chumbador parabolt', 'Lixadeira orbital elétrica', 'Torquímetro digital', 
  'Afiador de brocas profissional', 'Serra copo para concreto 100m', 'Parafusadeira Bosch 18v', 
  'Parafusadeira Makita 18v', 'Parafusadeira de impacto elétrica', 'Solda mig sem gás', 
  'Máquina de solda a laser portátil', 'Parafusadeira Deko 20v', 'Dia dos pais', 'Black friday'
];

