import type { mergeProps } from 'vue';
<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel :key="name">
        <v-expansion-panel-title>
          <v-row>
            <v-col cols="8"> {{index + 1}}. {{ name }}</v-col>
            <v-spacer />
            <v-col cols="1"><v-icon icon="mdi-pencil" @click="proc = true"/> </v-col>
            <v-col cols="1"><v-icon icon="mdi-trash-can" @click="deleteProc"/> </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <component
            :is="toCamelCase(component.process)"
            :component="component"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  <v-dialog v-model="proc">
    <ProcDialog edit :name="name" @edit="edit" @cancel="proc = false"/>
  </v-dialog>
</template>

<script setup>

let panel = ref("0");
let proc = ref(false);
let props = defineProps({
  index: { type: Number, required: true },
  name: { type: String, required: true },
  component: { type: Object, required: true },
});

let emits = defineEmits(["update:name","delete"]);
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

function edit(name){
  emits("update:name", name)
  proc.value = false
}

function deleteProc(){
  emits("delete")
}

</script>
