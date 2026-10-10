// Placeholder member data shared by the home and profile pages.
const members = [1, 2, 3, 4, 5].map(function (n) {
  return {
    id: n,
    name: "Member Name " + n,
    photo: "images/placeholder.svg",
    role: "Role / Title",
    intro: "Short self-introduction placeholder. Replace with a few sentences about this member.",
    hobbies: ["Hobby 1", "Hobby 2", "Hobby 3"],
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    other: {
      Email: "member" + n + "@example.com",
      Location: "City, Country",
      "Favorite Quote": "Placeholder quote.",
    },
  };
});
