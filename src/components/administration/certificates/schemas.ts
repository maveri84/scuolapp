
import { z } from "zod";

// Schema for certificate form validation
export const certificateFormSchema = z.object({
  name: z.string().min(3, { message: "Il nome deve contenere almeno 3 caratteri" }),
  type: z.string().min(1, { message: "Seleziona un tipo di certificato" }),
  target: z.enum(["studenti", "docenti", "entrambi"], {
    required_error: "Seleziona a chi è destinato il certificato",
  }),
  description: z.string().optional(),
  content: z.string().min(1, { message: "Il contenuto non può essere vuoto" }),
  includeHeader: z.boolean().default(true),
  includeFooter: z.boolean().default(true),
});

// Schema for certificate generation form
export const certificateGenerationSchema = z.object({
  templateId: z.string().min(1, { message: "Seleziona un modello" }),
  recipientId: z.string().min(1, { message: "Seleziona un destinatario" }),
  additionalData: z.record(z.string()).optional(),
  sendEmail: z.boolean().default(false),
  saveToFile: z.boolean().default(false),
  signDocument: z.boolean().default(false),
});

export type CertificateFormValues = z.infer<typeof certificateFormSchema>;
export type CertificateGenerationValues = z.infer<typeof certificateGenerationSchema>;
