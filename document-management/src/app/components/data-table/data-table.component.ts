import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MockServiceService } from '../../services/mock-service.service';

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
  expanded: boolean;
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
  items: DataItem[] = [];
  filteredItems: DataItem[] = [];
  filteredFiles: FileNode[] = [];
  files: FileNode[] = [
    {
      label: 'Expedientes Material',
      children: [
        { label: 'Subfolder 1' },
        { label: 'Subfolder 2' },
      ]
    }
  ];

  constructor(private translate: TranslateService, private mockDataService: MockServiceService) {}

  ngOnInit(): void {
    this.mockDataService.getItems().subscribe(data => {
      this.items = data;
      this.filteredItems = [...this.items]; // Initialize filtered items
    });
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

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();

    // Filter table items
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.status.toLowerCase().includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm)
    );

    // Filter tree nodes
    this.filteredFiles = this.filterTreeNodes(this.files, searchTerm);
  }
  
  // Method to count the total number of documents (filtered items)
  getTotalRows(): number {
      return this.filteredItems.length; // Use filteredItems to count the rows
  }
  toggleFavorite(item: DataItem): void {
    item.favorited = !item.favorited;
  }

  expandAll(): void {
    this.filteredItems.forEach(item => item.expanded = true);
  }
  
  collapseAll(): void {
    this.filteredItems.forEach(item => item.expanded = false);
  }

  getSelectedCount(): number {
    return this.filteredItems.filter(item => item.selected).length;
  }

  onRowSelect(item: DataItem): void {
    item.selected = !item.selected;
  }

  deleteSelected(): void {
    this.filteredItems = this.filteredItems.filter(item => !item.selected);
  }

  goBack(): void {
    window.history.back();
  }


// Recursive function to filter tree nodes
filterTreeNodes(nodes: FileNode[], searchTerm: string): FileNode[] {
  return nodes.reduce((acc: FileNode[], node: FileNode) => {
    // If node label matches, or if any child node matches
    if (node.label.toLowerCase().includes(searchTerm) || 
        (node.children && this.filterTreeNodes(node.children, searchTerm).length > 0)) {

      // Clone the node and filter its children (if any)
      const filteredNode = { ...node, children: node.children ? this.filterTreeNodes(node.children, searchTerm) : [] };
      acc.push(filteredNode);
    }
    return acc;
  }, []);
}
}
