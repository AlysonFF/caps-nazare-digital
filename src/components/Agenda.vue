<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Search, Plus, Users, MapPin, X, Calendar, Clock as ClockIcon, User } from 'lucide-vue-next';
import { format } from 'date-fns';
import api from '@/services/api';
import SuccessView from './SuccessView.vue';

const searchTerm = ref('');
const isNewWorkshopModalOpen = ref(false);
const isSchedulePatientModalOpen = ref(false);
const isSuccess = ref(false);
const selectedWorkshop = ref<any>(null);
const selectedPatientId = ref('');
const errorMessage = ref('');

const workshops = ref<any[]>([]);
const patients = ref<any[]>([]);

const fetchInitialData = async () => {
  try {
    const [workshopsRes, patientsRes] = await Promise.all([
      api.get('/oficinas'),
      api.get('/pacientes')
    ]);
    
    workshops.value = workshopsRes.data;
    patients.value = patientsRes.data;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    errorMessage.value = 'Erro ao carregar dados do servidor. Verifique a conexão.';
  }
};

onMounted(fetchInitialData);

const filteredWorkshops = computed(() => {
  return workshops.value.filter(w => 
    w.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const openScheduleModal = (workshop: any) => {
  selectedWorkshop.value = workshop;
  selectedPatientId.value = '';
  errorMessage.value = '';
  isSchedulePatientModalOpen.value = true;
};

const handleConfirmSchedule = async () => {
  if (!selectedPatientId.value) {
    errorMessage.value = 'Por favor, selecione um paciente.';
    return;
  }

  try {
    errorMessage.value = '';
    await api.post('/agendamentos', {
      patient_id: selectedPatientId.value,
      oficina_id: selectedWorkshop.value.id
    });

    isSchedulePatientModalOpen.value = false;
    isSuccess.value = true;
  } catch (error: any) {
    console.error('Erro ao agendar:', error);
    errorMessage.value = error.response?.data?.message || 'Falha ao realizar agendamento.';
  }
};

const getSelectedPatientName = () => {
  return patients.value.find(p => p.id === selectedPatientId.value)?.name || '';
};

const newWorkshop = ref({ title: '', description: '', date: '', time: '', max_participants: 10, facilitator: '' });
const handleCreateWorkshop = async () => {
  try {
    await api.post('/oficinas', {
      title: newWorkshop.value.title,
      description: newWorkshop.value.description,
      date: newWorkshop.value.date,
      time: newWorkshop.value.time,
      max_participants: newWorkshop.value.max_participants,
      facilitator: newWorkshop.value.facilitator
    });
    
    isNewWorkshopModalOpen.value = false;
    newWorkshop.value = { title: '', description: '', date: '', time: '', max_participants: 10, facilitator: '' };
    await fetchInitialData();
  } catch (error) {
    console.error('Erro ao criar oficina:', error);
  }
};
</script>

<template>
  <div class="space-y-6">
    <Transition name="fade" mode="out-in">
      <SuccessView 
        v-if="isSuccess" 
        :workshop-title="selectedWorkshop?.title"
        :patient-name="getSelectedPatientName()"
        @back="isSuccess = false"
      />

      <div v-else class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 class="text-3xl font-semibold text-gray-900">Agenda de Oficinas</h1>
          <button @click="isNewWorkshopModalOpen = true" class="caps-button flex items-center gap-2 self-start">
            <Plus :size="20" />
            Nova Oficina
          </button>
        </div>

        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
          <input 
            type="text"
            placeholder="Buscar oficinas..."
            class="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border-none focus:ring-2 focus:ring-sage shadow-sm"
            v-model="searchTerm"
          />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="workshop in filteredWorkshops" :key="workshop.id" class="caps-card p-6 space-y-4">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-medium text-gray-900 leading-tight">{{ workshop.title }}</h3>
              <div class="flex flex-col items-end gap-1">
                <span class="bg-sage/10 text-sage text-xs font-bold px-2 py-1 rounded uppercase">
                  {{ workshop.time }}
                </span>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {{ format(new Date(workshop.date), 'dd/MM/yyyy') }}
                </span>
              </div>
            </div>
            <p class="text-gray-500 text-sm line-clamp-2">{{ workshop.description }}</p>
            <div class="flex items-center gap-4 text-sm text-gray-400">
              <div class="flex items-center gap-1">
                <Users :size="16" />
                <span>{{ workshop.currentParticipants }}/{{ workshop.maxParticipants }}</span>
              </div>
              <div class="flex items-center gap-1">
                <MapPin :size="16" />
                <span>Sala 02</span>
              </div>
            </div>
            <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span class="text-sm font-medium text-gray-700">{{ workshop.facilitator }}</span>
              <button @click="openScheduleModal(workshop)" class="text-sage font-semibold hover:underline">Agendar Paciente</button>
            </div>
          </div>
        </div>

        <div v-if="isNewWorkshopModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden">
            <div class="p-8 space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold text-gray-900">Nova Oficina</h2>
                <button @click="isNewWorkshopModalOpen = false" class="text-gray-400 hover:text-gray-600">
                  <X :size="24" />
                </button>
              </div>
              <form @submit.prevent="handleCreateWorkshop" class="space-y-4">
                <input v-model="newWorkshop.title" type="text" required class="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none" placeholder="Ex: Oficina de Música">
                <textarea v-model="newWorkshop.description" rows="3" class="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none" placeholder="Breve descrição da atividade..."></textarea>
                <div class="grid grid-cols-2 gap-4">
                  <input v-model="newWorkshop.date" type="date" required class="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none">
                  <input v-model="newWorkshop.time" type="time" required class="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none">
                </div>
                <button type="submit" class="caps-button w-full">Criar Oficina</button>
              </form>
            </div>
          </div>
        </div>

        <div v-if="isSchedulePatientModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div class="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden">
            <div class="p-8 space-y-6">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold text-gray-900">Agendar Paciente</h2>
                <button @click="isSchedulePatientModalOpen = false" class="text-gray-400 hover:text-gray-600">
                  <X :size="24" />
                </button>
              </div>

              <div class="bg-sage/5 p-4 rounded-2xl border border-sage/10">
                <p class="font-medium text-gray-900">{{ selectedWorkshop?.title }}</p>
                <p class="text-sm text-gray-500">{{ selectedWorkshop?.time }} • {{ selectedWorkshop?.facilitator }}</p>
              </div>

              <div v-if="errorMessage" class="p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100">
                {{ errorMessage }}
              </div>

              <div class="space-y-4">
                <div class="space-y-1">
                  <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Selecionar Paciente</label>
                  <div class="relative">
                    <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="18" />
                    <select v-model="selectedPatientId" class="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-sage appearance-none">
                      <option value="" disabled selected>Escolha um paciente...</option>
                      <option v-for="p in patients" :key="p.id" :value="p.id">{{ p.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="pt-4">
                  <button @click="handleConfirmSchedule" class="caps-button w-full">Confirmar Agendamento</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
