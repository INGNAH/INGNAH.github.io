// Replace these empty fields with real resume information. Never invent credentials.
export interface ResumeEntry {
  title: string;
  organization: string;
  period: string;
  details: string[];
}

export const resume = {
  name: 'INGNAH',
  role: '',
  summary: '',
  location: '',
  email: '',
  experience: [] as ResumeEntry[],
  education: [] as ResumeEntry[],
  skills: [] as string[],
};
