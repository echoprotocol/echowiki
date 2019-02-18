let main = {


	init: function() {

		main.linkTarget();
		main.linkAnchor();
	},



	// Подставляет _target ссылкам, которые ведут на сторонний сайт
	linkTarget: function() {
		$(document.links).filter(function() {
			return this.hostname != window.location.hostname;
		}).attr('target', '_blank');
	},

	// Плавное перемещение по якорям
	linkAnchor: function() {
		
		filterPath = (string) => {
			return string
			  .replace(/^\//, '')
			  .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
			  .replace(/\/$/, '');
		}

		const locationPath = filterPath(location.pathname);
		$('a[href*="#"]').each(function () {
			const thisPath = filterPath(this.pathname) || locationPath;
			const hash = this.hash;
			if ($("#" + hash.replace(/#/, '')).length) {
				if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
					var $target = $(hash), target = this.hash;
					if (target) {
						$(this).click(function (event) {
							event.preventDefault();
							$('html, body').animate({scrollTop: $target.offset().top}, 300, function () {
								location.hash = target; 
								$target.focus();
								if ($target.is(":focus")) { //checking if the target was focused
									return false;
								} else {
									$target.attr('tabindex','-1'); //Adding tabindex for elements not focusable
									$target.focus(); //Setting focus
								};
							});       
						});
					}
				}
			}
		});
	}

};

let documentaion = {
	init: function() {
		documentaion.getCurrentLocation();
		documentaion.toggleAccordion('accordion-toggle');
		documentaion.toggleAccordion('sub-accordion-toggle', 'sub');
		documentaion.checkAccordion();
		documentaion.toggleSidebar();
	},

	// Получает локацию и вызывает для нее setActive()
	getCurrentLocation: function () {
		let paths = [];
		const pathnames = window.location.pathname.replace("_", " ").split('/');
		paths = pathnames.filter(function(item, i, arr) {
				return item.length && (arr[i] > arr[arr.length - 1]);
		})
		documentaion.setActive(paths)
	},

	// Открывает, и закрывает аккордеон в сайдбаре.
	toggleAccordion: function(elm, sub) {
		sub ? sub  : sub= '';
		$('.' + elm).click(function(e) {
			e.preventDefault();
			
			const $this = $(this);
			const parent = $this.closest('.sidebar');
			parent.find('.' + sub + 'accordion-toggle').removeClass('open');
			
			if ($this.next().hasClass('show')) {
				$this.next().removeClass('show');
				$this.removeClass('open');
				$this.next().slideUp(350);
			} else {
				parent.find('.' + sub + 'accordion-inner').removeClass('show');
				parent.find('.' +  sub + 'accordion-inner').slideUp(350);
				$this.next().toggleClass('show');
				$this.toggleClass('open');
				$this.next().slideToggle(350);

			}
		});
	},

	// Проверяет .active в аккордеоне в сайдбаре,
	// при загрузке открывает пункт если он вложен.
	checkAccordion: function() {
		const activeElm = $('.sidebar').find('.active');
		
		if(activeElm.hasClass('accordion-item')) {
			const toggle = activeElm.closest('.accordion').children('.accordion-toggle');
			const inner = activeElm.closest('.accordion').children('.accordion-inner');
			inner.addClass('show');
			inner.css({'display': 'block'});
			toggle.addClass('open');
		}

		if(activeElm.hasClass('sub-accordion-item')) {
			const toggle = activeElm.closest('.accordion').children('.accordion-toggle');
			const inner = activeElm.closest('.accordion').children('.accordion-inner');
			const subToggle = activeElm.closest('.sub-accordion').children('.sub-accordion-toggle');
			const subInner = activeElm.closest('.sub-accordion').children('.sub-accordion-inner');
			
			inner.addClass('show');
			inner.css({'display': 'block'});
			toggle.addClass('open');
			
			subInner.addClass('show');
			subInner.css({'display': 'block'});
			subToggle.addClass('open');
		}
	},
	
	toggleSidebar: function() {
		$('.sidebar-trigger').click(function(e) {
			e.target.blur();
			const $this = $(this);
			$this.toggleClass('open');
			$this.next().fadeToggle('fast', "linear", )
		});
	},

	setActive: function(paths) {
		paths.forEach(function(item) {
			let elm = document.getElementById(item);
			elm ? $(elm).addClass('active') && documentaion.checkAccordion() : null
		});
	}
	
}

$(function() {
	main.init();
	documentaion.init();
});