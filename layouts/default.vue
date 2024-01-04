<template>
  <v-app>
    <Headers :folder="folder" @opendialog="opendialog"/>
    <Navigator :folder="folder"/>
    <v-main >
      <v-container  fluid class="h-100">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import Headers from './Headers.vue';
import Navigator from './Navigator.vue';

let folder = ref("")

async function opendialog() {
    let foldername = await window.electronAPI.openFile();
    console.log(folder.value)
    folder.value = foldername
}

onMounted(async() =>{
  let foldername = await window.electronAPI.getFolder();
  folder.value = foldername
})

</script>
