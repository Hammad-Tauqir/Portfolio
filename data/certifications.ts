export type Certification = {
  issuer: string;
  title: string;
  date: string;
  url: string;
  image: string;
};
// TODO: Add certificate details: verified title, date, credential URL and local image path.
export const certifications: Certification[] = [
  { issuer: "IBM", title: "", date: "", url: "", image: "" },
  { issuer: "Ahrefs", title: "", date: "", url: "", image: "" },
];
