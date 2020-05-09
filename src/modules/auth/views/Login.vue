<template>
	<v-container fill-height>
		<v-layout justify-center align-center>
			<v-flex md3>
				<v-card class="elevation-5">
					<v-toolbar color="teal darken-1" dark>
						<v-toolbar-title class="text-center">alguma</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-progress-circular v-show="isLoading" indeterminate size="35" color="white" />
					</v-toolbar>

					<v-card-text>
						<v-form>
							<v-text-field
								v-if="!isLogin"
								prepend-icon="fas fa-user"
								label="nome"
								type="text"
								v-model.trim="user.nome"
							/>
							<v-text-field
								prepend-icon="fas fa-envelope"
								label="email"
								type="email"
								v-model.trim="user.email"
							/>
							<v-text-field
								prepend-icon="fas fa-lock"
								label="senha"
								type="password"					
								v-model.trim="user.senha"
							/>
						</v-form>

						<v-btn @click="isLogin = !isLogin" block text color="white" class="mt-3">alguma</v-btn>
					</v-card-text>

					<v-card-actions>
						<v-spacer />
						<v-btn  @click="submit" color="teal darken-1" large>alguma</v-btn>
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

import AuthService from "../services/auth-service";

export default {
	name: "Login",
	data() {
		return {
			user: { nome: null, email: null, senha: null },
			isLogin: true,
			isLoading: false,
			showSnackbar: false,
			error: null
		};
	},
	methods: {
		async submit() {
      this.isLoading = true;
      console.log(this.user)
			try {
				this.isLogin
					? await AuthService.login(this.user)
					: await AuthService.signup(this.user);
				this.$router.push(this.$route.query.redirect || "/dashboard");
			} catch (error) {
				this.error = error.message;
				this.showSnackbar = true;
			} finally {
				this.isLoading = false;
			}
		}
	}
};
</script>
