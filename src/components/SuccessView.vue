<script setup lang="ts">
import { CheckCircle, Calendar, ArrowLeft } from 'lucide-vue-next';
import Card from 'primevue/card';
import Button from 'primevue/button';

defineProps<{
  workshopTitle: string;
  patientName: string;
}>();

const emit = defineEmits(['back']);
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <Card class="w-full max-w-lg overflow-hidden shadow-2xl rounded-[32px] border-none">
      <template #content>
        <div class="p-8 text-center space-y-6">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sage/10 text-sage animate-bounce">
            <CheckCircle :size="48" />
          </div>
          
          <div class="space-y-2">
            <h1 class="text-3xl font-bold text-gray-900" id="success-title">Agendamento Confirmado!</h1>
            <p class="text-gray-500">O paciente foi registrado com sucesso na oficina selecionada.</p>
          </div>

          <div class="bg-gray-50 rounded-2xl p-6 text-left space-y-4 border border-gray-100">
            <div class="flex items-start gap-3">
              <Calendar class="text-sage mt-1" :size="20" />
              <div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Oficina</p>
                <p class="font-medium text-gray-900">{{ workshopTitle }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3 pt-4 border-t border-gray-100">
              <div class="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center text-[10px] text-sage font-bold mt-1">P</div>
              <div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Paciente</p>
                <p class="font-medium text-gray-900">{{ patientName }}</p>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <Button 
              @click="emit('back')" 
              class="w-full h-14 rounded-2xl font-semibold flex items-center justify-center gap-2"
              aria-labelledby="success-title"
            >
              <ArrowLeft :size="18" />
              Voltar para Agenda
            </Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
/* Estilização seguindo o padrão Aura do PrimeVue com Tailwind */
:deep(.p-card) {
  background: white;
}
</style>
