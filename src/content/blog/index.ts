import type { LanguageCode } from "@/i18n/languages";
import type { BlogPost, ResolvedPost } from "./types";

// Registry. Keep this list alphabetical by slug; order on the site is derived
// from datePublished, not from this array.
import p5FactorsWhenPlanningYourMenu from "./posts/5-factors-when-planning-your-menu";
import allergenFiltersOnYourDigitalMenu from "./posts/allergen-filters-on-your-digital-menu";
import areQrCodeMenusWorthItForSmallRestaurants from "./posts/are-qr-code-menus-worth-it-for-small-restaurants";
import bestDigitalMenuSystemsBuyersGuide from "./posts/best-digital-menu-systems-buyers-guide";
import changeYourDigitalMenuInRealTime from "./posts/change-your-digital-menu-in-real-time";
import designADigitalMenuThatIncreasesSales from "./posts/design-a-digital-menu-that-increases-sales";
import digitalMenuAnalyticsMetricsToTrack from "./posts/digital-menu-analytics-metrics-to-track";
import digitalMenuBoardsVsQrCodeMenus from "./posts/digital-menu-boards-vs-qr-code-menus";
import digitalMenuDesignTips from "./posts/digital-menu-design-tips";
import digitalMenuHiddenCosts from "./posts/digital-menu-hidden-costs";
import digitalMenuPosIntegration from "./posts/digital-menu-pos-integration";
import digitalMenusAndPaperWaste from "./posts/digital-menus-and-paper-waste";
import digitalMenusVsPrintedMenus from "./posts/digital-menus-vs-printed-menus";
import doCustomersLikeDigitalMenus from "./posts/do-customers-like-digital-menus";
import freeVsPaidDigitalMenuCreators from "./posts/free-vs-paid-digital-menu-creators";
import gatherCustomerFeedbackOnYourDigitalMenu from "./posts/gather-customer-feedback-on-your-digital-menu";
import howManyQrCodesDoesYourRestaurantNeed from "./posts/how-many-qr-codes-does-your-restaurant-need";
import howMenuDesignAffectsOrderingDecisions from "./posts/how-menu-design-affects-ordering-decisions";
import howOftenCustomersScanQrMenus from "./posts/how-often-customers-scan-qr-menus";
import howOftenToUpdateYourDigitalMenu from "./posts/how-often-to-update-your-digital-menu";
import howToCreateADigitalMenu from "./posts/how-to-create-a-digital-menu";
import howToDecideWhatItemsToPutOnYourMenu from "./posts/how-to-decide-what-items-to-put-on-your-menu";
import howToMarketYourNewDigitalMenu from "./posts/how-to-market-your-new-digital-menu";
import howToPriceMenuItems30303010 from "./posts/how-to-price-menu-items-30-30-30-10";
import howToTrainStaffOnYourDigitalMenu from "./posts/how-to-train-staff-on-your-digital-menu";
import hybridDigitalAndPrintedMenuStrategy from "./posts/hybrid-digital-and-printed-menu-strategy";
import keepYourDigitalMenuSecure from "./posts/keep-your-digital-menu-secure";
import menuDesignPsychologyColorsLayout from "./posts/menu-design-psychology-colors-layout";
import menusCustomerSatisfactionRepeatBusiness from "./posts/menus-customer-satisfaction-repeat-business";
import mobileFriendlyDigitalMenus from "./posts/mobile-friendly-digital-menus";
import multiLanguageSupportOnYourDigitalMenu from "./posts/multi-language-support-on-your-digital-menu";
import photosOnDigitalMenus from "./posts/photos-on-digital-menus";
import restaurantMenuPlanning101 from "./posts/restaurant-menu-planning-101";
import seasonalDigitalMenu from "./posts/seasonal-digital-menu";
import shouldYourRestaurantSwitchToDigitalMenus from "./posts/should-your-restaurant-switch-to-digital-menus";
import startYourDigitalMenuNoTechnicalSkills from "./posts/start-your-digital-menu-no-technical-skills";
import the30303010RuleExplained from "./posts/the-30-30-30-10-rule-explained";
import whatFeaturesMatterMostDigitalMenu from "./posts/what-features-matter-most-digital-menu";
import whatIsAQrDigitalMenu from "./posts/what-is-a-qr-digital-menu";
import whatToIncludeOnYourDigitalMenu from "./posts/what-to-include-on-your-digital-menu";
import whySomeRestaurantsAbandonedDigitalMenus from "./posts/why-some-restaurants-abandoned-digital-menus";

const POSTS: BlogPost[] = [
  p5FactorsWhenPlanningYourMenu,
  allergenFiltersOnYourDigitalMenu,
  areQrCodeMenusWorthItForSmallRestaurants,
  bestDigitalMenuSystemsBuyersGuide,
  changeYourDigitalMenuInRealTime,
  designADigitalMenuThatIncreasesSales,
  digitalMenuAnalyticsMetricsToTrack,
  digitalMenuBoardsVsQrCodeMenus,
  digitalMenuDesignTips,
  digitalMenuHiddenCosts,
  digitalMenuPosIntegration,
  digitalMenusAndPaperWaste,
  digitalMenusVsPrintedMenus,
  doCustomersLikeDigitalMenus,
  freeVsPaidDigitalMenuCreators,
  gatherCustomerFeedbackOnYourDigitalMenu,
  howManyQrCodesDoesYourRestaurantNeed,
  howMenuDesignAffectsOrderingDecisions,
  howOftenCustomersScanQrMenus,
  howOftenToUpdateYourDigitalMenu,
  howToCreateADigitalMenu,
  howToDecideWhatItemsToPutOnYourMenu,
  howToMarketYourNewDigitalMenu,
  howToPriceMenuItems30303010,
  howToTrainStaffOnYourDigitalMenu,
  hybridDigitalAndPrintedMenuStrategy,
  keepYourDigitalMenuSecure,
  menuDesignPsychologyColorsLayout,
  menusCustomerSatisfactionRepeatBusiness,
  mobileFriendlyDigitalMenus,
  multiLanguageSupportOnYourDigitalMenu,
  photosOnDigitalMenus,
  restaurantMenuPlanning101,
  seasonalDigitalMenu,
  shouldYourRestaurantSwitchToDigitalMenus,
  startYourDigitalMenuNoTechnicalSkills,
  the30303010RuleExplained,
  whatFeaturesMatterMostDigitalMenu,
  whatIsAQrDigitalMenu,
  whatToIncludeOnYourDigitalMenu,
  whySomeRestaurantsAbandonedDigitalMenus,
];

const WORDS_PER_MINUTE = 200;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingMinutes(post: BlogPost, lang: LanguageCode): number {
  const c = post.content[lang];
  const words =
    c.intro.reduce((n, p) => n + countWords(p), 0) +
    c.sections.reduce(
      (n, s) =>
        n +
        countWords(s.heading) +
        s.paragraphs.reduce((m, p) => m + countWords(p), 0),
      0,
    ) +
    c.faq.reduce(
      (n, f) => n + countWords(f.question) + countWords(f.answer),
      0,
    );

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function resolve(post: BlogPost, lang: LanguageCode): ResolvedPost {
  return {
    slug: post.slug,
    tags: post.tags,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    readingMinutes: readingMinutes(post, lang),
    ...post.content[lang],
  };
}

export function getAllPosts(lang: LanguageCode): ResolvedPost[] {
  return POSTS.map((p) => resolve(p, lang)).sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
}

export function getPostBySlug(
  slug: string,
  lang: LanguageCode,
): ResolvedPost | undefined {
  const post = POSTS.find((p) => p.slug === slug);
  return post ? resolve(post, lang) : undefined;
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

/** Posts sharing the most tags with the given slug, newest first. */
export function getRelatedPosts(
  slug: string,
  lang: LanguageCode,
  limit = 3,
): ResolvedPost[] {
  const current = POSTS.find((p) => p.slug === slug);
  if (!current) return [];

  return getAllPosts(lang)
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        b.post.datePublished.localeCompare(a.post.datePublished),
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
