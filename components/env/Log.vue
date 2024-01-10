<template>
  <v-container>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel key="Log">
        <v-expansion-panel-title>
          <v-row>
            <v-col>Log</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Log Type - 対象となるサービスを指定します。
                </div>
                <p class="hint">
                </p>
              </div>
              <v-radio-group v-model="log_type" inline @input="$emit('update:type', $event.target.value)">
                <v-radio label="AWS" value="AWS"></v-radio>
                <v-radio label="Datadog" value="Datadog"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
let panel = ref([0]);
let props = defineProps({
  type: { type: String, required: true, default: "AWS" },
});

let emits = defineEmits(["update:type"]);
let log_type = ref(props.type);
</script>
