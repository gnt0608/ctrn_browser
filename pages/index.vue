<template>
  <div class="d-flex justify-end">
    <h1 > {{ name }}</h1>
    <v-spacer />
    <v-btn color="brand" class="mr-2"> Save </v-btn>
    <v-btn color="brand"> Add </v-btn>
  </div>
  <template v-for="(key, index) in keys">
    <Procs :name="key" :component="config[key]" />
  </template>
</template>

<script setup>
let route = useRoute();
let path = ref(route.query.path);
let name = ref(route.query.name)
let config = ref({});
let keys = ref([]);
watch(
  () => route.query.path,
  async () => {
    path.value = route.query.path;
    name.value = route.query.name
    await loadYaml();
  }
);

onMounted(async () => {
  if (route.query.path) {
    path.value = route.query.path;
    name.value = route.query.name
    await loadYaml();
  }
});

async function loadYaml() {
  config.value = await window.electronAPI.loadYaml(route.query.path);
  keys.value = Object.keys(config.value);
}
</script>
