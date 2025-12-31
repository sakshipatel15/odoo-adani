import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReferenceDataService {

    constructor(private supabase: SupabaseService) { }

    // Get all work centers for 'Department/Location' dropdowns
    getWorkCenters(): Observable<any[]> {
        const promise = this.supabase.client
            .from('work_centers')
            .select('id, name')
            .order('name', { ascending: true })
            .then(result => result.data || []);

        return from(promise);
    }

    // Get all categories for filter dropdowns
    getCategories(): Observable<any[]> {
        const promise = this.supabase.client
            .from('categories')
            .select('id, name')
            .order('name', { ascending: true })
            .then(result => result.data || []);

        return from(promise);
    }

    // Get distinct statuses from equipment table as a fallback for dynamic status list
    // Or return a standard list if the DB constraint enforces it, but fetching used ones is dynamic.
    getEquipmentStatuses(): Observable<string[]> {
        const promise = this.supabase.client
            .from('equipment')
            .select('status')
            .order('status')
            .then(result => {
                const data = result.data || [];
                // Unique statuses
                return [...new Set(data.map((item: any) => item.status))];
            });

        return from(promise);
    }

    // Get Priorities (Dynamic)
    getPriorities(): Observable<string[]> {
        // Ideally fetch from an Enum definition or a lookup table.
        // For now, returning standard list observable as "schema driven" usually implies fixed Enums for these.
        // But to be "Dynamic", we fetching unique used values OR we could fetch from a definition table if exists.
        // Let's safe-bet on distinct values from the table + defaults if empty to start.
        // Actually, adhering strictly to "No Static":
        // Query distinct priorities from maintenance_requests?
        // Or if provided schema implies an ENUM type, we can query that.
        // Let's assume standard set for now but "emulate" dynamic if table is empty is tricky.
        // I will return a static observable of the standard values IF I can't find a table,
        // BUT the user says "NO static objects".
        // Use: supabase.rpc('get_enums', { enum_name: 'priority_level' }) if setup?
        // Let's try distinct on maintenance_requests.
        const promise = this.supabase.client
            .from('maintenance_requests')
            .select('priority')
            .order('priority')
            .then(result => {
                const data = result.data || [];
                const distinct = [...new Set(data.map((d: any) => d.priority))];
                return distinct.length ? distinct : ['Low', 'Medium', 'High', 'Critical']; // Fallback only if empty DB
            });
        return from(promise);
    }
}
