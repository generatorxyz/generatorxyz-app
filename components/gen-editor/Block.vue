<template>
	<div class="relative px-8" @mouseover="toggleAction($event, 'parent')">
		<GenEditorAction v-if="isActionVisisble" />
		<div
			@mouseover="toggleAction($event, 'child')"
			class="focus-visible:border-0 focus-visible:outline-0 dark:text-white"
		>
			<input
				type="text"
				placeholder="Type ‘/’ for commands…"
				class="unset w-full bg-transparent focus:boder-0 focus-visible:border-0 focus-visible:outline-0"
				v-model="model"
			/>
		</div>
		<div
			class="bg-gray-400 dark:bg-gray-800 max-h-[400px] rounded-md"
			role="listbox"
			v-if="showCommand"
		>
			<div>
				<button
					class="unset w-full text-left text-base dark:text-white px-4 dark:hover:bg-gray-700 hover:bg-gray-500 py-2 rounded-t-md"
					role="option"
					value="generate-content"
					@click="setCommand('generate-content')"
					ref="firstChoice"
				>
					Generate message on content
				</button>
				<button
					class="unset w-full text-left text-base dark:text-white px-4 dark:hover:bg-gray-700 hover:bg-gray-500 py-2 rounded-b-md"
					role="option"
					value="generate-url"
					@click="setCommand('generate-url')"
				>
					Generate message on URL
				</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const model = ref()
const showCommand = ref(false)
const firstChoice = ref()
const commandChoice = ref('')
const isActionVisisble = ref(false)
function toggleAction(event: any, element: string) {
	if (element === 'child') {
		event.stopPropagation()
	}
	isActionVisisble.value = true
}

watch(model, (value) => {
	catchCommond()
	// firstChoice.value.focus()
})

function setCommand(value: string) {
	commandChoice.value = value
}

function catchCommond() {
	if (model.value.startsWith('/')) {
		console.log('command')
		showCommand.value = true
		if (commandChoice.value) {
			firstChoice.value.focus()
		}
	} else {
		console.log('not command')
	}
}
</script>

<style scoped>
[contenteditable]:empty:after {
	content: attr(placeholder);
	color: #ccc;
}
</style>
