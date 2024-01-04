<template>
  <v-container>
    <v-card>
      <v-card-title> Dump - DBダンプ取得 </v-card-title>
      <v-card-subtitle>
        事前に設定したDBからデータ取得を行い、CSV形式で保存します
      </v-card-subtitle>
      <v-container>
        <v-row>
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
        </v-row>
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">Table - テーブル名を指定します。</div>
              <p class="hint">
                テーブルは,でつなぐことで複数選択することが可能です Ex) Table1,
                Table2
              </p>
            </div>
            <v-text-field
              v-model="table"
              label="Table"
              @input="feedBack($event.target.value)"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="fieldDesc">
              <div class="fieldTitle">
                Output Path - 出力するディレクトリ名を指定します。
              </div>
              <p class="hint">
                実際のファイルはディレクトリ名の下に(テーブル名).csvの形式で出力されます
              </p>
            </div>
            <v-text-field
              v-model="component.args.out_path"
              label="Output Path"
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
if (!props.component.db_type || props.component.db_type == "") {
    props.component.db_type = "Postgres";
  }
function initialSetup(arg, initParam) {
  if (!props.component.args[arg] || props.component.args[arg] == "") {
    props.component.args[arg] = initParam;
  }
}

initialSetup("out_path", "./output/dump/");

let table = ref("");
if (props.component.args.tables) {
  if (Array.isArray(props.component.args.tables)) {
    table.value = props.component.args.tables.join(", ");
  } else {
    table.value = props.component.args.tables;
  }
}

function feedBack(table_value) {
  if (table_value.includes(",")) {
    props.component.args.table = table_value.trim().split(",");
  } else {
    props.component.args.table = table_value.trim();
  }
}
</script>
