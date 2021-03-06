<template>
  <div class="Button">
    <button class="button" @click.prevent="onClick" :style="{ color: color, fontSize: fontSize }">
      <slot></slot>
    </button>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import PropTypes from '@znck/prop-types'
import loggerMixin from '../../mixins/loggerMixin'

/**
 * The only true button.
 * @example ../../../docs/Button.md
 * @displayName Best Button
 */
export default {
	name: 'Button',
	mixins: [loggerMixin],
	props: {
		/**
		 * The color for the button.
		 */
		color: {
			type: String,
			default: '#333'
		},
		/**
		 * The shape of my heart
		 */
		shape: PropTypes.shape({
			color: PropTypes.string,
			fontSize: PropTypes.number
		}),
		/**
		 * The size of the button
		 * `small, normal, large`
		 */
		size: VueTypes.string.def('normal'),
		/**
		 * Gets called when the user clicks on the button
		 * @ignore
		 */
		onClick: {
			type: Function,
			default: event => {
				console.log('You have clicked me!', event.target)
			}
		}
	},
	computed: {
		fontSize() {
			let size
			switch (this.size) {
				case 'small':
					size = '10px'
					break
				case 'normal':
					size = '14px'
					break
				case 'large':
					size = '18px'
					break
			}
			return size
		}
	}
}
</script>

<style scope>
.button {
	padding: 0.5em 1.5em;
	color: #666;
	background-color: #fff;
	border: 1px solid currentColor;
	border-radius: 0.3em;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
}
.checks {
	background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 25%),
		linear-gradient(-45deg, #f5f5f5 25%, transparent 25%),
		linear-gradient(45deg, transparent 75%, #f5f5f5 75%),
		linear-gradient(-45deg, transparent 75%, #f5f5f5 75%);
	background-size: 16px 16px;
	background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
}
</style>
