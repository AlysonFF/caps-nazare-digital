/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MedicalRecordEntry {
  id: string;
  date: string;
  professional: string;
  description: string;
  type: 'evolution' | 'medication' | 'workshop';
}

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  status: 'active' | 'inactive';
  records?: MedicalRecordEntry[];
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  maxParticipants: number;
  currentParticipants: number;
  facilitator: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  workshopId: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}
