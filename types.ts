import { LucideIcon } from 'lucide-react';

export interface SubService {
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  subServices: SubService[];
  benefits: string[];
}

export interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}