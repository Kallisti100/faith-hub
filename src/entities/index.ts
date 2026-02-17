/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: biblestudies
 * Interface for BibleStudies
 */
export interface BibleStudies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  studyTopic?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  meetingSchedule?: string;
  /** @wixFieldType date */
  startDate?: Date | string;
  /** @wixFieldType date */
  endDate?: Date | string;
  /** @wixFieldType text */
  leaderName?: string;
  /** @wixFieldType url */
  signUpUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  studyImage?: string;
}


/**
 * Collection ID: devotionalsubscriptions
 * Interface for DevotionalSubscriptions
 */
export interface DevotionalSubscriptions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  devotionalTheme?: string;
  /** @wixFieldType text */
  deliveryFrequency?: string;
  /** @wixFieldType text */
  subscriptionMethod?: string;
  /** @wixFieldType text */
  subscriberName?: string;
  /** @wixFieldType text */
  subscriberEmail?: string;
  /** @wixFieldType text */
  subscriberPhone?: string;
  /** @wixFieldType datetime */
  subscriptionDate?: Date | string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: donationfunds
 * @catalog This collection is an eCommerce catalog
 * Interface for DonationFunds
 */
export interface DonationFunds {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType number */
  fundGoal?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: events
 * Interface for Events
 */
export interface Events {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType time */
  eventTime?: any;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType url */
  registrationLink?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage?: string;
  /** @wixFieldType boolean */
  isRegistrationRequired?: boolean;
}


/**
 * Collection ID: partners
 * Interface for Partners
 */
export interface Partners {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  organizationName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  logo?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  partnershipFocus?: string;
}
