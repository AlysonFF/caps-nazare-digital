<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, Mail, Send, CheckCircle2 } from 'lucide-vue-next';

const emit = defineEmits(['back']);

const email = ref('');
const loading = ref(false);
const sent = ref(false);

const handleReset = () => {
  if (!email.value) return;
  loading.value = true;
  
  // Simula o envio de e-mail para a banca ver
  setTimeout(() => {
    loading.value = false;
    sent.value = true;
  }, 1500);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden p-6">
    <!-- Elementos decorativos de fundo -->
    <div class="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-sage/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-sage/5 rounded-full blur-3xl"></div>
    
    <div class="w-full max-w-[440px] z-10">
      <button 
        @click="emit('back')" 
        class="flex items-center gap-2 text-gray-500 hover:text-sage transition-colors mb-6 group"
      >
        <ArrowLeft :size="18" class="group-hover:-translate-x-1 transition-transform" />
        <span class="text-sm font-medium">Voltar para o login</span>
      </button>

      <div class="caps-card p-10 bg-white shadow-2xl relative overflow-hidden">
        <Transition name="slide-fade" mode="out-in">
          <div v-if="!sent" key="form">
            <div class="mb-8">
              <div class="w-12 h-12 rounded-2xl bg-sage/10 text-sage flex items-center justify-center mb-4 shadow-sm">
                <Mail :size="24" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Recuperar acesso</h2>
              <p class="text-gray-500 text-sm mt-2 leading-relaxed">
                Digite seu e-mail cadastrado para receber as instruções de recuperação de senha.
              </p>
            </div>

            <form @submit.prevent="handleReset" class="space-y-6">
              <div class="space-y-2">
                <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">E-mail Institucional</label>
                <div class="relative group">
                  <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sage transition-colors" :size="18" />
                  <input 
                    v-model="email"
                    type="email" 
                    placeholder="exemplo@caps.gov.br"
                    class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sage/20 focus:bg-white transition-all outline-none text-sm"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                :disabled="loading"
                class="caps-button w-full py-4 flex items-center justify-center gap-2 group shadow-lg shadow-sage/20 disabled:opacity-50"
              >
                <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <template v-else>
                  <span>Enviar Instruções</span>
                  <Send :size="18" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </template>
              </button>
            </form>
          </div>

          <div v-else key="success" class="text-center py-4">
            <div class="w-20 h-20 rounded-3xl bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6 shadow-sm animate-bounce-subtle">
              <CheckCircle2 :size="40" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 tracking-tight">E-mail enviado!</h2>
            <p class="text-gray-500 text-sm mt-4 leading-relaxed px-4">
              Enviamos um link de recuperação para <br>
              <strong class="text-gray-700">{{ email }}</strong>. <br>
              Verifique sua caixa de entrada e spam.
            </p>
            
            <button 
              @click="sent = false; email = ''" 
              class="mt-10 text-sage text-sm font-bold hover:underline"
            >
              Não recebi o e-mail
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-subtle {
  animation: bounce-subtle 3s infinite ease-in-out;
}
</style>
