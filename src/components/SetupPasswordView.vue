<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowLeft, ShieldCheck, KeyRound, Lock, CheckCircle2 } from 'lucide-vue-next';

const emit = defineEmits(['back', 'complete']);

const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const passwordsMatch = computed(() => {
  return newPassword.value && newPassword.value === confirmPassword.value;
});

const passwordStrength = computed(() => {
  if (!newPassword.value) return 0;
  let strength = 0;
  if (newPassword.value.length >= 8) strength += 25;
  if (/[a-z]/.test(newPassword.value) && /[A-Z]/.test(newPassword.value)) strength += 25;
  if (/[0-9]/.test(newPassword.value)) strength += 25;
  if (/[^A-Za-z0-9]/.test(newPassword.value)) strength += 25;
  return strength;
});

const handleSetup = () => {
  if (!passwordsMatch.value) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit('complete');
  }, 1200);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden p-6">
    <div class="absolute top-[20%] left-[-5%] w-[30%] h-[30%] bg-sage/5 rounded-full blur-3xl shadow-inner"></div>
    
    <div class="w-full max-w-[440px] z-10">
      <button 
        @click="emit('back')" 
        class="flex items-center gap-2 text-gray-500 hover:text-sage transition-colors mb-6 group"
      >
        <ArrowLeft :size="18" class="group-hover:-translate-x-1 transition-transform" />
        <span class="text-sm font-medium">Voltar para o login</span>
      </button>

      <div class="caps-card p-10 bg-white shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gray-50">
          <div 
            class="h-full bg-sage transition-all duration-500"
            :style="{ width: `${passwordStrength}%` }"
          ></div>
        </div>

        <div class="mb-8">
          <div class="w-12 h-12 rounded-2xl bg-sage/10 text-sage flex items-center justify-center mb-4">
            <ShieldCheck :size="24" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Crie sua senha</h2>
          <p class="text-gray-500 text-sm mt-2 leading-relaxed">
            Para sua segurança, defina uma senha forte que contenha letras, números e símbolos.
          </p>
        </div>

        <form @submit.prevent="handleSetup" class="space-y-6">
          <div class="space-y-2">
            <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Nova Senha</label>
            <div class="relative group">
              <KeyRound class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sage transition-colors" :size="18" />
              <input 
                v-model="newPassword"
                type="password" 
                placeholder="Mínimo 8 caracteres"
                class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sage/20 focus:bg-white transition-all outline-none text-sm"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Confirmar Senha</label>
            <div class="relative group">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sage transition-colors" :size="18" />
              <input 
                v-model="confirmPassword"
                type="password" 
                placeholder="Repita sua nova senha"
                class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sage/20 focus:bg-white transition-all outline-none text-sm"
                required
              />
            </div>
            <p v-if="confirmPassword && !passwordsMatch" class="text-[11px] text-red-500 ml-1">As senhas não coincidem.</p>
            <p v-if="confirmPassword && passwordsMatch" class="text-[11px] text-green-600 ml-1 flex items-center gap-1">
              <CheckCircle2 :size="10" /> Senhas coincidem!
            </p>
          </div>

          <button 
            type="submit" 
            :disabled="loading || !passwordsMatch || passwordStrength < 50"
            class="caps-button w-full py-4 flex items-center justify-center gap-2 group shadow-lg shadow-sage/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else>Finalizar Configuração</span>
          </button>
        </form>
      </div>

      <div class="mt-8 flex justify-center gap-8 opacity-50">
        <div class="flex flex-col items-center">
          <div class="w-2 h-2 rounded-full mb-1" :class="newPassword.length >= 8 ? 'bg-sage' : 'bg-gray-300'"></div>
          <span class="text-[9px] uppercase font-bold tracking-tighter">8+ Carac.</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-2 h-2 rounded-full mb-1" :class="/[A-Z]/.test(newPassword) ? 'bg-sage' : 'bg-gray-300'"></div>
          <span class="text-[9px] uppercase font-bold tracking-tighter">Maiúscula</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-2 h-2 rounded-full mb-1" :class="/[0-9]/.test(newPassword) ? 'bg-sage' : 'bg-gray-300'"></div>
          <span class="text-[9px] uppercase font-bold tracking-tighter">Número</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-2 h-2 rounded-full mb-1" :class="/[^A-Za-z0-9]/.test(newPassword) ? 'bg-sage' : 'bg-gray-300'"></div>
          <span class="text-[9px] uppercase font-bold tracking-tighter">Símbolo</span>
        </div>
      </div>
    </div>
  </div>
</template>
