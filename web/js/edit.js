//see https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
define(function(require, exports, module) {
	'use strict';

	var ace = require('libs/ace/ace');
	var marked = require('libs/marked/marked');
	marked.setOptions({
		gfm: true,
		highlight: function (code, lang) {
			console.log(lang);
			if(lang) {
				return hljs.highlight(lang, code).value;
			}
			return hljs.highlightAuto(code).value;
		},
		tables: true,
		breaks: true,
		pedantic: true,
		sanitize: false,
		smartLists: true,
		smartypants: true,
		langPrefix: 'lang-'
	});
	var hljs = require('libs/highlight.js/highlight.pack');

	var editor = ace.edit('post-editor');
	editor.setShowPrintMargin(false);
	editor.setTheme('libs/ace/theme/crimson_editor');
	editor.getSession().setMode('libs/ace/mode/markdown');

	var render = function() {
		var val = editor.getValue();
		
		marked(val, function(err, content) {
			if(err) {
				return console.log('Marked file error: ', err);
			}

			//$(window.frames['preview'].document).find('body').html(content);
			$('#preview-box').html(content);
		});
	};

	var bindEvents = (function() {
		var previewOpen = false;
		
		function onEditerChange(e) {
			if(!previewOpen) {
				return;
			}
			var timer = this.timer || null;
			clearTimeout(timer);
			this.timer = setTimeout(function() {
				console.log(e.data);
				render();
			}, 500);
		}

		function previewSwitch(e) {
			var previewBox = $('#post-preview');

			if(previewOpen) {// open => close
				previewBox.css({width: '0%'}).addClass('preview-close');
			} else {// close => open
				previewBox.css({width: '50%'}).removeClass('preview-close');
				render();
			}

			previewOpen = !previewOpen;
		}

		return function() {
			editor.on('change', onEditerChange);
			$('.preview-ctrl').on('click', previewSwitch);
		}
	}());

	~function init() {
		$('#post-preview').css('height', document.body.clientHeight + 'px');
		bindEvents();
		$('#btn-save').click(function() {
			var v = editor.getValue().replace(/</g,'&lt;').replace(/>/g,'&gt;');
			console.log(v);
		});

		$.get('./markdown.md', function(r) {
			editor.setValue(r);
			editor.gotoLine(0, 0, true);
		});
	}();
});