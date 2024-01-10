<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          処理名:
          <v-text-field
            v-model="proc_name"
            label="Process Name"
            persistent-hint
          />
        </v-col>
      </v-row>
      <v-row v-if="!edit">
        <v-col>
          <v-select
            v-model="proc_type"
            label="Process Type"
            :items="procs"
            item-title="name"
            item-value="type"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="1">
          <v-btn color="primary" @click="cancel">Cancel</v-btn>
        </v-col>
        <v-col cols="1"  v-if="!edit">
          <v-btn color="primary" @click="addEmit">Add</v-btn>
        </v-col>
        <v-col cols="1"  v-if="edit">
          <v-btn color="primary" @click="editEmit">Edit</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
let props = defineProps({
  name: { type: String, required: false },
  edit: { type: Boolean, required: false, default: false },
});

let proc_name = ref(props.name);
let proc_type = ref("");
let emits = defineEmits(["cancel", "add", "edit"]);

let procs = [
  { type: "dump", name: "Dump - DBダンプ取得" },
  { type: "explore_log", name: "Explore Log - ログ取得" },
  { type: "export", name: "Export - 事前変数設定" },
  { type: "insert", name: "Insert - 事前データ登録" },
  { type: "match_csv", name: "Match CSV - CSV間の突合をします" },
  { type: "send_request", name: "Send Request - リクエスト送信" },
];

function cancel() {
  emits("cancel");
}

function addEmit() {
  emits("add", proc_name.value, proc_type.value);
}

function editEmit() {
  emits("edit", proc_name.value);
}
</script>
