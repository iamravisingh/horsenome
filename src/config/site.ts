export const siteConfig = {
  name: "Horsenome",
  shortName: "Horsenome",
  productionUrl: "https://www.horsenome.com",
  apexUrl: "https://horsenome.com",
  title: "Horsenome | Free metronome for tempo, taal, and rhythmic practice",
  description:
    "Horsenome is a free metronome for tempo, taal, time signature, and rhythmic subdivision practice, built for musicians who want a calmer visual pulse.",
  ogImagePath: "/assets/metronome.png",
  themeColor: "#f8faf8",
  twitterCard: "summary_large_image",
  feedback: {
    issuesUrl: "https://github.com/iamravisingh/horsenome/issues",
    email: "ravisingh29091996@gmail.com",
  },
} as const;

export const siteMetadata = {
  canonicalUrl: `${siteConfig.productionUrl}/`,
  ogImageUrl: `${siteConfig.productionUrl}${siteConfig.ogImagePath}`,
  feedbackMailto: `mailto:${siteConfig.feedback.email}`,
} as const;
