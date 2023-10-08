export interface User {
  username: string;
  contactNumber: string;
  email: string;
  password: string;
  status: string;
  expanded: boolean;
  userType: string; // Add userType property
  merchantName?: string; // Make merchant-specific fields optional
  companyDescription?: string; // Make merchant-specific fields optional
  pdfFile?: string; // Make merchant-specific fields optional
  merchantID?: string;
}
