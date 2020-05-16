<template>
	<section>
		<OrcamentoItem />
		<router-view></router-view>
	</section>
</template>

<script>
import OrcamentoItem from "./OrcamentoItem";

export default {
	name: "AppLayoutOrcamento",
	components: {
		OrcamentoItem
	}
};
</script>