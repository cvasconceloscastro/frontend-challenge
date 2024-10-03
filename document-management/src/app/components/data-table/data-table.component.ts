import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface DataItem {
  id: string;
  name: string;
  description: string;
  label: string;
  status: string;
  statusDetails: string;
  date: Date;
  favorited: boolean;
  selected: boolean;
  expanded: boolean;  // New property to track expanded/collapsed state
}

interface FileNode {
  label: string;
  data?: any;
  children?: FileNode[];
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  items: DataItem[] = [
    {
      id: '12345678',
      name: 'Document 1',
      description: 'Detailed description for document 1',
      label: 'Label 1',
      status: 'Processed',
      statusDetails: 'Status line below the status',
      date: new Date(),
      favorited: false,
      selected: false,
      expanded: false  // Initialize as collapsed
    },
    {
      id: '23456789',
      name: 'Document 2',
      description: 'Detailed description for document 2',
      label: 'Label 2',
      status: 'Pending',
      statusDetails: 'Status line below the status',
      date: new Date(),
      favorited: true,
      selected: false,
      expanded: false  // Initialize as collapsed
    }
  ];

  files: FileNode[] = [
    {
      label: 'Expedientes Material',
      children: [
        { label: 'Subfolder 1' },
        { label: 'Subfolder 2' },
      ]
    }
  ];

  constructor(private translate: TranslateService) {}

  getTotalRows(): number {
    return this.items.length;
  }

  getTableHeaders() {
    return {
      id: this.translate.instant('TABLE_ID'),
      name: this.translate.instant('TABLE_NAME'),
      description: this.translate.instant('TABLE_DESCRIPTION'),
      label: this.translate.instant('TABLE_LABEL'),
      status: this.translate.instant('TABLE_STATUS'),
      date: this.translate.instant('TABLE_DATE')
    };
  }

  toggleFavorite(item: DataItem): void {
    item.favorited = !item.favorited;
  }

  expandAll(): void {
    this.items.forEach(item => item.expanded = true);
  }
  
  collapseAll(): void {
    this.items.forEach(item => item.expanded = false);
  }


  getSelectedCount(): number {
    return this.items.filter(item => item.selected).length;
  }

  onRowSelect(item: DataItem): void {
    // This method updates the selected state based on the checkbox value
    item.selected = !item.selected; // Toggle the selected state
}

  deleteSelected(): void {
    this.items = this.items.filter(item => !item.selected);
  }

}
