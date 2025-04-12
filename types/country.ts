export type Country = {
  id: number;
  name: string;
  code: string;
  name_ar: string;
  name_en: string;
  name_fr: string;
};

export type City = Country & {
  country_id: number;
};
