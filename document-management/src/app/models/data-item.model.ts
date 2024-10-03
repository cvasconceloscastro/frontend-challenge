// src/app/models/data-item.model.ts
export interface DataItem {
    id: string;
    name: string;
    description: string;
    label: string;
    status: string;
    statusDetails: string;
    date: Date;
    favorited: boolean;
    selected: boolean;
    expanded: boolean;
  }
  