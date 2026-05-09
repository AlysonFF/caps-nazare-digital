<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search, UserPlus, X, Calendar, CreditCard, Activity, FileText, Plus } from 'lucide-vue-next';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '@/services/api';

const searchTerm = ref('');
const isNewPatientModalOpen = ref(false);
const isMedicalRecordModalOpen = ref(false);
const isNewRecordModalOpen = ref(false);
const selectedPatient = ref<any>(null);
const patientRecords = ref<any[]>([]);

const patients = ref<any[]>([]);

const fetchPatients = async () => {
  try {
    const response = await api.get('/pacientes');
    patients.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
  }
};

onMounted(fetchPatients);

const newPatient = ref({
  name: '',
  record_number: '',
  birth_date: '',
});

const handleCreatePatient = async () => {
  try {
    await api.post('/pacientes', {
      name: newPatient.value.name,
      record_number: newPatient.value.record_number,
      birth_date: newPatient.value.birth_date
    });
    
    isNewPatientModalOpen.value = false;
    newPatient.value = { name: '', record_number: '', birth_date: '' };
    await fetchPatients();
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
  }
};

const openMedicalRecord = async (patient: any) => {
  selectedPatient.value = patient;
  try {
    const response = await api.get(`/pacientes/${patient.id}/prontuario`);
    patientRecords.value = response.data;
    isMedicalRecordModalOpen.value = true;
  } catch (error) {
    console.error('Erro ao buscar prontuário:', error);
  }
};

const newRecord = ref({ description: '', professional: 'Dr(a). Logado(a)', type: 'evolution' });
const handleCreateRecord = async () => {
  try {
    await api.post(`/pacientes/${selectedPatient.value.id}/prontuario`, newRecord.value);
    newRecord.value.description = '';
    isNewRecordModalOpen.value = false;
    const response = await api.get(`/pacientes/${selectedPatient.value.id}/prontuario`);
    patientRecords.value = response.data;
  } catch (error) {
    console.error('Erro ao criar registro:', error);
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 class="text-3xl font-semibold text-gray-900">Pacientes</h1>
      <button @click="isNewPatientModalOpen = true" class="caps-button flex items-center gap-2 self-start">
        <UserPlus :size="20" />
        Cadastrar Paciente
      </button>
    </div>

    <div class="relative">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
      <input 
        type="text"
        placeholder="Buscar por nome ou CPF..."
        class="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border-none focus:ring-2 focus:ring-sage shadow-sm"
        v-model="searchTerm"
      />
    </div>

    <div class="caps-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-bottom border-gray-100">
              <th class="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Nome</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">CPF</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="patient in patients" :key="patient.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ patient.name }}</div>
                <div class="text-xs text-gray-400">Nasc: {{ format(new Date(patient.birth_date), 'dd/MM/yyyy') }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 font-mono">{{ patient.record_number }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <div class="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Ativo
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="openMedicalRecord(patient)" class="text-sage font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ver Prontuário</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isNewPatientModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div class="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-8 space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900">Cadastrar Paciente</h2>
            <button @click="isNewPatientModalOpen = false" class="text-gray-400 hover:text-gray-600">
              <X :size="24" />
            </button>
          </div>

          <form @submit.prevent="handleCreatePatient" class="space-y-4">
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nome Completo</label>
              <input v-model="newPatient.name" type="text" required class="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-sage" placeholder="Nome do paciente">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nº Prontuário</label>
                <div class="relative">
                  <CreditCard class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="16" />
                  <input v-model="newPatient.record_number" type="text" required class="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-sage" placeholder="Ex: 2024-001">
                </div>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Data de Nascimento</label>
                <div class="relative">
                  <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="16" />
                  <input v-model="newPatient.birth_date" type="date" required class="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-sage">
                </div>
              </div>
            </div>
            <div class="pt-4">
              <button type="submit" class="caps-button w-full">Finalizar Cadastro</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="isMedicalRecordModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div class="bg-white w-full max-w-2xl h-[80vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div class="p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">Prontuário Digital</h2>
            <p class="text-sm text-gray-500">{{ selectedPatient?.name }} • CPF: {{ selectedPatient?.cpf }}</p>
          </div>
          <button @click="isMedicalRecordModalOpen = false" class="text-gray-400 hover:text-gray-600">
            <X :size="24" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-8 space-y-8">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Evoluções e Registros</h3>
            <button @click="isNewRecordModalOpen = true" class="text-sage text-sm font-semibold flex items-center gap-1 hover:underline">
              <Plus :size="16" />
              Novo Registro
            </button>
          </div>

          <div v-if="patientRecords.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <FileText :size="32" />
            </div>
            <p class="text-gray-400">Nenhum registro encontrado para este paciente.</p>
          </div>

          <div v-else class="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
            <div v-for="record in patientRecords" :key="record.id" class="relative pl-12">
              <div class="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-sage flex items-center justify-center text-sage z-10">
                <Activity :size="18" />
              </div>
              <div class="caps-card p-5 space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold text-sage uppercase tracking-widest">{{ format(new Date(record.date), "dd 'de' MMMM, yyyy", { locale: ptBR }) }}</span>
                  <span class="text-xs text-gray-400">{{ record.professional }}</span>
                </div>
                <p class="text-gray-700 leading-relaxed">{{ record.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isNewRecordModalOpen" class="absolute inset-0 z-[70] bg-white flex flex-col p-8 animate-in slide-in-from-bottom duration-300">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Novo Registro Médico</h3>
            <button @click="isNewRecordModalOpen = false" class="text-gray-400">
              <X :size="24" />
            </button>
          </div>
          <form @submit.prevent="handleCreateRecord" class="space-y-4 flex-1">
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Descrição do Atendimento</label>
              <textarea v-model="newRecord.description" rows="10" required class="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-sage" placeholder="Descreva a evolução do paciente..."></textarea>
            </div>
            <button type="submit" class="caps-button w-full">Salvar no Prontuário</button>
          </form>
        </div>

        <div class="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button @click="isMedicalRecordModalOpen = false" class="px-6 py-2 text-gray-500 font-medium hover:text-gray-700">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>
