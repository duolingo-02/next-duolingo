export const up = async (prisma) => {
    const languages = [
      {
        name: "English",
        description: "English language",
        languagePicture: "https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-500.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Français",
        description: "French language",
        languagePicture: "https://cdn.countryflags.com/thumbs/france/flag-square-500.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Spanish",
        description: "Spanish language",
        languagePicture: "https://cdn.countryflags.com/thumbs/spain/flag-square-500.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  
    await prisma.language.createMany({ data: languages });
  };
  
  export const down = async (prisma) => {
    await prisma.language.deleteMany({});
  };
  