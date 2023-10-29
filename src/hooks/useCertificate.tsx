import { create } from "zustand";

interface CertificateStore {
  data: string;
}

export const useCertificate = create<CertificateStore>((set) => ({
  data: "",
  addCertificate: (data: CertificateStore) =>
    set((state) => ({ data: data.data })),
  removeCertificate: () => set({ data: "" }),
}));
