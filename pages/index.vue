<template>
  <v-snackbar v-model="successAlert" color="success">
    <div>
      <v-icon icon="mdi-check-circle"></v-icon>
      <span class=""> Done!</span>
    </div>
  </v-snackbar>
  <div class="d-flex justify-end" v-if="buttonControl">
    <h1>{{ name }}</h1>
    <v-spacer />
    <v-btn color="brand" class="mr-2" @click="saveYaml"> Save </v-btn>
    <v-btn color="brand" @click="proc = true"> Add </v-btn>
  </div>
  <draggable v-model="config" group="people" item-key="name">
    <template #item="{ conf, index }">
      <div>
        <Procs
        :index="index"
          v-model:name="config[index].name"
          :component="config[index]"
          @delete="
            () => {
              config.splice(index, 1);
            }
          "
        />
      </div>
    </template>
  </draggable>
  <v-dialog v-model="proc">
    <ProcDialog @add="addProc" />
  </v-dialog>
</template>

<script setup>
import draggable from "vuedraggable";

let route = useRoute();
let path = ref(route.query.path);
let name = ref(route.query.name);
let config = ref([]);
let proc = ref(false);
let successAlert = ref(false);
let buttonControl = ref(false);

watch(
  () => route.query.path,
  async () => {
    path.value = route.query.path;
    name.value = route.query.name;
    await loadYaml();
  }
);

onMounted(async () => {
  if (route.query.path) {
    path.value = route.query.path;
    name.value = route.query.name;
    await loadYaml();
  }
});

function addProc(proc_name, proc_type) {
  config.value.push({ name: proc_name, process: proc_type, args: {} });
  proc.value = false;
}

async function loadYaml() {
  config.value = await window.electronAPI.loadYaml(route.query.path);
  buttonControl.value = true;
}

async function saveYaml() {
  await window.electronAPI.saveYaml(
    route.query.path,
    JSON.stringify(config.value)
  );
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 1000);
}
</script>
