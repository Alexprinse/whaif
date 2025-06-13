export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FormData {
  name: string;
  currentBio: string;
  majorDecisions: string;
  dreamsNotPursued: string;
  selfie?: File;
}
