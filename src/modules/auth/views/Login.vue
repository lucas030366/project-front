<template>
	<v-container fill-height>
		<v-layout justify-center align-center>
			<v-flex md3>
				<v-card class="elevation-5">
					<v-toolbar color="teal darken-1" dark>
						<v-toolbar-title class="text-center">{{ texts.toolbar }}</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-progress-circular v-show="isLoading" indeterminate size="35" color="white" />
					</v-toolbar>

					<v-card-text>
						<v-form>
							<v-text-field
								v-if="!isLogin"
								prepend-icon="fas fa-user"
								:error-messages="nomeErrors"
								:success="!$v.user.nome.$invalid"
								v-model.trim="$v.user.nome.$model"
								label="nome"
								type="text"
							/>
							<v-text-field
								prepend-icon="fas fa-envelope"
								label="email"
								type="email"
								:error-messages="emailErrors"
								:success="!$v.user.email.$invalid"
								v-model.trim="$v.user.email.$model"
							/>
							<v-text-field
								prepend-icon="fas fa-lock"
								label="senha"
								type="password"
								:error-messages="senhaErrors"
								:success="!$v.user.senha.$invalid"
								v-model.trim="$v.user.senha.$model"
							/>
						</v-form>

						<!-- <v-btn @click="isLogin = !isLogin" block text class="mt-3">{{ texts.button }}</v-btn> -->
					</v-card-text>

					<v-card-actions>
						<v-spacer />
						<v-btn
							:disabled="$v.$invalid"
							@click="submit"
							color="white--text teal darken-1"
							large
						>{{ texts.toolbar }}</v-btn>
					</v-card-actions>

					<v-snackbar v-model="showSnackbar" top>
						{{error}}
						<v-btn icon color="pink lighten-1" @click="showSnackbar = false">
							<v-icon>fas fa-times</v-icon>
						</v-btn>
					</v-snackbar>
				</v-card>
			</v-flex>
		</v-layout>
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
			textError: "Campo Obrigatório"
		};
	},
	validations() {
		const validations = {
			user: {
				email: { required, email },
				senha: { required, minLength: minLength(6) }
			}
		};

		//nem passa para o proximo, apenas sai da função
		if (this.isLogin) {
			return validations;
		}

		return {
			user: {
				...validations.user,
				nome: { required, minLength: minLength(6) }
			}
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
		}
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
		}
	}
};
</script>


