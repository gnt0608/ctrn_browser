<template>
  <div>{{ path }}</div>
  <div>{{ config }}</div>
  <template v-for="(component, index) in components">
    <component :is="toCamelCase(component.process)" :component="component" />
  </template>
</template>

<script setup>
let route = useRoute();
let path = ref(route.query.path);

let config = ref({});
let components = ref([]);
watch(
  () => route.query.path,
  async () => {
    path.value = route.query.path;
    await loadYaml();
  }
);

onMounted(async () => {
  if (route.query.path) {
    path.value = route.query.path;
    await loadYaml();
  }
});

async function loadYaml() {
  config.value = await window.electronAPI.loadYaml(route.query.path);
  components.value = Object.values(config.value);
}

function toCamelCase(str) {
  if (typeof str !== "string") return str;

  var strs = str.split(/[-_ ]+/),
    i = 1,
    len = strs.length;

  if (len <= 1) return str;

  i = 0;
  str = "";

  for (; i < len; i++) {
    str += strs[i].toLowerCase().replace(/^[a-z]/, function (value) {
      return value.toUpperCase();
    });
  }

  return str;
}
</script>
