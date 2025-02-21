export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
  isActive?: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  goalUnit?: string[];
}
