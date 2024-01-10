<template>
  <v-card>
    <v-card-title>プロジェクトを追加</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          プロジェクト名:
          <v-text-field
            v-model="project_name"
            label="Project Name"
            persistent-hint
          />
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="1">
          <v-btn color="primary" @click="cancel">Cancel</v-btn></v-col
        >
        <v-col cols="1">
          <v-btn color="primary" @click="add">Add</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
let project_name = ref("");
let emits = defineEmits(["cancel", "add"]);

function cancel() {
  emits("cancel");
}

function add() {
  emits("add", project_name.value);
}
</script>
