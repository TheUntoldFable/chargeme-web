import type { BlogPost } from "../types";

const post: BlogPost = {
  slug: "allergen-filters-on-your-digital-menu",
  tags: ["operations"],
  datePublished: "2026-07-02",
  content: {
    en: {
      title: "How to Set Up Allergen Filters on Your Digital Menu",
      description:
        "How to structure allergen information for a digital menu, what an allergen filter needs to work, and what to ask a provider before you rely on one.",
      excerpt:
        "Practical guidance on organizing allergen data for a digital menu, presenting it clearly, and asking providers the right questions.",
      intro: [
        "An allergen filter lets a guest hide or flag dishes that contain certain allergens. It only works if every dish has allergen data recorded in a consistent, structured way, rather than mentioned loosely in a description. Setting one up is mostly a data and process job: decide who owns the information, record it the same way for every item, and keep it current.",
        "Allergen information is a food-safety matter, so this guide is practical guidance, not legal advice. Allergen labelling is regulated in most markets, including the EU, and operators must confirm their own local obligations. A digital menu supplements staff knowledge and kitchen controls and never replaces them.",
      ],
      sections: [
        {
          heading: "What an allergen filter is, and why structure matters",
          paragraphs: [
            "A filter is only as good as the data behind it. If allergens appear only as free text in a dish description, a system cannot reliably filter on them. To work, each dish needs its allergens recorded as separate, consistent tags or fields, the same way for every item on the menu.",
            "This is why the real work happens before any software. A filter that hides everything containing nuts is only accurate if every dish that contains nuts has actually been marked. A missing tag does not mean a dish is safe. It means nobody has recorded the answer yet.",
            "Think of the filter as a convenience layer on top of good records, and treat the records as the important part.",
          ],
        },
        {
          heading: "Build the allergen data before you build the filter",
          paragraphs: [
            "Start with a master list of the allergens you will track, based on what your local rules require and what your guests ask about. Use the same names in every language you publish, so a guest reading the Bulgarian menu and one reading the English menu see the same information.",
            "Then go dish by dish, from the actual recipe and the actual labels on the ingredients you buy, not from memory. Ingredients like sauces, stock, bread coatings and dressings are where allergens hide. Ask suppliers for their ingredient information and keep it on file.",
            "Record two things separately where you can: allergens a dish deliberately contains, and allergens that might be present through shared equipment or cross-contact. Guests with severe allergies care about the difference. Give one named person, usually the head chef, responsibility for approving every entry and for updating it whenever a recipe or supplier changes.",
          ],
        },
        {
          heading: "Present allergen information clearly to guests",
          paragraphs: [
            "Place allergen information next to the dish, where it is seen before ordering, not on a separate page that most guests will never open. Icons help at a glance, but pair them with plain text and include a legend so nobody has to guess what a symbol means.",
            "Be careful with wording. A filter can flag dishes that contain a chosen allergen, but avoid labels like \"allergen-safe\" or \"guaranteed free from\", which promise more than any menu can deliver. Where information is unknown or unconfirmed, say so instead of leaving it blank, because a blank looks like \"none\" to a worried guest.",
            "Add a standing line inviting guests to tell staff about any allergy before ordering. That single sentence keeps the conversation with a human where it belongs.",
          ],
        },
        {
          heading: "Why the menu never replaces staff and kitchen controls",
          paragraphs: [
            "A screen cannot see what happens in the kitchen. Shared fryers, shared boards, a substituted ingredient on a busy night or a supplier changing a product can all make a printed or digital entry wrong. Only trained people following clear procedures can catch these things.",
            "Train your team so every server knows the allergen procedure: how to confirm the details with the kitchen, how the order is flagged, and what to do if there is any doubt. A guest who says they have an allergy should get a human answer, whatever the menu says.",
            "Use the digital menu to make that conversation faster and better informed, and to give guests a reliable first look. Do not use it as the only safeguard.",
          ],
        },
        {
          heading: "Questions to ask a digital menu provider",
          paragraphs: [
            "If allergen filtering matters to you, ask any provider to show it working before you commit. Can allergens be recorded per item as structured fields, or only as free text? Can guests filter by allergen, or only read tags? Can the allergen wording be translated into every language you use? How quickly does a correction appear on guests' phones?",
            "Also ask who can edit allergen information, whether changes are logged, and what happens to your data if you leave. Do not assume a feature exists because a demo hinted at it. Confirm the exact capability in writing.",
            "The parts of a platform that help here are the general ones: easy menu updates, so a corrected entry can be live in minutes, and multi-language support, so the same corrected information reaches every guest. For any specific allergen capability, confirm the details directly with the provider, including us at chargem3info@gmail.com.",
          ],
        },
      ],
      faq: [
        {
          question: "What is an allergen filter on a digital menu?",
          answer:
            "An allergen filter lets guests hide or flag dishes that contain allergens they choose. It depends on each dish having allergen data recorded in a structured, consistent way. It is a convenience feature, and it never replaces talking to staff.",
        },
        {
          question: "Can a digital menu guarantee that a dish is allergen-free?",
          answer:
            "No. A digital menu can only show the information that was entered, and it cannot see cross-contact or last-minute substitutions in the kitchen. Guests with allergies should always confirm with staff, and kitchens need their own controls.",
        },
        {
          question: "Are restaurants required to show allergen information?",
          answer:
            "Allergen labelling is regulated in most markets, including the EU, but the specific rules differ between countries. Restaurant operators should confirm their local obligations with the relevant food safety authority or a qualified adviser rather than relying on general guidance.",
        },
        {
          question: "What should I ask a provider about allergen features?",
          answer:
            "Ask whether allergens are stored as structured fields per item, whether guests can filter or only read them, whether the information can be translated into every menu language, and how quickly a correction goes live. Also ask who can edit the data and whether changes are recorded, and get the answers in writing.",
        },
        {
          question: "How often should allergen information be reviewed?",
          answer:
            "Review it whenever a recipe, ingredient, brand or supplier changes, and check it on a regular schedule even when nothing seems to have changed. One named person, such as the head chef, should approve every update.",
        },
      ],
    },
    bg: {
      title: "Как да настроите филтри за алергени в дигиталното си меню",
      description:
        "Как да структурирате информацията за алергени в дигиталното меню, какво изисква филтърът за алергени и какво да питате доставчика, преди да разчитате на него.",
      excerpt:
        "Практични насоки за организиране на данните за алергени в дигиталното меню, ясното им представяне и правилните въпроси към доставчика.",
      intro: [
        "Филтърът за алергени позволява на госта да скрие или да маркира ястия, съдържащи определени алергени. Той работи само ако за всяко ястие има записани данни за алергени по последователен и структуриран начин, а не споменати между другото в описанието. Настройката му е предимно работа с данни и процеси: решете кой отговаря за информацията, записвайте я по един и същ начин за всеки артикул и я поддържайте актуална.",
        "Информацията за алергените е въпрос на хранителна безопасност, затова това ръководство дава практични насоки, а не юридически съвет. Етикетирането на алергените е регламентирано в повечето пазари, включително в ЕС, и операторите трябва да уточнят собствените си местни задължения. Дигиталното меню допълва знанията на персонала и контрола в кухнята и никога не ги замества.",
      ],
      sections: [
        {
          heading: "Какво е филтър за алергени и защо структурата е важна",
          paragraphs: [
            "Филтърът е толкова добър, колкото са данните зад него. Ако алергените се появяват само като свободен текст в описанието на ястието, системата не може надеждно да филтрира по тях. За да работи, за всяко ястие алергените трябва да са записани като отделни, последователни етикети или полета, по един и същ начин за всеки артикул в менюто.",
            "Затова истинската работа се случва преди всеки софтуер. Филтър, който скрива всичко с ядки, е точен само ако всяко ястие с ядки наистина е отбелязано. Липсващият етикет не означава, че ястието е безопасно. Означава, че никой още не е записал отговора.",
            "Гледайте на филтъра като на удобство върху добри записи, а записите смятайте за най-важната част.",
          ],
        },
        {
          heading: "Изградете данните за алергените, преди да изградите филтъра",
          paragraphs: [
            "Започнете с основен списък на алергените, които ще следите, съобразен с местните изисквания и с въпросите на гостите ви. Ползвайте едни и същи названия на всички езици, на които публикувате, така че гост, четящ българското меню, и гост, четящ английското, да виждат една и съща информация.",
            "После минете ястие по ястие, по реалната рецепта и по реалните етикети на продуктите, които купувате, а не по памет. Соровете, бульоните, панировките и дресингите са местата, където се крият алергени. Поискайте от доставчиците информация за съставките и я пазете.",
            "Където можете, записвайте отделно две неща: алергените, които ястието съдържа умишлено, и тези, които може да присъстват заради общо оборудване или кръстосано замърсяване. Гостите с тежки алергии държат на разликата. Определете един отговорен човек, обикновено главния готвач, който одобрява всеки запис и го обновява при промяна на рецепта или доставчик.",
          ],
        },
        {
          heading: "Представете информацията за алергените ясно на гостите",
          paragraphs: [
            "Поставяйте информацията за алергените до ястието, където се вижда преди поръчката, а не на отделна страница, която повечето гости никога няма да отворят. Иконите помагат на пръв поглед, но ги съчетавайте с ясен текст и добавете легенда, за да не се налага никой да гадае какво означава символът.",
            "Внимавайте с формулировките. Филтърът може да маркира ястия със зададен алерген, но избягвайте надписи като „безопасно за алергици“ или „гарантирано без“, които обещават повече, отколкото което и да е меню може да изпълни. Когато информацията е неизвестна или непотвърдена, кажете го, вместо да оставяте полето празно, защото за разтревожения гост празното изглежда като „няма“.",
            "Добавете постоянен ред, който кани гостите да кажат на персонала за всяка алергия преди поръчката. Това единствено изречение оставя разговора с човек там, където му е мястото.",
          ],
        },
        {
          heading: "Защо менюто никога не замества персонала и контрола в кухнята",
          paragraphs: [
            "Екранът не вижда какво става в кухнята. Общ фритюрник, обща дъска, заменена съставка в натоварена вечер или доставчик, сменил продукта, могат да направят грешен и печатен, и дигитален запис. Само обучени хора, следващи ясни процедури, могат да уловят такива неща.",
            "Обучете екипа си така, че всеки сервитьор да знае процедурата за алергени: как да потвърди подробностите с кухнята, как се маркира поръчката и какво да прави при всяко съмнение. Гост, който казва, че има алергия, трябва да получи отговор от човек, каквото и да пише менюто.",
            "Ползвайте дигиталното меню, за да направите този разговор по-бърз и по-добре информиран и за да дадете на гостите надеждна първа справка. Не го ползвайте като единствена защита.",
          ],
        },
        {
          heading: "Въпроси към доставчика на дигитално меню",
          paragraphs: [
            "Ако филтрирането по алергени е важно за вас, поискайте от всеки доставчик да ви го покаже в действие, преди да поемете ангажимент. Може ли алергените да се записват за всеки артикул като структурирани полета, или само като свободен текст? Могат ли гостите да филтрират по алерген, или само да четат етикетите? Може ли текстът за алергените да се превежда на всички ваши езици? Колко бързо се появява корекция в телефоните на гостите?",
            "Питайте още кой може да редактира информацията за алергените, записват ли се промените и какво става с данните ви, ако си тръгнете. Не приемайте, че функция съществува, само защото демото намеква за нея. Потвърдете точната възможност писмено.",
            "Частите от една платформа, които помагат тук, са общите: лесни промени в менюто, така че коригиран запис да е на живо за минути, и поддръжка на много езици, така че една и съща коригирана информация да стига до всеки гост. За всяка конкретна възможност за алергени уточнете подробностите директно с доставчика, включително с нас на chargem3info@gmail.com.",
          ],
        },
      ],
      faq: [
        {
          question: "Какво е филтър за алергени в дигиталното меню?",
          answer:
            "Филтърът за алергени позволява на гостите да скрият или да маркират ястия, съдържащи избрани от тях алергени. Той зависи от това за всяко ястие да има записани данни за алергени по структуриран и последователен начин. Това е удобство и никога не замества разговора с персонала.",
        },
        {
          question: "Може ли дигиталното меню да гарантира, че ястие е без алергени?",
          answer:
            "Не. Дигиталното меню може да показва само въведената информация и не вижда кръстосано замърсяване или замени в последния момент в кухнята. Гостите с алергии винаги трябва да потвърждават с персонала, а кухните имат нужда от собствен контрол.",
        },
        {
          question: "Задължени ли са ресторантите да показват информация за алергените?",
          answer:
            "Етикетирането на алергените е регламентирано в повечето пазари, включително в ЕС, но конкретните правила се различават по държави. Операторите на ресторанти трябва да уточнят местните си задължения в съответната институция по хранителна безопасност или при квалифициран консултант, а не да се позовават на общи насоки.",
        },
        {
          question: "Какво да питам доставчика за функциите за алергени?",
          answer:
            "Питайте дали алергените се съхраняват като структурирани полета за всеки артикул, дали гостите могат да филтрират или само да четат, дали информацията може да се превежда на всички езици на менюто и колко бързо влиза в сила една корекция. Питайте още кой може да редактира данните и дали промените се записват, и вземете отговорите писмено.",
        },
        {
          question: "Колко често да се преглежда информацията за алергените?",
          answer:
            "Преглеждайте я при всяка промяна на рецепта, съставка, марка или доставчик и я проверявайте по график, дори когато нищо не изглежда променено. Един определен човек, например главният готвач, трябва да одобрява всяка промяна.",
        },
      ],
    },
  },
};

export default post;
