<template>
	<v-navigation-drawer v-model="showNav" dark app color="blue darken-2">
		<v-list dense>
			<v-list-item link>
				<v-list-item-action>
					<v-icon>mdi-home</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Home</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item link>
				<v-list-item-action>
					<v-icon>mdi-contact-mail</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Contact</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: "NavDrawer",
	props: {
		showNav: Boolean
	}
};
</script>