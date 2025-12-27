import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
    id: number;
    title: string;
    description: string;
    time: string; // e.g., "Today, 10:45 AM"
    type: 'critical' | 'routine' | 'info' | 'replacement';
    icon: string;
    meta?: string;
    badge?: string; // e.g., "Critical"
}

@Component({
    selector: 'app-equipment-timeline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './equipment-timeline.component.html',
    styleUrls: ['./equipment-timeline.component.scss']
})
export class EquipmentTimelineComponent implements OnInit {

    equipmentName = 'CNC Lathe 01';
    equipmentStatus = 'Active';

    timelineItems: TimelineItem[] = [
        {
            id: 1,
            type: 'critical',
            title: 'Emergency Stop Triggered',
            meta: 'Operator ID: #8821',
            time: 'Today, 10:45 AM',
            icon: 'warning',
            badge: 'Critical',
            description: ''
        },
        {
            id: 2,
            type: 'routine',
            title: 'Routine Lubrication',
            description: 'Maintenance performed by Team A. Levels checked and topped up.',
            time: 'Yesterday, 08:00 AM',
            icon: 'oil_barrel'
        },
        {
            id: 3,
            type: 'info',
            title: 'Shift Changeover Check',
            description: 'Standard inspection completed. No anomalies reported.',
            time: '2 days ago, 4:30 PM',
            icon: 'assignment'
        },
        {
            id: 4,
            type: 'replacement',
            title: 'Motor Replacement',
            description: 'Scheduled maintenance. Motor B-Series replaced with C-Series upgrade.',
            time: 'Oct 12',
            icon: 'build'
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
