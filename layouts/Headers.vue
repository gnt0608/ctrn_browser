<template>
  <v-app-bar app class="d-flex align-end" color="primary" dark clippedLeft>
    <v-toolbar-title class="ml-3">Ctrn Browser</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      class="pt-6 mr-2"
      label="Folder"
      variant="outlined"
      v-model="folder"
      readonly
      prepend-inner-icon="mdi-folder"
      bg-color="mono08"
    />
    <v-btn @click="opendialog"> Select Folder</v-btn>
  </v-app-bar>
</template>

<script setup>

let props = defineProps({
  folder: {type: String, require:true}
})

let folder = ref("")
folder.value = props.folder

watch(() => props.folder, async () => {
  folder.value = props.folder
});

const emit = defineEmits(["opendialog"])


function opendialog(){

  emit("opendialog")
}

</script>
