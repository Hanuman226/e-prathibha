import icon4 from "./Icons/4.png";
import icon5 from "./Icons/5.png";
import icon6 from "./Icons/6.png";
const data = {
  cards: {
    bookmarkCard: {
      title: "review bookmark",
      desc: "Access bookmarked questions to review them or create a exam on those.",
      cta: "/all_bookmarks",
      icon: icon4,
    },
    incorrectQuestionCard: {
      title: "view incorrect questions",
      desc: "Analyze your mistakes in exams and create a exam on them to assess.",
      cta: "/incorrect_questions",
      icon: icon5,
    },
    summaryCard: {
      title: "performance summary",
      desc: "Access your performance by progress summary and time management graphs.",
      cta: "/",
      icon: icon6,
    },
  },
};

export default data;
