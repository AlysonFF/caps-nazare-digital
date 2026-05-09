<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Clock } from 'lucide-vue-next';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '@/services/api';

const stats = ref({
  totalPatients: 0,
  workshopsToday: 0,
  activeTreatments: 0
});

const workshops = ref<any[]>([]);

const fetchDashboardData = async () => {
  try {
    const [statsRes, workshopsRes] = await Promise.all([
      api.get('/dashboard/stats'),
      api.get('/oficinas')
    ]);
    
    stats.value = statsRes.data;
    workshops.value = workshopsRes.data.slice(0, 5);
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
  }
};

onMounted(fetchDashboardData);
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-4xl font-semibold tracking-tight text-gray-900">Bom dia, Nazaré da Mata</h1>
      <p class="text-gray-500 mt-2">Resumo das atividades do CAPS para hoje, {{ format(new Date(), "dd 'de' MMMM", { locale: ptBR }) }}.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="caps-card p-6 flex flex-col justify-between h-40">
        <span class="text-sm font-medium text-gray-400 uppercase tracking-wider">Pacientes Ativos</span>
        <div class="flex items-baseline gap-2">
          <span class="text-5xl font-light">{{ stats.totalPatients }}</span>
          <span class="text-green-600 text-sm font-medium">Cadastrados</span>
        </div>
      </div>
      <div class="caps-card p-6 flex flex-col justify-between h-40">
        <span class="text-sm font-medium text-gray-400 uppercase tracking-wider">Oficinas Hoje</span>
        <div class="flex items-baseline gap-2">
          <span class="text-5xl font-light">{{ stats.workshopsToday }}</span>
          <span class="text-gray-400 text-sm font-medium">Ativas</span>
        </div>
      </div>
      <div class="caps-card p-6 flex flex-col justify-between h-40">
        <span class="text-sm font-medium text-gray-400 uppercase tracking-wider">Tratamentos</span>
        <div class="flex items-baseline gap-2">
          <span class="text-5xl font-light">{{ stats.activeTreatments }}</span>
          <span class="text-blue-600 text-sm font-medium">Pessoas</span>
        </div>
      </div>
    </div>

    <section class="space-y-4">
      <h2 class="text-xl font-medium text-gray-900">Próximas Atividades</h2>
      <div class="space-y-3">
        <div v-for="workshop in workshops" :key="workshop.id" class="caps-card p-5 flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center text-sage">
              <Clock :size="24" />
            </div>
            <div>
              <h3 class="font-medium text-gray-900">{{ workshop.title }}</h3>
              <p class="text-sm text-gray-500">
                {{ workshop.time }} • {{ format(new Date(workshop.date), 'dd/MM') }} • Facilitador: {{ workshop.facilitator }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {{ workshop.currentParticipants }}/{{ workshop.maxParticipants }} Vagas
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
