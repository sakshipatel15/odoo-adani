import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KanbanCard {
  id: string;
  title: string;
  priority: 'HIGH' | 'MED' | 'LOW';
  assignee?: { name: string; avatar: string };
  dueDate: string;
  dueDateStatus: 'normal' | 'overdue' | 'done'; // For styling date badge
  type?: 'active'; // To mark the specific highlighted card
}

interface KanbanColumn {
  title: string;
  count: number;
  color: string; // hex for the dot
  cards: KanbanCard[];
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {

  columns: KanbanColumn[] = [
    {
      title: 'NEW',
      count: 3,
      color: '#3b82f6', // Blue
      cards: [
        {
          id: 'WO-1024',
          title: 'Conveyor Belt Motor Failure',
          priority: 'HIGH',
          assignee: { name: 'Unassigned', avatar: 'https://i.pravatar.cc/150?u=unassigned' },
          dueDate: 'Today',
          dueDateStatus: 'normal'
        },
        {
          id: 'WO-1029',
          title: 'Breakroom Light Replacement',
          priority: 'LOW',
          // No assignee
          dueDate: '2d',
          dueDateStatus: 'normal'
        }
      ]
    },
    {
      title: 'IN PROGRESS',
      count: 2,
      color: '#f59e0b', // Orange
      cards: [
        {
          id: 'WO-1025',
          title: 'HVAC Unit 3 Filter Check',
          priority: 'MED',
          assignee: { name: 'John D.', avatar: 'https://i.pravatar.cc/150?u=john' },
          dueDate: 'Overdue',
          dueDateStatus: 'overdue',
          type: 'active' // Highlights this card
        },
        {
          id: 'WO-1011',
          title: 'Hydraulic Pump Leak',
          priority: 'HIGH',
          assignee: { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
          dueDate: '4h left',
          dueDateStatus: 'normal' // Yellow-ish in image, but logic can handle styling
        }
      ]
    },
    {
      title: 'REPAIRED',
      count: 2,
      color: '#22c55e', // Green
      cards: [
        {
          id: 'WO-0998',
          title: 'CNC Machine Calibration',
          priority: 'HIGH', // Derived from image context, implicit
          assignee: { name: 'Mike K.', avatar: 'https://i.pravatar.cc/150?u=mike' },
          dueDate: 'Yesterday',
          dueDateStatus: 'done' // "DONE" badge
        },
        {
          id: 'WO-0995',
          title: 'Office Chair Repair',
          priority: 'LOW',
          assignee: { name: 'Mike K.', avatar: 'https://i.pravatar.cc/150?u=mike' }, // Same avatar in image
          dueDate: '2d ago',
          dueDateStatus: 'normal'
        }
      ]
    }
  ];

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGH': return 'bg-warning-subtle text-warning border-warning-subtle';
      case 'MED': return 'bg-secondary-subtle text-secondary border-secondary-subtle'; // Specific styling in CSS
      case 'LOW': return 'bg-light text-secondary border-light-subtle';
      default: return 'bg-light';
    }
  }

}
