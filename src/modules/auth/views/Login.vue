<template>
  <v-container class="mt-5">
    <v-col cols="3" class="mx-auto">
      <h2 class="text-center pa-4">Entrar no MasterWeb</h2>

      <v-card class="v-sheet--outlined">
        <v-card-text>
          <v-form>
            <v-text-field
              v-if="!isLogin"
              label="nome"
              outlined
              dense
              :error-messages="nomeErrors"
              :success="!$v.user.nome.$invalid"
              v-model.trim="$v.user.nome.$model"
              type="text"
            />

            <v-text-field
              outlined
              dense
              label="email"
              type="email"
              :error-messages="emailErrors"
              :success="!$v.user.email.$invalid"
              v-model.trim="$v.user.email.$model"
            />

            <v-text-field
              outlined
              dense
              label="senha"
              type="password"
              :error-messages="senhaErrors"
              :success="!$v.user.senha.$invalid"
              v-model.trim="$v.user.senha.$model"
            />
          </v-form>

          <v-btn @click="isLogin = !isLogin" block text class="mt-3">{{ texts.button }}</v-btn>

          <div class="text-center">
            <v-progress-circular v-show="isLoading" indeterminate size="35" color="teal darken-1" />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="$v.$invalid"
            @click="submit"
            color="white--text teal darken-1"
            class="v-btn--block"
          >{{ texts.toolbar }}</v-btn>
        </v-card-actions>

        <v-snackbar v-model="showSnackbar" top>
          {{error}}
          <v-btn icon color="pink lighten-1" @click="showSnackbar = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </v-snackbar>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { formatError } from "@/utils";

import AuthService from "@/graphql/auth/services/auth-service";

export default {
  name: "Login",
  data() {
    return {
      user: { nome: null, email: null, senha: null },
      isLogin: true,
      isLoading: false,
      showSnackbar: false,
      error: null,
      textError: "Campo Obrigatório",
    };
  },
  validations() {
    const validations = {
      user: {
        email: { required, email },
        senha: { required, minLength: minLength(6) },
      },
    };

    //nem passa para o proximo, apenas sai da função
    if (this.isLogin) {
      return validations;
    }

    return {
      user: {
        ...validations.user,
        nome: { required, minLength: minLength(6) },
      },
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      try {
        this.isLogin
          ? await AuthService.login(this.user)
          : await AuthService.signup(this.user);
        this.$router.push(this.$route.query.redirect || "/dashboard");
      } catch (error) {
        this.error = formatError(error.message);
        this.showSnackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    texts() {
      return this.isLogin
        ? { toolbar: "Login", button: "Criar conta" }
        : { toolbar: "Criar Conta", button: "Já tenho uma conta" };
    },
    emailErrors() {
      const errors = [];
      const email = this.$v.user.email;

      if (!email.$dirty) {
        return errors;
      }

      !email.required ? errors.push(this.textError) : null;
      !email.email ? errors.push(this.textError) : null;

      return errors;
    },
    senhaErrors() {
      const errors = [];
      const senha = this.$v.user.senha;

      if (!senha.$dirty) {
        return errors;
      }

      !senha.required ? errors.push(this.textError) : null;
      !senha.minLength
        ? errors.push(`Mínimo ${senha.$params.minLength.min} caracteres`)
        : null;

      return errors;
    },
    nomeErrors() {
      const errors = [];
      const nome = this.$v.user.nome;

      if (!nome.$dirty) {
        return errors;
      }

      !nome.required ? errors.push(this.textError) : null;
      !nome.minLength
        ? errors.push(`Mínimo ${nome.$params.minLength.min} caracteres`)
        : null;

      return errors;
    },
  },
};
</script>

<style scoped>
main {
  background-color: #f9f9f9;
}
</style>