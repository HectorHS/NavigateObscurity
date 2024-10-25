// This store should manage all data for the machines page
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiGetMachinesOverview } from '@/api/api';

export const useMachinesStore = defineStore('machineStore', () => {
  const machinesOverviewData = ref<any>({});
  const severities = ref<any>([{ key: 5, title: 'critical' },
    { key: 4, title: 'high' },
    { key: 3, title: 'moderate' },
    { key: 2, title: 'minor' },
    { key: 1, title: 'note' }]);
  const statuses = ref<any>([
    { key: 4, title: 'resolved' },
    { key: 3, title: 'fixed' },
    { key: 2, title: 'acknowledged' },
    { key: 1, title: 'new' }
  ]);
  const primaryStats = computed<any>(() => {
    let stats: any = [];
    let stats1 = [];
    stats1.push({ label: "total", value: 50, icon: 'mdi-set-all' });
    stats1.push({ label: "remote", value: '39/50', icon: 'mdi-cloud' });
    stats1.push({ label: "local", value: '11/50', icon: 'mdi-server' });
    stats.location = stats1;

    let stats2 = [];
    stats2.push({ label: "active", value: '43/50', icon: 'mdi-check-circle' });
    stats2.push({ label: "data ready", value: '37/43', icon: 'mdi-database-check' });
    stats2.push({ label: "renew ready", value: '0/43', icon: 'mdi-refresh' });
    stats2.push({ label: "git", value: '0/43', icon: 'mdi-git' });
    stats.status = stats2;

    return stats;
  });
  const secondaryStats = computed<any>(() => {
    let stats: any = [];
    stats.push({ label: 'routine_1', value: '283/462' });
    stats.push({ label: 'routine_2', value: '0/0' });
    stats.push({ label: 'routine_3', value: '140/201' });
    stats.push({ label: 'routine_4', value: '34/44' });
    stats.push({ label: 'routine_5', value: '0/0' });
    return stats;
  });
  const machinePreviewTable = computed<any>(() => {
    let stats:any = [];

    if (machinesOverviewData.value.messages){
      stats = machinesOverviewData.value.messages;
      for (let item of stats) {
        let severity = severities.value.filter((i:any) => i.key == item.severity)[0].title;
        item.severity = severity;
        let status = statuses.value.filter((i: any) => i.key == item.status)[0].title;
        item.status = status;
      }
    }

    // stats.push({timestamp: "16/4/2024 11:40",
    //     name: "Worker 1",
    //     ip: "49.12.0.208",
    //     title: "Hight load",
    //     location: "local",
    //     comments: "a comment on this machine",
    //     machine_comments: "not user",
    //     last_updated: "",
    //     severity: "3",
    //     status: "1",
    //     pinned: 0,
    //     active: "1"
    //   });
    // stats.push({
    //   timestamp: "16/4/2024 11:22",
    //   name: "Worker 2",
    //   ip: "49.12.0.222",
    //   title: "Hight load",
    //   location: "remote",
    //   comments: "a comment on this machine",
    //   machine_comments: "not user",
    //   last_updated: "",
    //   severity: "1",
    //   status: "3",
    //   pinned: 0,
    //   active: "1"
    // });
    // stats.push({
    //   timestamp: "16/4/2024 18:40",
    //   name: "Worker 3",
    //   ip: "49.12.0.80",
    //   title: "Hight load",
    //   location: "local",
    //   comments: "a comment on this machine",
    //   machine_comments: "not user",
    //   last_updated: "",
    //   severity: "4",
    //   status: "2",
    //   pinned: 0,
    //   active: "1"
    // });

    

    return stats;

  });

  async function getMachinesOverviewData():Promise<void> {
    try {
      const res = await apiGetMachinesOverview();
      machinesOverviewData.value = res.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  // all variables and functions should be added here
  return {
    severities,
    statuses,
    primaryStats,
    secondaryStats,
    machinePreviewTable,
    getMachinesOverviewData
  }
});


