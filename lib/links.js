// Canonical contact links + prefilled WhatsApp messages.
// Every CTA on the site goes through waLink() so the visitor never has to
// compose the first message themselves.

export const WHATSAPP_NUMBER = "972546436659";
export const EMAIL = "Gabiaharon@gmail.com";
export const INSTAGRAM_URL = "https://instagram.com/gabi.aharon";
export const LINKEDIN_URL = "https://linkedin.com/in/gabi-aharon";

const MESSAGES = {
  generic: {
    he: "היי גבי! הגעתי מהאתר ואשמח לשמוע על הרצאה או סדנה 🙂",
    en: "Hi Gabi! I found your site and would love to hear about a lecture or workshop 🙂",
  },
  book: {
    he: "היי גבי, אני רוצה לסגור תאריך להרצאה 🎤",
    en: "Hi Gabi, I'd like to book a date for a lecture 🎤",
  },
  flyerBody: {
    he: "היי גבי, אשמח לקבל את הפלייר של ההרצאה על שפת גוף ותקשורת לא מילולית 🙏",
    en: "Hi Gabi, I'd love to get the flyer for the body language lecture 🙏",
  },
  flyerSpeaking: {
    he: "היי גבי, אשמח לקבל את הפלייר של ההרצאה על עמידה מול קהל ונוכחות 🙏",
    en: "Hi Gabi, I'd love to get the flyer for the public speaking lecture 🙏",
  },
};

export const waLink = (key = "generic", lang = "he") => {
  const message = (MESSAGES[key] || MESSAGES.generic)[lang] || MESSAGES.generic.he;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (key = "generic", lang = "he") => {
  window.open(waLink(key, lang), "_blank", "noopener");
};

export const openEmail = () => {
  window.open(`mailto:${EMAIL}`, "_blank");
};
