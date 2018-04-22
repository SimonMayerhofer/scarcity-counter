<?php
/**
 * Plugin Name: Scarcity Counter
 * Description: WordPress Plugin for artificial scarcity. Great for marketing purposes.
 * Version:     1.0.0
 * Author:      Simon Mayerhofer
 * Author URI:  https://mayerhofer.it
 * Plugin URI:  https://github.com/SimonMayerhofer/scarcity-counter
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: scarcity-counter
 * Domain Path: /languages
 *
 * Scarcity Counter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * Scarcity Counter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Scarcity Counter. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
 *
 * @package scarcity-counter
 */

defined( 'ABSPATH' ) || die( 'No script kiddies please!' );
require_once ABSPATH . 'wp-admin/includes/plugin.php';

if ( ! class_exists( 'ScarcityCounter' ) ) {
	/**
	 * ScarcityCounter init class
	 */
	class ScarcityCounter {
		const DOMAIN = 'scarcity-counter';

		/**
		 * Initializes the plugin
		 *
		 * It registers the scripts and initializes hooks
		 */
		public static function init() {
			ScarcityCounter::init_hooks();
			ScarcityCounter::init_shortcodes();
		}

		/**
		 * Shortcode function for [scarcity-counter] shortcode.
		 *
		 * Attributes:
		 * id - id to identify the counter. if used multiple times, the same number is shown.
		 * start - number to start with.
		 * min - lower limit. the counter won't ever get below that limit.
		 * reduction - upper range limit. E.g. if 5 is set as the limit, the counter will be
		 *      reduced by a number between 1 and 5.
		 * timelimit - number in milliseconds how long to wait until another reduction.
		 *
		 * @param  array $atts passed attributes.
		 */
		public static function get_shortcode( $atts ) {
			// enqueue script only if shortcode is used.
			wp_enqueue_script( ScarcityCounter::DOMAIN . '-script' );

			// Attributes.
			$atts = shortcode_atts(
				array(
					'id'        => 'id',
					'start'     => '27',
					'min'       => '3',
					'reduction' => '3',
					'timelimit' => '5000',
				),
				$atts,
				'scarcity-counter'
			);

			$el  = '<span class="scarcity-counter" ';
			$el .= 'data-id="' . $atts['id'] . '" ';
			$el .= 'data-start="' . $atts['start'] . '" ';
			$el .= 'data-min="' . $atts['min'] . '" ';
			$el .= 'data-reduction="' . $atts['reduction'] . '" ';
			$el .= 'data-timelimit="' . $atts['timelimit'] . '" ';
			$el .= '></span>';

			return $el;
		}

		/**
		 * Enqueue all scripts needed by the plugin
		 */
		public static function enqueue_scripts() {
			// register script.
			wp_register_script(
				ScarcityCounter::DOMAIN . '-script',
				plugins_url( 'js/build/build.js', __FILE__ ),
				false,
				filemtime( plugin_dir_path( __FILE__ ) . 'js/build/build.js' ),
				true
			);
		}

		/**
		 * Initializes all shortcodes
		 *
		 * Available Shortcodes:
		 * - [scarcity-counter]
		 */
		public static function init_shortcodes() {
			$self           = new self();
			$shortcode_func = array( $self, 'get_shortcode' );
			add_shortcode( 'scarcity-counter', $shortcode_func );
		}

		/**
		 * Initializes all hooks
		 */
		public static function init_hooks() {
			$self = new self();

			// Enqueue scripts and styles.
			$enqueue_scripts_function = array( $self, 'enqueue_scripts' );
			add_action( 'wp_enqueue_scripts', $enqueue_scripts_function );
		}
	}

	ScarcityCounter::init(); // load plugin.
}
