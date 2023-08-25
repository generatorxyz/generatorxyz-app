<template>
	<div class="md:grid md:grid-cols-2 flex flex-col gap-4">
		<div>
			<label for="inputAudience" class="uppercase mb-2 block"
				>Audience <span class="text-red-500">*</span>:
			</label>
			<input
				required
				id="inputAudience"
				type="text"
				placeholder="For example: Twitter professionals"
				v-model="tabsStore.selected.audience"
			/>
		</div>
		<div>
			<label for="inputPlatform" class="uppercase mb-2 block"
				>Platform <span class="text-red-500">*</span>:
			</label>
			<select
				required
				id="inputPlatform"
				name="platform"
				class="appearance-none md:block hidden"
				v-model="tabsStore.selected.platform"
			>
				<option class="p-2" value="">...</option>
				<option
					class="p-2"
					v-for="item in contentTypes"
					:value="item.key"
				>
					{{ item.value }}
				</option>
			</select>

			<div class="md:hidden">
				<ul class="flex flex-col">
					<li
						v-for="(item, index) in contentTypes"
						class="border-b border-gray-300 dark:border-gray-600"
						:class="{
							'bg-green-500':
								tabsStore.selected.platform === item.key,
							'dark:bg-gray-500 bg-white':
								tabsStore.selected.platform !== item.key,
							'rounded-t-lg': index === 0,
							'rounded-b-lg border-none': index === contentTypes.length - 1,
						}"
					>
						<label
							:for="item.key"
							class="text-base text-gray-900 font-normal px-2 py-2 block dark:text-white"
						>
							<input
								type="radio"
								name="platform"
								:id="item.key"
								:value="item.key"
								class="hidden"
								v-model="tabsStore.selected.platform"
							/>
							{{ item.value }}
						</label>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { tabsStore } from '~/store/social-generator.store'

const contentTypes = [
	{ key: 'facebook', value: 'Facebook' },
	{ key: 'twitter', value: 'Twitter' },
	{ key: 'instagram', value: 'Instagram' },
	{ key: 'linkedin', value: 'LinkedIn' },
	{ key: 'metadescription', value: 'Meta description' },
]
</script>
