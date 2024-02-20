import {
  AwardIcon,
  BarChart4Icon,
  FileBarChart2Icon,
  FileIcon,
  PackageIcon,
  SendIcon,
} from "lucide-react";

import feature1 from "@/components/images/feature-1.svg";
import feature2 from "@/components/images/feature-2.svg";

export const visualFeatures = [
  {
    title: "Adicione e Organize Itens Facilmente",
    description:
      "Nossa plataforma permite que os donos do estabelecimento adicionem e organizem itens ao cardápio de forma intuitiva, sem complicações.",
    img: feature1,
  },
  {
    title: "Pedidos Personalizados com QR Code",
    description:
      "Os clientes podem fazer pedidos personalizados escaneando um QR code diretamente na mesa, simplificando o processo de atendimento.",
    img: feature2,
  },
];

export const features = [
  {
    icon: <BarChart4Icon />,
    title: "Estimativas e Gráficos de Vendas",
    description:
      "Utilize os dados detalhados de vendas para criar estimativas precisas e visualizar informações através de gráficos, auxiliando na tomada de decisões estratégicas.",
  },
  {
    icon: <FileIcon />,
    title: "Visualização de Dados de Vendas",
    description:
      "Acesse facilmente os dados de vendas de todos os dias e visualize-os de maneira clara e intuitiva para melhorar a compreensão e análise.",
  },
  {
    icon: <SendIcon />,
    title: "Experiência de Pedido Personalizada",
    description:
      "Ofereça uma experiência de pedido personalizada para cada cliente, permitindo que cada um faça pedidos de acordo com suas preferências.",
  },
  {
    icon: <AwardIcon />,
    title: "Status em Tempo Real",
    description:
      "Mantenha seus clientes informados com atualizações em tempo real sobre o status de seus pedidos, garantindo uma experiência satisfatória.",
  },
  {
    icon: <FileBarChart2Icon />,
    title: "Análise de Tendências de Vendas",
    description:
      "Analise tendências de vendas ao longo do tempo para identificar padrões de compra e ajustar estratégias de forma proativa.",
  },
  {
    icon: <PackageIcon />,
    title: "Relatórios Detalhados de Vendas",
    description:
      "Acesse relatórios detalhados de vendas para cada período, permitindo uma análise profunda e a tomada de decisões embasadas em dados concretos.",
  },
];
