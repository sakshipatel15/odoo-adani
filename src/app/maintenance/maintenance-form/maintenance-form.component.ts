import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenanceFormComponent {

  status = 'DRAFT';

  steps = [
    { label: 'DRAFT', icon: 'edit', active: true, completed: false },
    { label: 'APPROVAL', icon: 'verified_user', active: false, completed: false },
    { label: 'SCHEDULED', icon: 'event', active: false, completed: false },
    { label: 'COMPLETE', icon: 'check_circle', active: false, completed: false }
  ];

  priorities = ['Low', 'Medium', 'High', 'Critical'];
  categories = ['Preventive', 'Corrective', 'Predictive', 'Emergency'];
  technicians = ['Unassigned', 'John Doe', 'Jane Smith', 'Mike Johnson'];

}
