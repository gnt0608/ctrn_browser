<template>
    <v-container>
      <v-card>
        <v-card-title> Export - 事前変数設定 </v-card-title>
        <v-card-subtitle>
          変数を事前に設定し、各処理で使用できるようにします
        </v-card-subtitle>
        <v-container>
          <v-row>
            <v-col>
              <div class="fieldDesc">
                <div class="fieldTitle">
                  Args - 変数名 + 値のセットです
                </div>
                <p class="hint">
                  ここで設定した値は、以降の処理で参照することができます。
                  なお、システム内で設定している変数も書き換えることができるため、設定する変数名は注意してください。
                </p>
              </div>
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
  
  // FIXME: あとでやる
  </script>
  