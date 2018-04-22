# Scarcity Counter

[![Github Releases](https://img.shields.io/github/release/SimonMayerhofer/scarcity-counter.svg)](https://github.com/SimonMayerhofer/scarcity-counter/releases)

Scarcity Counter is a WordPress plugin for [artificial scarcity](https://en.wikipedia.org/wiki/Artificial_scarcity). It is great for marketing purposes. By providing timelimits and random reduction numbers it aims to make it not too obvious it's fake.
Be aware that it is just client side. So if the user visit your site on another device another number will be visible.

It works with multiple counters on a page. Use the same `id` attribute to show the same counter at different places on your page.

## Demo
You can see it in action [on Codepen](https://codepen.io/maysi/full/NMGyOV/).

## Shortcode
    [scarcity-counter id="id" start="27" min="3" reduction="3" timelimit="5000"]

### Attributes
* **id** id to identify the counter. if used multiple times, the same number is shown. defaults to `id`.
* **start** number to start with. defaults to `27`.
* **min** lower limit. the counter won't ever get below that limit. defaults to `3`.
* **reduction** upper range limit. E.g. if 5 is set as the limit, the counter will be reduced by a number between 1 and 5. defaults to `3`.
* **timelimit** number in milliseconds how long to wait until another reduction (on page reload). defaults to `5000`.


## Requirements
To compile this plugin, it requires the following modules installed on your system:

1. [Composer][]
2. [Grunt][]

[Composer]: https://getcomposer.org/ "Composer"
[Grunt]: https://gruntjs.com/ "Grunt"

## Compilation

To compile the plugin follow the following steps:

1. Navigate to this plugins directory
2. Setup composer: `composer install`
3. Install npm modules: `npm install`

After you followed the steps above you're able to compile the project with
`grunt build`.

Use `grunt watch` to watch the files for changes.

FYI: You can just go to [Releases](https://github.com/SimonMayerhofer/scarcity-counter/releases) to download a already compiled release.