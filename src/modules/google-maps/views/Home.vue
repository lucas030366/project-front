<template>
	<v-row>
		<v-col lg="4">
			<v-form lazy-validation>
				<v-text-field
					v-model="coordenadas"
					append-outer-icon="fas fa-map-marker-alt"
					@click:append-outer="local"
					label="Busca endereço"
					type="text"
				></v-text-field>

				<v-select v-model="map.type" :items="items" text="text" value="text" label="Tipo" required></v-select>

				<v-select
					v-model="map.radius"
					:items="distancia"
					text="text"
					value="text"
					label="Distancia"
					required
				></v-select>
				<v-btn @click="submit" color="success">OK</v-btn>
			</v-form>
		</v-col>
		<v-col>
			<div ref="map"></div>
		</v-col>
	</v-row>
</template>

<script>
import axios from "axios" 
import { error } from 'util';

export default {
	name: "GoogleMaps",
	data() {
		return {
			items: [{ text: "restaurant" }, { text: "university" }],
			distancia: [{ text: "5" }, { text: "10" }, { text: "15" }],
			map: {
				latitude: 0,
				longitude: 0,
				type: null,
				radius: null
			}
		};
	},
	methods: {
		local() {
			navigator.geolocation.getCurrentPosition(
				position => {
					(this.map.latitude = position.coords.latitude),
						(this.map.longitude = position.coords.longitude);
				},
				error => {
					console.log(error.message);
				}
			);
		},
		submit() {
			console.log(this.map)
			const key = "AIzaSyARH0tNcCSqqV8B5rTfid6JREtMyGe3YHE"
			const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.map.type}&inputtype=textquery&fields=name&locationbias=circle:${this.map.radius * 1000}@${this.map.latitude},${this.map.longitude}&key=${key}`
			axios.get(URL)
			.then(response => {
				console.log(response.data)
			})
			.catch(error=> {
				console.log(error.message)
			})
	
		}
	},
	computed: {
		coordenadas() {
			return `${this.map.latitude}, ${this.map.longitude}`;
		}
	}
};
</script>