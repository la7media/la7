// composables/usePricing.ts
export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  badge?: string;
  price: {
    inscription: number | string;
    monthly: number;
    annual?: number;
    launchPrice?: {
      monthly: number;
      validUntil: string;
    };
  };
  features: PlanFeature[];
  cta: {
    text: string;
    variant: "primary" | "secondary" | "gradient";
  };
  popular?: boolean;
}

export interface CommunityInfo {
  title: string;
  description: string;
  features: string[];
}

export const usePricing = () => {
  const communityInfo: CommunityInfo = {
    title: "Inscripción Flexible",
    description:
      "Inscríbete con el valor que desees y destaca en el feed de comercios. Si tu aporte cubre algún plan, se aplicará automáticamente.",
    features: [
      "Valor de inscripción permanente",
      "Prioridad en el feed de comercios",
      "Inscripción a comunidades locales",
      "Mayor visibilidad sin ubicación activa",
    ],
  };

  const plans: Plan[] = [
    {
      id: "free",
      name: "Gratuito",
      description: "Perfecto para empezar tu presencia digital",
      price: {
        inscription: "Gratis",
        monthly: 0,
      },
      features: [
        { text: "Crear negocio/servicio", included: true, highlight: true },
        { text: "Siempre gratuito", included: true, highlight: true },
        { text: "Los usuarios pueden agregarte a favoritos", included: true },
        { text: "Perfil básico del comercio", included: true },
        { text: "Creación de bonos", included: false },
        { text: "Información de clientes", included: false },
        { text: "Patrocinio de eventos", included: false },
      ],
      cta: {
        text: "Comenzar Gratis",
        variant: "secondary",
      },
    },
    {
      id: "basic",
      name: "Básico",
      description: "Ideal para comercios que quieren interactuar con clientes",
      badge: "Precio de Lanzamiento",
      price: {
        inscription: 20000,
        monthly: 15000,
        annual: 120000,
        launchPrice: {
          monthly: 10000,
          validUntil: "11 de julio",
        },
      },
      features: [
        { text: "Todo lo del plan gratuito", included: true },
        { text: "Creación de bonos", included: true, highlight: true },
        {
          text: "100 redenciones de bonos incluidas",
          included: true,
          highlight: true,
        },
        { text: "Redenciones adicionales: $100 c/u", included: true },
        {
          text: "Acceso a información de clientes",
          included: true,
          highlight: true,
        },
        { text: "Postulación para patrocinar eventos", included: true },
        { text: "Pago de patrocinio: desde $10,000", included: true },
      ],
      cta: {
        text: "Comenzar Básico",
        variant: "primary",
      },
      popular: true,
    },
    {
      id: "entrepreneur",
      name: "Emprendedor",
      description: "Para emprendedores que buscan mayor visibilidad",
      price: {
        inscription: 50000,
        monthly: 30000,
        annual: 240000,
      },
      features: [
        { text: "Todo lo del plan básico", included: true },
        { text: "Indicador de emprendedor", included: true, highlight: true },
        {
          text: "Mayor relevancia en el feed",
          included: true,
          highlight: true,
        },
        {
          text: "500 redenciones de bonos incluidas",
          included: true,
          highlight: true,
        },
        {
          text: "Acceso anticipado a nuevas características",
          included: true,
          highlight: true,
        },
        { text: "Patrocinio de eventos con mayor relevancia", included: true },
      ],
      cta: {
        text: "Ser Emprendedor",
        variant: "gradient",
      },
    },
    {
      id: "partner",
      name: "Partner",
      description: "Máxima visibilidad y beneficios premium",
      badge: "Precio de Lanzamiento",
      price: {
        inscription: 100000,
        monthly: 80000,
        annual: 640000,
        launchPrice: {
          monthly: 30000,
          validUntil: "11 de julio",
        },
      },
      features: [
        { text: "Todo lo del plan emprendedor", included: true },
        { text: "Indicador de partner", included: true, highlight: true },
        {
          text: "Máxima relevancia en el feed",
          included: true,
          highlight: true,
        },
        {
          text: "Redenciones ilimitadas de bonos",
          included: true,
          highlight: true,
        },
        { text: "Soporte prioritario", included: true },
        { text: "Análisis avanzados", included: true },
      ],
      cta: {
        text: "Ser Partner",
        variant: "gradient",
      },
    },
    {
      id: "creator",
      name: "Creador",
      description: "Crea y gestiona tu propia comunidad",
      price: {
        inscription: "Variable",
        monthly: 0,
      },
      features: [
        { text: "Creación de comunidad", included: true, highlight: true },
        {
          text: "Precio de afiliación personalizable",
          included: true,
          highlight: true,
        },
        {
          text: "Múltiples comercios asociados",
          included: true,
          highlight: true,
        },
        {
          text: "30% de comisión por comercio afiliado",
          included: true,
          highlight: true,
        },
        {
          text: "Creación de eventos físicos y digitales",
          included: true,
          highlight: true,
        },
        { text: "Aceptar patrocinios de comercios", included: true },
        { text: "Código libre del frontend", included: true, highlight: true },
        { text: "Personalización completa de la comunidad", included: true },
      ],
      cta: {
        text: "Crear Comunidad",
        variant: "gradient",
      },
    },
  ];

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAnnualDiscount = (monthly: number, annual: number): number => {
    return Math.round((1 - annual / (monthly * 12)) * 100);
  };

  const isLaunchPriceActive = (plan: Plan): boolean => {
    if (!plan.price.launchPrice) return false;

    // Aquí podrías agregar lógica real de fecha
    const now = new Date();
    const launchDeadline = new Date("2024-07-11");
    return now < launchDeadline;
  };

  return {
    plans,
    communityInfo,
    formatPrice,
    getAnnualDiscount,
    isLaunchPriceActive,
  };
};
