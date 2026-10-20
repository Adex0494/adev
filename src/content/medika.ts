/** Verified against MEDIKA's package manifest and implemented screens; no live data access. */
export const medikaTechnologies = ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'] as const
export const medikaCapabilities = ['patients', 'waiting', 'consultations', 'history', 'diagnoses', 'prescriptions', 'documents', 'templates', 'reports', 'attachments', 'roles'] as const
export const medikaScreenshots = [
  { key: 'patients', file: 'medika-patients' },
  { key: 'history', file: 'medika-patient-history' },
  { key: 'consultation', file: 'medika-consultation' },
  { key: 'reports', file: 'medika-reports' },
] as const
