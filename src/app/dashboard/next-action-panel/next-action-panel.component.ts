import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActionItem {
  id: number;
  priority: 'Critical' | 'Attention' | 'Maintenance' | 'System';
  title: string;
  description: string;
  time?: string;
  dueRaw?: string;
  ctaText: string;
  ctaIcon?: string;
  borderColor: string; // 'border-danger', 'border-warning', 'border-warning-subtle', 'border-secondary'
  badgeClass: string;
}

@Component({
  selector: 'app-next-action-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './next-action-panel.component.html',
  styleUrls: ['./next-action-panel.component.scss']
})
export class NextActionPanelComponent implements OnInit {

  actionItems: ActionItem[] = [
    {
      id: 1,
      priority: 'Critical',
      title: 'Inspect Hydraulic Pump Seal B',
      description: 'Pressure variance detected exceeding safety threshold.',
      time: '3 mins ago',
      ctaText: 'Investigate',
      ctaIcon: 'arrow_forward',
      borderColor: '#d97706', // Darker orange
      badgeClass: 'text-warning-emphasis bg-warning-subtle border border-warning-subtle'
    },
    {
      id: 2,
      priority: 'Attention',
      title: 'Approve Shift Handover Log',
      description: 'Morning crew requires supervisor sign-off for Ticket #402.',
      time: '45 mins ago',
      ctaText: 'Review Log',
      ctaIcon: 'visibility',
      borderColor: '#eab308', // Standard yellow/gold
      badgeClass: 'text-warning-emphasis bg-warning-subtle border border-warning-subtle'
    },
    {
      id: 3,
      priority: 'Maintenance',
      title: 'Calibrate Sensor Array X-1',
      description: 'Routine calibration cycle overdue by 2 hours.',
      dueRaw: 'Due Today',
      ctaText: 'Start Process',
      ctaIcon: 'play_circle',
      borderColor: '#ca8a04', // Dark yellow/brown
      badgeClass: 'text-warning-emphasis bg-warning-subtle border border-warning-subtle'
    },
    {
      id: 4,
      priority: 'System',
      title: 'Update Firmware: Gateway 12',
      description: 'Patch v2.4.1 available for installation.',
      dueRaw: 'Low Priority',
      ctaText: 'Update',
      ctaIcon: 'download',
      borderColor: '#e5e7eb', // Light gray
      badgeClass: 'text-dark bg-light border border-secondary-subtle'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
