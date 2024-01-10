<template>
  <v-container>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel key="DB">
        <v-expansion-panel-title>
          <v-row>
            <v-col>DB</v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
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
              <v-radio-group v-model="db_type" inline @input="$emit('update:type', $event.target.value)">
                <v-radio label="PostgreSQL" value="Postgres"></v-radio>
                <v-radio label="SQLServer" value="SQLServer"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Server - データベースサーバのパスを指定します。
                </div>
              </div>
              <v-text-field
                v-model="db_server"
                label="Server"
                @input="$emit('update:server', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Post - データベースサーバのポートを指定します。
                </div>
              </div>
              <v-text-field
                v-model="db_port"
                label="Port"
                @input="$emit('update:port', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Database - データベース名を指定します。
                </div>
              </div>
              <v-text-field
                v-model="db_database"
                label="Database"
                @input="$emit('update:database', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  User - データベースにアクセスするユーザ名を指定します。
                </div>
              </div>
              <v-text-field
                v-model="db_user"
                label="User"
                @input="$emit('update:user', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Password - データベースにアクセスするユーザのパスワードを指定します。
                </div>
              </div>
              <v-text-field
                v-model="db_password"
                label="Password"
                @input="$emit('update:password', $event.target.value)"
                persistent-hint
              />
            </v-col>
          </v-row>        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
let panel = ref([0]);

let props = defineProps({
    type: { type: String, required: true, default: "Postgres" },
    server: { type: String, required: true, default: "localhost" },
    port: { type: String, required: true },
    database: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
});

let emits = defineEmits(["update:type","update:server","update:port","update:database","update:user","update:password"]);
let db_type = ref(props.type)
let db_server = ref(props.server)
let db_port = ref(props.port)
let db_database = ref(props.database)
let db_user = ref(props.user)
let db_password = ref(props.password)
</script>
