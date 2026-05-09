<script setup lang="ts">
import { ref } from 'vue';
import { UsersRound, Mail, Lock, ArrowRight, Sparkles } from 'lucide-vue-next';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const emit = defineEmits(['login', 'setup-password', 'forgot-password']);

const email = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit('login');
  }, 1000);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden p-6">
    <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sage/5 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage/10 rounded-full blur-3xl"></div>

    <div class="w-full max-w-[440px] z-10">
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 rounded-3xl bg-sage flex items-center justify-center text-white shadow-2xl shadow-sage/30 mb-4 transform hover:scale-105 transition-transform">
          <UsersRound :size="32" />
        </div>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">CAPS Nazaré</h1>
          <p class="text-sage font-bold uppercase tracking-[0.2em] text-[10px]">Digital</p>
        </div>
      </div>

      <div class="caps-card p-10 bg-white/80 backdrop-blur-xl border border-white/20">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800">Seja bem-vindo</h2>
          <p class="text-gray-500 text-sm mt-1">Insira suas credenciais para acessar o portal.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label for="email" class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">E-mail</label>
            <div class="relative group">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sage transition-colors" :size="18" />
              <input 
                id="email"
                v-model="email"
                type="email" 
                placeholder="nome@exemplo.com"
                class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sage/20 focus:bg-white transition-all outline-none text-sm"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-center ml-1">
              <label for="password" class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Senha</label>
              <button @click="emit('forgot-password')" type="button" class="text-xs font-medium text-sage hover:underline">Esqueceu a senha?</button>
            </div>
            <div class="relative group">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sage transition-colors" :size="18" />
              <input 
                id="password"
                v-model="password"
                type="password" 
                placeholder="••••••••"
                class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sage/20 focus:bg-white transition-all outline-none text-sm"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="caps-button w-full py-4 flex items-center justify-center gap-2 group shadow-lg shadow-sage/20 disabled:opacity-70"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else class="flex items-center gap-2">
              Acessar Sistema
              <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles :size="14" class="text-amber-500" />
            <span>Primeiro acesso?</span>
            <button @click="emit('setup-password')" class="text-sage font-semibold hover:underline">Configure sua senha</button>
          </div>
        </div>
      </div>

      <p class="text-center mt-8 text-gray-400 text-xs">
        &copy; 2024 CAPS Nazaré da Mata. Todos os direitos reservados.
      </p>
    </div>
  </div>
</template>

<style scoped>
.caps-card {
  box-shadow: 0 10px 40px -10px rgba(90, 90, 64, 0.15);
}
</style>
