import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface PlantData {
  name: string;
  monthlyConsumption: number;
  groundwaterExtraction: number;
  municipalUsage: number;
  recycledUsage: number;
  rainwaterHarvested: number;
  rechargeProjects: number;
  csrBudget: number;
  region: "rajasthan" | "tamilnadu" | "karnataka";
}

export interface WaterDataset {
  plants: PlantData[];
  lastUpdated: string;
  updatedBy: string;
}

const defaultPlants: PlantData[] = [
  { name: "Plant Alpha", monthlyConsumption: 12500, groundwaterExtraction: 8000, municipalUsage: 2500, recycledUsage: 1200, rainwaterHarvested: 800, rechargeProjects: 15000, csrBudget: 240, region: "rajasthan" },
  { name: "Plant Beta", monthlyConsumption: 8700, groundwaterExtraction: 5000, municipalUsage: 2000, recycledUsage: 1000, rainwaterHarvested: 700, rechargeProjects: 11200, csrBudget: 180, region: "tamilnadu" },
  { name: "Plant Gamma", monthlyConsumption: 15300, groundwaterExtraction: 9000, municipalUsage: 3500, recycledUsage: 1800, rainwaterHarvested: 1000, rechargeProjects: 18500, csrBudget: 310, region: "karnataka" },
  { name: "Plant Delta", monthlyConsumption: 6200, groundwaterExtraction: 3200, municipalUsage: 1500, recycledUsage: 800, rainwaterHarvested: 700, rechargeProjects: 7800, csrBudget: 120, region: "rajasthan" },
];

interface WaterDataContextType {
  dataset: WaterDataset;
  updateDataset: (plants: PlantData[], updatedBy: string) => void;
  resetDataset: () => void;
  totalConsumed: number;
  totalRecharged: number;
  totalGroundwater: number;
  replenishmentRatio: number;
  complianceStatus: "green" | "yellow" | "red";
  groundwaterElimination: number;
  daysTo2027: number;
}

const WaterDataContext = createContext<WaterDataContextType | undefined>(undefined);

export const WaterDataProvider = ({ children }: { children: ReactNode }) => {
  const [dataset, setDataset] = useState<WaterDataset>(() => {
    const stored = localStorage.getItem("neerniti-water-data");
    if (stored) return JSON.parse(stored);
    return { plants: defaultPlants, lastUpdated: new Date().toISOString(), updatedBy: "system" };
  });

  useEffect(() => {
    localStorage.setItem("neerniti-water-data", JSON.stringify(dataset));
  }, [dataset]);

  const updateDataset = useCallback((plants: PlantData[], updatedBy: string) => {
    setDataset({ plants, lastUpdated: new Date().toISOString(), updatedBy });
  }, []);

  const resetDataset = useCallback(() => {
    setDataset({ plants: defaultPlants, lastUpdated: new Date().toISOString(), updatedBy: "system" });
  }, []);

  const totalConsumed = dataset.plants.reduce((a, p) => a + p.monthlyConsumption, 0);
  const totalRecharged = dataset.plants.reduce((a, p) => a + p.rechargeProjects, 0);
  const totalGroundwater = dataset.plants.reduce((a, p) => a + p.groundwaterExtraction, 0);
  const replenishmentRatio = totalConsumed > 0 ? totalRecharged / totalConsumed : 0;
  const complianceStatus: "green" | "yellow" | "red" = replenishmentRatio >= 1.5 ? "green" : replenishmentRatio >= 1.0 ? "yellow" : "red";
  const groundwaterElimination = totalConsumed > 0 ? Math.round((1 - totalGroundwater / totalConsumed) * 100) : 0;

  const deadline = new Date("2027-01-01");
  const now = new Date();
  const daysTo2027 = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <WaterDataContext.Provider value={{
      dataset, updateDataset, resetDataset,
      totalConsumed, totalRecharged, totalGroundwater,
      replenishmentRatio, complianceStatus, groundwaterElimination, daysTo2027,
    }}>
      {children}
    </WaterDataContext.Provider>
  );
};

export const useWaterData = () => {
  const ctx = useContext(WaterDataContext);
  if (!ctx) throw new Error("useWaterData must be used within WaterDataProvider");
  return ctx;
};
