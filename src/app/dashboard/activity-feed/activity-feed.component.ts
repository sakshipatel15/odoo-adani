import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActivityLog {
  id: number;
  type: 'warning' | 'ticket' | 'check' | 'group' | 'log';
  title: string;
  time: string;
  subtext?: string;
  meta?: string;
  badge?: string;
  avatar?: string;
  groupAvatars?: string[];
  icon?: string;
}

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'] // Fixed styleUrl to styleUrls
})
export class ActivityFeedComponent implements OnInit {

  activityLogs: ActivityLog[] = [
    {
      id: 1,
      type: 'warning',
      title: 'Hydraulic Pump B pressure warning triggered',
      time: '10 mins ago',
      badge: 'Critical Alert',
      subtext: 'Automated System',
      icon: 'warning'
    },
    {
      id: 2,
      type: 'ticket',
      title: 'Technician J. Doe acknowledged ticket #4021',
      time: '25 mins ago',
      subtext: 'J. Doe • Senior Technician',
      avatar: 'assets/avatars/user1.png',
      icon: 'person'
    },
    {
      id: 3,
      type: 'check',
      title: 'Scheduled maintenance completed for Conveyor Belt 3',
      time: '2 hours ago',
      subtext: 'Ticket closed by M. Smith',
      icon: 'check_circle'
    },
    {
      id: 4,
      type: 'group',
      title: 'Shift change: Morning Crew active',
      time: '4 hours ago',
      groupAvatars: ['assets/avatars/user2.png', 'assets/avatars/user3.png'],
      icon: 'groups'
    },
    {
      id: 5,
      type: 'log',
      title: 'Routine diagnostic scan completed',
      time: '6 hours ago',
      subtext: 'No anomalies detected.',
      icon: 'assignment_turned_in'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
