<script setup lang="ts">
import { ref } from 'vue';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  CheckCircle2, 
  LogOut,
  Menu,
  X
} from 'lucide-vue-next';
import Dashboard from './components/Dashboard.vue';
import Agenda from './components/Agenda.vue';
import PatientRegistry from './components/PatientRegistry.vue';
import SidebarItem from './components/SidebarItem.vue';
import LoginView from './components/LoginView.vue';
import SetupPasswordView from './components/SetupPasswordView.vue';
import ForgotPasswordView from './components/ForgotPasswordView.vue';

const authState = ref<'login' | 'setup' | 'forgot' | 'authenticated'>('login');
const activeTab = ref<'dashboard' | 'agenda' | 'patients'>('dashboard');
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = () => {
  authState.value = 'login';
};
</script>

<template>
  <div class="min-h-screen bg-cream font-sans">
    <Transition name="page" mode="out-in">
      <LoginView 
        v-if="authState === 'login'" 
        @login="authState = 'authenticated'"
        @setup-password="authState = 'setup'"
        @forgot-password="authState = 'forgot'"
      />

      <SetupPasswordView 
        v-else-if="authState === 'setup'"
        @back="authState = 'login'"
        @complete="authState = 'login'"
      />

      <ForgotPasswordView 
        v-else-if="authState === 'forgot'"
        @back="authState = 'login'"
      />

      <div v-else class="flex min-h-screen">
        <aside 
          :class="[
            'fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transition-transform duration-300 lg:relative lg:translate-x-0',
            !isSidebarOpen ? '-translate-x-full' : ''
          ]"
        >
          <div class="h-full flex flex-col p-6">
            <div class="flex items-center gap-3 px-2 mb-10">
              <div class="w-10 h-10 rounded-2xl bg-sage flex items-center justify-center text-white shadow-lg shadow-sage/30">
                <CheckCircle2 :size="24" />
              </div>
              <div>
                <h2 class="font-bold text-gray-900 leading-none">CAPS Nazaré</h2>
                <span class="text-[10px] font-bold text-sage uppercase tracking-widest">Digital</span>
              </div>
            </div>

            <nav class="flex-1 space-y-2">
              <SidebarItem 
                :icon="LayoutDashboard" 
                label="Dashboard" 
                :active="activeTab === 'dashboard'" 
                @click="activeTab = 'dashboard'" 
              />
              <SidebarItem 
                :icon="CalendarDays" 
                label="Agenda de Oficinas" 
                :active="activeTab === 'agenda'" 
                @click="activeTab = 'agenda'" 
              />
              <SidebarItem 
                :icon="Users" 
                label="Pacientes" 
                :active="activeTab === 'patients'" 
                @click="activeTab = 'patients'" 
              />
            </nav>

            <div class="pt-6 border-t border-gray-100 space-y-2">
              <div class="px-4 py-3 flex items-center gap-3 text-sm">
                <div class="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center font-bold">
                 AD
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 truncate">Administrador</p>
                  <p class="text-[10px] text-gray-500 truncate uppercase tracking-tighter">Coordenador</p>
                </div>
              </div>
              <button 
                @click="handleLogout"
                class="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors text-sm"
              >
                <LogOut :size="18" />
                <span class="font-medium">Sair do sistema</span>
              </button>
            </div>
          </div>
        </aside>

        <main class="flex-1 flex flex-col min-w-0">
          <header class="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100">
            <button @click="toggleSidebar" class="p-2 text-gray-500">
              <X v-if="isSidebarOpen" :size="24" />
              <Menu v-else :size="24" />
            </button>
            <h2 class="font-bold text-gray-900">CAPS Nazaré</h2>
            <div class="w-10" />
          </header>

          <div class="flex-1 overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto w-full">
            <Transition name="fade" mode="out-in">
              <Dashboard v-if="activeTab === 'dashboard'" />
              <Agenda v-else-if="activeTab === 'agenda'" />
              <PatientRegistry v-else-if="activeTab === 'patients'" />
            </Transition>
          </div>
        </main>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active,
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.page-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>

