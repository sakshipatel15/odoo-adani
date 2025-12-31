import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { TechnicianFormComponent } from '../technician-form/technician-form.component';

interface Technician {
  id: string;
  name: string;
  role: string; // e.g. HYDRAULICS A
  roleIcon: string;
  avatar: string;
  status: 'On Job' | 'Resting' | 'Available' | 'Offline' | 'Critical Task';
  statusColor: string; // hex
  efficiency: number;
  efficiencyTrend?: 'up' | 'flat' | 'down';
  accentColor: string; // Left border color
}

@Component({
  selector: 'app-technician-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TechnicianFormComponent],
  templateUrl: './technician-list.component.html',
  styleUrl: './technician-list.component.scss'
})
export class TechnicianListComponent implements OnInit {
  Math = Math;
  @Input() selectedTech: Technician | null = null;
  showModal = false;

  searchQuery: string = '';
  isLoading = true;
  technicians: Technician[] = [];
  filteredTechnicians: Technician[] = [];
  activeFilter: string = 'All Teams';
  currentUser: any = null; // { name, role, avatar }

  // Pagination
  currentPage = 1;
  itemsPerPage = 6;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadCurrentUser();
    this.loadTechnicians();
  }

  loadCurrentUser() {
    // Get from AuthService session
    const session = this.authService.currentUser();
    if (session) {
      this.currentUser = session;
    } else {
      // Fallback or fetch
      this.currentUser = { name: 'Commander', role: 'Operator', avatar: '' };
    }
  }

  loadTechnicians() {
    this.isLoading = true;
    this.userService.getTechniciansWithStats().subscribe({
      next: (data) => {
        this.technicians = data.map(profile => this.mapProfileToTechnician(profile));
        this.applyFilter(); // Initial filter
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load technicians', err);
        this.isLoading = false;
      }
    });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.currentPage = 1; // Reset to page 1
    this.applyFilter();
  }

  applyFilter() {
    let temp = this.technicians;

    // 1. Category Filter
    if (this.activeFilter !== 'All Teams') {
      temp = temp.filter(t => t.role.toLowerCase().includes(this.activeFilter.toLowerCase().split(' ')[0])); // "Hydraulics" matches "HYDRAULICS A"
    }

    // 2. Search Filter
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      temp = temp.filter(t => t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q));
    }

    this.filteredTechnicians = temp;
  }

  // Pagination Getters
  get paginatedList(): Technician[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTechnicians.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTechnicians.length / this.itemsPerPage) || 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  openNewTechModal() {
    this.selectedTech = null;
    this.showModal = true;
  }

  openEditModal(tech: Technician) {
    this.selectedTech = tech;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedTech = null;
  }

  onSave() {
    this.closeModal();
    this.loadTechnicians(); // Refresh list
  }

  private mapProfileToTechnician(profile: any): Technician {
    // Helper to generate consistent UI data from profile
    const role = profile.role || 'Technician';
    return {
      id: profile.id,
      name: profile.full_name || 'Unknown Tech',
      role: role.toUpperCase(),
      roleIcon: this.getRoleIcon(role),
      avatar: profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name}&background=random`,
      status: profile.calculatedStatus || 'Available',
      statusColor: this.getStatusColor(profile.calculatedStatus || 'Available'),
      efficiency: profile.calculatedEfficiency || 100, // Real calc
      efficiencyTrend: 'flat', // Hard to calc trend without history snapshots
      accentColor: this.getAccentColor(role)
    };
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'On Job': return '#fef9c3'; // Yellow
      case 'Available': return '#dcfce7'; // Green
      default: return '#f3f4f6';
    }
  }

  private getRoleIcon(role: string): string {
    const r = role.toLowerCase();
    if (r.includes('hydraulics')) return 'water_drop';
    if (r.includes('electrical')) return 'bolt';
    if (r.includes('mech')) return 'build';
    if (r.includes('logistics')) return 'inventory_2';
    return 'engineering';
  }

  private getAccentColor(role: string): string {
    const r = role.toLowerCase();
    if (r.includes('hydraulics')) return '#ea580c';
    if (r.includes('electrical')) return '#eab308';
    if (r.includes('mech')) return '#0ea5e9';
    return '#6b7280';
  }

  getStatusTextColor(bgHex: string): string {
    switch (bgHex) {
      case '#dcfce7': return '#15803d'; // Green text
      case '#fef9c3': return '#a16207'; // Yellow text (darker)
      case '#fee2e2': return '#b91c1c'; // Red text
      case '#f3f4f6': return '#4b5563'; // Gray text
      default: return '#374151';
    }
  }

  getDotColor(bgHex: string): string {
    switch (bgHex) {
      case '#dcfce7': return '#15803d';
      case '#fef9c3': return '#ca8a04';
      case '#fee2e2': return '#dc2626';
      default: return '#9ca3af';
    }
  }
}
