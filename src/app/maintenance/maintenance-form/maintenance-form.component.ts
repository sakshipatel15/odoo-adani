import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaintenanceService } from '../../core/services/maintenance.service';
import { UserService } from '../../core/services/user.service';
import { ReferenceDataService } from '../../core/services/reference-data.service';
import { EquipmentService } from '../../core/services/equipment.service'; // Needed for equipment lookup

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenanceFormComponent implements OnInit {

  maintenanceForm: FormGroup;
  isLoading = false;
  isSubmitting = false;

  priorities: string[] = [];
  categories: any[] = []; // {id, name}
  technicians: any[] = [];
  status = 'DRAFT';

  // Stepper state (visual only for now, derived from status in real app)
  steps = [
    { label: 'DRAFT', icon: 'edit', active: true, completed: false },
    { label: 'APPROVAL', icon: 'verified_user', active: false, completed: false },
    { label: 'SCHEDULED', icon: 'event', active: false, completed: false },
    { label: 'COMPLETE', icon: 'check_circle', active: false, completed: false }
  ];

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private userService: UserService,
    private referenceDataService: ReferenceDataService,
    private equipmentService: EquipmentService, // If we implement search
    private router: Router
  ) {
    this.maintenanceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      equipment_id: [''], // TODO: Implement Equipment Search
      category_id: ['', Validators.required], // or category_name if string
      technician_id: [''],
      priority: ['', Validators.required],
      scheduled_date: [''],
      estimated_duration: [''],
    });
  }

  ngOnInit() {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.isLoading = true;

    // 1. Technicians
    this.userService.getTechnicians().subscribe(data => {
      this.technicians = data;
    });

    // 2. Categories
    this.referenceDataService.getCategories().subscribe(data => {
      this.categories = data;
    });

    // 3. Priorities (Dynamic)
    this.referenceDataService.getPriorities().subscribe(data => {
      this.priorities = data.length ? data : ['Low', 'Medium', 'High', 'Critical'];
    });

    this.isLoading = false;
  }

  onSubmit() {
    if (this.maintenanceForm.invalid) {
      this.maintenanceForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formData = this.maintenanceForm.value;

    // Transform data if needed for DB schema
    const payload = {
      title: formData.title,
      description: formData.description,
      equipment_id: formData.equipment_id || null, // Handle search selection
      category: formData.category_id, // Assuming schema stores name or ID? Let's check schema.
      // Schema image isn't viewable but standard is ID if FK, or text.
      // Code in maintenance.service.ts select includes 'equipment:equipment_id'.
      // So equipment_id is FK.
      technician_id: formData.technician_id || null,
      priority: formData.priority,
      scheduled_date: formData.scheduled_date ? new Date(formData.scheduled_date).toISOString() : null,
      // duration might need parsing "2h 30m" -> minutes or interval
      estimated_duration: formData.estimated_duration,
      status: 'Pending', // Initial status
      created_at: new Date().toISOString()
    };

    this.maintenanceService.addRequest(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        // Navigate back or to list
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error creating request', err);
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}

