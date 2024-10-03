import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DataItem } from '../models/data-item.model';
export class MockData implements InMemoryDbService {
  createDb() {
    const items: DataItem[] = [
      {
        id: '12345678',
        name: 'Document 1',
        description: 'Detailed description for document 1',
        label: 'Label 1',
        status: 'Processed',
        statusDetails: 'Status line below the status',
        date: new Date('2024-10-03'), 
        favorited: false,
        selected: false,
        expanded: false,
      },
      {
        id: '23456789',
        name: 'Document 2',
        description: 'Detailed description for document 2',
        label: 'Label 2',
        status: 'Pending',
        statusDetails: 'Status line below the status',
        date: new Date('2024-10-04'),
        favorited: true,
        selected: false,
        expanded: false,
      },
    ];
    return { items };
  }
}
