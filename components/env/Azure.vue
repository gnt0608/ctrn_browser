<template>
  <v-container>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel key="Azure">
        <v-expansion-panel-title>
          <v-row>
            <v-col>Azure</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text> </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
let panel = ref([0]);
</script>
