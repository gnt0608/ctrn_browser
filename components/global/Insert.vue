<template>
  <v-container>
    <v-card>
      <v-card-title> Insert - 事前データ登録 </v-card-title>
      <v-card-subtitle>
        事前に用意したCSVファイルを利用し、DBへ事前データの登録を行います。
      </v-card-subtitle>
      <v-container>
        <!-- <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                DB Type - 取得する対象のDB種別を指定します。
              </div>
              <p class="hint">
                現状は PostgreSQL / SQLServer に対応しています。
              </p>
            </div>
            <v-radio-group v-model="component.db_type" inline>
              <v-radio label="PostgreSQL" value="Postgres"></v-radio>
              <v-radio label="SQLServer" value="SQLServer"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                Input Directory -
                登録対象となるCSVファイルが保管されいるディレクトリを指定します。
              </div>
              <p class="hint">
                テーブルへはCSVのファイル名から登録を行います。
                CSVのファイル名とテーブル名は一致させてください。
              </p>
            </div>
            <v-text-field
              v-model="component.args.in_dir"
              label="Input Directory"
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
let props = defineProps({
  component: { type: Object, required: true },
});

// initalSetup
function initialSetup(arg, initParam) {
  if (!props.component.args[arg] || props.component.args[arg] == "") {
    props.component.args[arg] = initParam;
  }
}

// if (!props.component.db_type || props.component.db_type == "") {
//     props.component.db_type = "Postgres";
//   }
initialSetup("in_dir", "./prepare/input_csv/");
</script>
