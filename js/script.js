/**
 * FLL Timer
 *
 * @author Clark Winkelmann
 *
 */

$(document).ready(function() {
	
	// When to add the danger state to the timer
	var danger_seconds = 10;
	
	// Holds the default values to be copied into the timer values
	var settings = {
		minutes: 2,
		seconds: 30
	};
	
	// Holds the current timer values
	var timer = {};
	
	// Javascript interval timer pointer
	var timerInterval = null;
	
	/**
	 * Resets the values and GUI
	 */
	function reset() {
		stop();
		
		$.extend(timer, settings);
		
		updateGui();
	}
	
	/**
	 * Updates the GUI according to the current values
	 */
	function updateGui() {
		$('.js-minutes-10').attr('data-value', Math.floor(timer.minutes/10));
		$('.js-minutes-1').attr('data-value', timer.minutes % 10);
		$('.js-seconds-10').attr('data-value', Math.floor(timer.seconds/10));
		$('.js-seconds-1').attr('data-value', timer.seconds % 10);
		
		if(timer.minutes == 0 && timer.seconds <= danger_seconds) {
			$('.js-timer-wrapper').addClass('danger');
		} else {
			$('.js-timer-wrapper').removeClass('danger');
		}
	}
	
	/**
	 * Sets up the gui size according to the window
	 */
	function setupGui() {
		$('body').css('font-size', $(window).height()+'px');
	}
	
	/**
	 * Starts or continue the timer
	 */
	function start() {
		if(timerInterval == null) {
			timerInterval = setInterval(tick, 1000);
		}
		
		$('.js-start-button').html('Pause');
	}
	
	/**
	 * Stops the timer
	 */
	function stop() {
		if(timerInterval != null) {
			clearInterval(timerInterval);
			timerInterval = null;
		}
		
		$('.js-start-button').html('Start');
	}
	
	/**
	 * Must be triggered every second of the timer
	 */
	function tick() {
		if(timer.minutes <= 0 && timer.seconds <= 0){
			stop();
		}else{
			if(timer.seconds <= 0){
				timer.seconds = 59;
				timer.minutes -= 1;
			}else{
				timer.seconds--;
			}
		}
		
		updateGui();
	}
	
	/**
	 * Handles the play/pause button click
	 */
	$('.js-start-button').click(function() {
		if(timerInterval == null) {
			start();
		} else {
			stop();
		}
	});
	
	/**
	 * Handles the reset button click
	 */
	$('.js-reset-button').click(function() {
		reset();
	});
	
	/**
	 * Handles the customize button click
	 */
	$('.js-customize-button').click(function() {
		$input = $('.js-customize-input');
		if($input.css('display') == 'none') {
			$input.val(settings.minutes+':'+(settings.seconds < 10 ? '0' : '')+settings.seconds);
			$input.show();
			$(this).html('Apply');
		} else {
			$input.hide();
			values = $input.val().split(':');
			if(values.length >= 2) {
				settings.minutes = values[0] == '' ? 0 : parseInt(values[0]);
				settings.seconds = values[1] == '' ? 0 : parseInt(values[1]);
			} else {
				settings.minutes = 2;
				settings.seconds = 30;
			}
			$(this).html('Customize');
			reset();
		}
	});
	
	/**
	 * Keycode "constants"
	 */
	var KEY = {
		SPACE: 32,
		ESC: 27,
		R: 82
	}
	
	/**
	 * Handles a key release event
	 */
	$(document).keyup(function(e) {
		switch(e.which) {
			case KEY.SPACE:
				// Prevents clicking the focused button
				e.preventDefault();
			case KEY.ESC:
				$('.js-ready-message').hide();
				$('.js-start-button').trigger('click');
				break;
			case KEY.R:
				$('.js-reset-button').trigger('click');
				break;
		}
	});
	
	/**
	 * Handles a key down event
	 */
	$(document).keydown(function(e) {
		switch(e.which) {
			case KEY.SPACE:
				// Prevents clicking the focused button
				e.preventDefault();
			case KEY.ESC:
				// Only if the timer isn't running
				if(timerInterval == null) {
					$('.js-ready-message').show();
				}
				break;
		}
	});
	
	/**
	 * Handles page resize
	 */
	$(window).resize(function() {
		setupGui();
	});
	
	// Init
	setupGui();
	reset();
	
});
