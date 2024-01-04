import type { mergeProps } from 'vue';
<template>
  <component :is="toCamelCase(component.process)" :component="component" />
</template>

<script setup>
let panel = ref("0");
let props = defineProps({
  name: { type: String, required: true },
  component: { type: Object, required: true },
});

defineEmits(["update:name"]);
let panel_title = ref(props.name);

watch(
  () => props.name,
  async () => {
    if (panel_title.value != props.name) {
      panel_title.value = props.name;
    }
  }
);

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
