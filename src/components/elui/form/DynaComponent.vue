<template>
	<div>
		<h2>动态组件</h2>
		<div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab">
        {{ tab }}
      </button>
      <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "DynaComponent",
	data() {
		return {
			currentTab: "Home",
			tabs: ["Home", "Posts", "Archive"]
		}
	},
	computed: {
		currentTabComponent: function() {
			return "tab-" + this.currentTab.toLowerCase();
		}
	},
	created() {
		Vue.component("tab-home", {
			template: "<div>Home component</div>"
		});
		Vue.component("tab-posts", {
			template: "<div>Posts component</div>"
		});
		Vue.component("tab-archive", {
			template: "<div>Archive component</div>"
		});
	}
}
</script>
<style>
.tab-button {
	padding: 6px 10px;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	border: 1px solid #ccc;
	cursor: pointer;
	background: #f0f0f0;
	margin-bottom: -1px;
	margin-right: -1px;
}
.tab-button:hover {
	background: #e0e0e0;
}
.tab-button.active {
	background: #e0e0e0;
}
.tab {
	border: 1px solid #ccc;
	padding: 10px;
}
</style>

